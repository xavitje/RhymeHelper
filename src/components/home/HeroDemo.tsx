"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Search } from 'lucide-react';
import { LogoMark } from '../ui/Logo';
import { cn } from '../../lib/cn';
import type { Lang } from '../../i18n/routes';

/**
 * Hero-demo: een nagebouwd stuk van de app dat laat zien wat Rhyme Helper doet.
 * Je typt een regel, selecteert een woord, de rijmen verschijnen erboven en met Ctrl+klik
 * komt het rijm achter je regel. Lettergrepen en rijmkleuren lopen mee.
 *
 * - Puur HTML/CSS, geen video: scherp op elk scherm, een paar kB.
 * - Pauzeert buiten beeld en in een verborgen tab; pauzeknop voor WCAG 2.2.2.
 * - Zonder JS en bij "reduce motion": het eindbeeld (de complete regel), geen animatie.
 */

type Copy = {
  menu: string[]; title: string; bpm: string; key: string; verse: string; verseMeta: string;
  lines: { pre: string; word: string; syl: number }[];
  typed: string; typedSyl: number[]; insert: string;
  selectedLine: number; // index in lines van de regel met het geselecteerde woord
  chorus: string; chorusMeta: string; chorusLines: { pre: string; word: string; syl: number }[];
  popup: string[]; hint: string;
  panelTabs: string[]; empty: string;
  groups: { label: string; words: string[] }[]; used: string[];
  syl: (n: number) => string;
  label: string; pause: string; play: string; saved: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    menu: ['File', 'Edit', 'Insert', 'Format', 'View', 'Help'],
    title: 'Midnight Pen', bpm: '92 BPM', key: 'A minor', verse: 'Verse 1', verseMeta: '3 lines',
    lines: [
      { pre: 'I been up all night chasing the ', word: 'light', syl: 9 },
      { pre: 'Pen on the page and my mind in a ', word: 'fight', syl: 10 },
    ],
    // Getypte regel; typedSyl = lettergrepen na elk woord.
    typed: 'Hold it down, keep it tight, I’m alive in the ',
    typedSyl: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11],
    insert: 'night',
    selectedLine: 0,
    chorus: 'Chorus', chorusMeta: '2 lines',
    chorusLines: [
      { pre: 'We don’t stop, we don’t ', word: 'fold', syl: 6 },
      { pre: 'Every story that we ', word: 'told', syl: 7 },
    ],
    popup: ['night', 'sight', 'bright', 'tonight', 'white'],
    hint: 'Ctrl + click to add',
    panelTabs: ['Rhymes', 'Near', 'Synonyms', 'Notes'],
    empty: 'Select a word to see its rhymes.',
    groups: [
      { label: '1 syllable', words: ['night', 'fight', 'sight', 'white', 'tight', 'write'] },
      { label: '2 syllables', words: ['bright', 'tonight', 'flight', 'ignite'] },
      { label: '3 syllables', words: ['spotlight', 'midnight', 'dynamite'] },
    ],
    used: ['fight'],
    syl: (n) => `${n} syl`,
    label: 'Demo of Rhyme Helper: you select the word “light”, rhymes appear above it, and Ctrl + click adds “night” to the end of your line. Every line shows its syllable count and rhyming words share a colour.',
    pause: 'Pause demo', play: 'Play demo', saved: 'Saved',
  },
  nl: {
    menu: ['Bestand', 'Bewerken', 'Invoegen', 'Opmaak', 'Weergave', 'Help'],
    title: 'Ochtendlicht', bpm: '88 BPM', key: 'A mineur', verse: 'Couplet 1', verseMeta: '3 regels',
    lines: [
      { pre: 'Ik schrijf tot de ochtend, de stad is nog ', word: 'stil', syl: 11 },
      { pre: 'elk woord op papier is precies wat ik ', word: 'wil', syl: 11 },
    ],
    typed: 'de beat in mijn oren, het ritme is ',
    typedSyl: [1, 2, 3, 4, 6, 7, 9, 10],
    insert: 'chill',
    selectedLine: 0,
    chorus: 'Refrein', chorusMeta: '2 regels',
    chorusLines: [
      { pre: 'We gaan door tot het ', word: 'licht', syl: 6 },
      { pre: 'met de wereld in ', word: 'zicht', syl: 6 },
    ],
    popup: ['chill', 'bril', 'tril', 'gil', 'kil'],
    hint: 'Ctrl + klik om toe te voegen',
    panelTabs: ['Rijmen', 'Bijna', 'Synoniemen', 'Notities'],
    empty: 'Selecteer een woord om de rijmen te zien.',
    groups: [
      { label: '1 lettergreep', words: ['wil', 'chill', 'bril', 'tril', 'gil', 'kil'] },
      { label: '2 lettergrepen', words: ['verschil', 'gegil', 'getril', 'april'] },
      { label: '3 lettergrepen', words: ['krokodil'] },
    ],
    used: ['wil'],
    syl: (n) => `${n} lg`,
    label: 'Demo van Rhyme Helper: je selecteert het woord “stil”, de rijmen verschijnen erboven en met Ctrl + klik komt “chill” achter je regel. Elke regel toont het aantal lettergrepen en woorden die rijmen krijgen dezelfde kleur.',
    pause: 'Demo pauzeren', play: 'Demo afspelen', saved: 'Opgeslagen',
  },
};

type Frame = {
  typed: number; caret: boolean; sel: boolean; popup: boolean;
  pointer: 0 | 1 | 2; hover: boolean; press: boolean; inserted: boolean; out: boolean; dur: number;
};

function buildFrames(typed: string): Frame[] {
  const base: Frame = { typed: 0, caret: true, sel: false, popup: false, pointer: 0, hover: false, press: false, inserted: false, out: false, dur: 0 };
  const f: Frame[] = [{ ...base, dur: 700 }];
  for (let i = 1; i <= typed.length; i++) {
    const ch = typed[i - 1];
    f.push({ ...base, typed: i, dur: ch === ' ' ? 70 : ch === ',' ? 160 : 34 });
  }
  const done = { ...base, typed: typed.length };
  f.push({ ...done, dur: 650 });
  f.push({ ...done, caret: false, sel: true, dur: 380 });
  f.push({ ...done, caret: false, sel: true, popup: true, dur: 420 });
  f.push({ ...done, caret: false, sel: true, popup: true, pointer: 1, dur: 40 });
  f.push({ ...done, caret: false, sel: true, popup: true, pointer: 2, dur: 720 });
  f.push({ ...done, caret: false, sel: true, popup: true, pointer: 2, hover: true, dur: 520 });
  f.push({ ...done, caret: false, sel: true, popup: true, pointer: 2, hover: true, press: true, dur: 170 });
  f.push({ ...done, caret: false, inserted: true, dur: 2700 });
  f.push({ ...done, caret: false, inserted: true, out: true, dur: 520 });
  return f;
}

/** Lettergrepen van de getypte regel tot en met teken `n`. */
function sylAt(text: string, n: number, perWord: number[]) {
  const words = text.slice(0, n).split(/\s+/).filter(Boolean);
  const complete = text[n - 1] === ' ' || n === text.length ? words.length : words.length - 1;
  return complete > 0 ? perWord[Math.min(complete, perWord.length) - 1] : 0;
}

function SylBar({ n }: { n: number }) {
  return (
    <span className="flex items-center justify-end gap-2.5">
      <span aria-hidden className="hidden h-[3px] w-9 overflow-hidden rounded-full bg-raised sm:block">
        <span className="block h-full rounded-full bg-text-muted/70 transition-[width] duration-300" style={{ width: `${Math.min(100, (n / 13) * 100)}%` }} />
      </span>
      <span className="w-5 text-right font-mono text-[11px] tabular-nums text-text-muted sm:text-xs">{n || ''}</span>
    </span>
  );
}

export function HeroDemo({ lang, className }: { lang: Lang; className?: string }) {
  const c = COPY[lang];
  const frames = useMemo(() => buildFrames(c.typed), [c.typed]);
  const FINAL = frames.length - 2; // de complete regel, zonder uitfaden
  const [i, setI] = useState(FINAL);
  const [motion, setMotion] = useState(false); // pas na mount en zonder reduced motion
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setMotion(!mq.matches);
      if (mq.matches) setI(FINAL);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [FINAL]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const running = motion && visible && !paused;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % frames.length), frames[i].dur);
    return () => window.clearTimeout(t);
  }, [running, i, frames]);

  const f = frames[i];
  const typedSyl = sylAt(c.typed, f.typed, c.typedSyl) + (f.inserted ? 1 : 0);
  const showPanel = f.sel || f.inserted;
  const used = f.inserted ? [...c.used, c.insert] : c.used;

  return (
    <div ref={ref} className={cn('relative mx-auto w-full max-w-[1120px]', className)}>
      <div role="img" aria-label={c.label} className="overflow-hidden rounded-xl border border-border-strong bg-bg text-left shadow-modal sm:rounded-2xl">
        <div aria-hidden className="select-none">
          {/* Menubalk */}
          <div className="flex h-9 items-center justify-between border-b border-border px-3 text-[12px] text-text-muted sm:h-10 sm:px-4 sm:text-[13px]">
            <div className="flex items-center gap-3 sm:gap-5">
              <LogoMark size={16} className="sm:hidden" />
              {c.menu.map((m, k) => <span key={m} className={k > 2 ? 'hidden sm:inline' : undefined}>{m}</span>)}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1 md:flex">
                <Search strokeWidth={1.75} className="size-3.5" /> <span className="w-24 lg:w-36" /> <span className="rounded border border-border px-1 font-mono text-[10px]">Ctrl K</span>
              </span>
              <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-success" />{c.saved}</span>
            </div>
          </div>

          <div className="flex">
            {/* Zijbalk */}
            <div className="hidden w-[190px] shrink-0 flex-col border-r border-border p-3 lg:flex">
              <div className="flex items-center gap-2 px-1 text-[13px] font-semibold"><LogoMark size={18} /> Rhyme Helper</div>
              <div className="mt-4 rounded-md bg-iris/15 px-2.5 py-2">
                <p className="flex items-center gap-2 text-[13px] font-medium"><span className="size-1.5 rounded-full bg-iris" />{c.title}</p>
              </div>
            </div>

            {/* Editor */}
            <div className="min-w-0 flex-1 px-4 pt-5 pb-12 sm:px-8 sm:pt-7 sm:pb-9 lg:px-10">
              <div className="flex flex-wrap gap-1.5 text-[11px] text-text-muted sm:text-xs">
                <span className="rounded-md border border-border px-2 py-0.5">{c.bpm}</span>
                <span className="rounded-md border border-border px-2 py-0.5">{c.key}</span>
              </div>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] sm:mt-3 sm:text-3xl">{c.title}</p>

              <div className="mt-4 text-[13px] leading-[1.9] sm:mt-6 sm:text-[16px] lg:text-[17px]">
                <div className="grid grid-cols-[16px_1fr_auto] items-center gap-2 sm:grid-cols-[22px_1fr_auto] sm:gap-3">
                  <span className="font-mono text-[10px] text-text-faint sm:text-xs">1</span>
                  <span className="text-xs text-text-muted sm:text-[13px]">
                    <span className="mr-2 rounded-md bg-iris/15 px-1.5 py-0.5 font-medium text-iris-text">[{c.verse}]</span>{c.verseMeta}
                  </span>
                  <span />
                </div>
                {c.lines.map((l, k) => {
                  const selected = k === c.selectedLine;
                  return (
                    <div key={k} className="grid grid-cols-[16px_1fr_auto] items-baseline gap-2 sm:grid-cols-[22px_1fr_auto] sm:gap-3">
                      <span className="font-mono text-[10px] text-text-faint sm:text-xs">{k + 2}</span>
                      <span>
                        {l.pre}
                        <span className="relative inline-block">
                          <span className={cn('-mx-0.5 rounded-sm px-0.5 font-medium transition-colors duration-200 rhyme-1', selected && f.sel && 'bg-iris/45 text-text')}>{l.word}</span>
                          {selected && (
                            <span
                              className={cn(
                                'absolute right-0 bottom-full z-10 mb-1.5 w-max origin-bottom-right rounded-lg sm:right-auto sm:left-1/2 sm:origin-bottom sm:-translate-x-1/2 border border-border-strong bg-raised p-1 shadow-modal',
                                'transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
                                f.popup ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
                              )}
                            >
                              <span className="flex gap-0.5">
                                {c.popup.map((w, n) => {
                                  const target = n === 0;
                                  return (
                                    <span
                                      key={w}
                                      className={cn(
                                        'relative rounded-md px-2 py-0.5 text-[12px] font-medium leading-6 transition-[background-color,transform] duration-150 sm:text-[14px]',
                                        target && f.hover && 'bg-iris/25 text-text',
                                        target && f.press && 'scale-[0.95]',
                                      )}
                                    >
                                      {w}
                                      {target && (
                                        <svg
                                          viewBox="0 0 16 20"
                                          className={cn(
                                            'absolute top-1/2 left-1/2 z-20 h-5 w-4 drop-shadow-[0_1px_2px_rgb(0_0_0/0.6)]',
                                            'transition-[transform,opacity] ease-[cubic-bezier(0.32,0.72,0,1)]',
                                            f.pointer === 0 && 'opacity-0 duration-0 [transform:translate(140px,110px)]',
                                            f.pointer === 1 && 'opacity-100 duration-0 [transform:translate(140px,110px)]',
                                            f.pointer === 2 && 'opacity-100 duration-700 [transform:translate(2px,0px)]',
                                            f.press && 'scale-90',
                                          )}
                                        >
                                          <path d="M1 1v15l4-4 3 7 3-1-3-7h6z" fill="#fff" stroke="#0B0B0D" strokeWidth="1.2" strokeLinejoin="round" />
                                        </svg>
                                      )}
                                    </span>
                                  );
                                })}
                              </span>
                              <span className={cn('block px-2 pt-1 pb-0.5 text-[10px] text-text-muted transition-colors sm:text-[11px]', f.hover && 'text-text')}>{c.hint}</span>
                            </span>
                          )}
                        </span>
                      </span>
                      <SylBar n={l.syl} />
                    </div>
                  );
                })}
                <div className={cn('grid grid-cols-[16px_1fr_auto] items-baseline gap-2 transition-opacity duration-500 sm:grid-cols-[22px_1fr_auto] sm:gap-3', f.out && 'opacity-0')}>
                  <span className="font-mono text-[10px] text-text-faint sm:text-xs">4</span>
                  <span>
                    {c.typed.slice(0, f.typed)}
                    {f.inserted && (
                      <span className="-mx-0.5 inline-block rounded-sm px-0.5 font-medium rhyme-1 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] starting:-translate-y-1 starting:opacity-0 starting:blur-[2px]">
                        {c.insert}
                      </span>
                    )}
                    {f.caret && <span className="ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[0.2em] animate-pulse bg-iris" />}
                  </span>
                  <SylBar n={typedSyl} />
                </div>
                <div className="grid grid-cols-[16px_1fr_auto] gap-2 sm:grid-cols-[22px_1fr_auto] sm:gap-3">
                  <span className="font-mono text-[10px] text-text-faint sm:text-xs">5</span><span /><span />
                </div>
                <div className="grid grid-cols-[16px_1fr_auto] items-center gap-2 sm:grid-cols-[22px_1fr_auto] sm:gap-3">
                  <span className="font-mono text-[10px] text-text-faint sm:text-xs">6</span>
                  <span className="text-xs text-text-muted sm:text-[13px]">
                    <span className="mr-2 rounded-md bg-iris/15 px-1.5 py-0.5 font-medium text-iris-text">[{c.chorus}]</span>{c.chorusMeta}
                  </span>
                  <span />
                </div>
                {c.chorusLines.map((l, k) => (
                  <div key={k} className="grid grid-cols-[16px_1fr_auto] items-baseline gap-2 sm:grid-cols-[22px_1fr_auto] sm:gap-3">
                    <span className="font-mono text-[10px] text-text-faint sm:text-xs">{k + 7}</span>
                    <span>{l.pre}<span className="-mx-0.5 rounded-sm px-0.5 font-medium rhyme-2">{l.word}</span></span>
                    <SylBar n={l.syl} />
                  </div>
                ))}
              </div>
            </div>

            {/* Rijmpaneel */}
            <div className="hidden w-[250px] shrink-0 border-l border-border p-3 md:block lg:w-[290px]">
              <div className={cn('flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[13px] transition-colors', showPanel ? 'border-iris/70' : 'border-border')}>
                <Search strokeWidth={1.75} className="size-3.5 text-text-muted" />
                <span className="flex-1">{showPanel ? c.lines[c.selectedLine].word : ''}</span>
                {showPanel && <span className="text-[11px] text-text-muted">{c.syl(1)}</span>}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1 rounded-md bg-surface p-0.5 text-center text-[11px] text-text-muted">
                {c.panelTabs.map((t, k) => <span key={t} className={cn('truncate rounded px-1 py-1', k === 0 && 'bg-raised text-text')}>{t}</span>)}
              </div>
              <div className="relative mt-3 min-h-[230px]">
                <p className={cn('absolute inset-x-0 top-8 px-4 text-center text-xs text-text-faint transition-opacity duration-200', showPanel && 'opacity-0')}>{c.empty}</p>
                <div className={cn('transition-opacity duration-300', showPanel ? 'opacity-100' : 'opacity-0')}>
                  {c.groups.map((g) => (
                    <div key={g.label} className="mb-2.5">
                      <p className="flex justify-between text-[11px] text-text-muted"><span>{g.label}</span><span>{g.words.length}</span></p>
                      <div className="mt-1 grid grid-cols-2 gap-x-3 text-[13px] leading-6">
                        {g.words.map((w) => (
                          <span key={w} className={cn('flex items-center gap-1.5 transition-colors duration-300', used.includes(w) && 'text-text-faint line-through')}>
                            <span className="size-1 rounded-full bg-success" />{w}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {motion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? c.play : c.pause}
          className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full border border-border bg-surface/90 text-text-muted backdrop-blur transition-[color,transform] hover:text-text active:scale-[0.97]"
        >
          {paused ? <Play aria-hidden strokeWidth={1.75} className="size-3.5" /> : <Pause aria-hidden strokeWidth={1.75} className="size-3.5" />}
        </button>
      )}
    </div>
  );
}
