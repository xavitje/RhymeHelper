import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Check, Cloud, Columns2, Command, Download, History, Languages, Maximize2, Printer, StickyNote,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { APP_CONFIG } from '../config';
import { FAQS } from '../content/faq';
import { FadeIn } from '../components/FadeIn';
import { PlanCards } from '../components/PlanCards';
import { FaqList } from '../components/home/FaqList';
import { Badge, ButtonLink, Container, Kbd, RhymeStrip, RhymeWord, Section, SectionHeading } from '../components/ui';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const SPOTLIGHTS: {
  id: string; eyebrow: string; title: string; accent: string; body: string; points: React.ReactNode[];
  image: { src: string; w: number; h: number; alt: string };
}[] = [
  {
    id: 'rhymes',
    eyebrow: 'Rhymes',
    title: 'Rhymes right where',
    accent: 'you write.',
    body: 'Select a word and rhymes appear above it. Click one to swap it in. No browser tabs, no losing your place.',
    points: [
      <>Hold <Kbd keys={['Ctrl']} /> and click a rhyme to add it after your word</>,
      <>The side panel groups rhymes by syllables, next to your notes</>,
      <>Near rhymes, synonyms and multi-syllable phrases with Pro</>,
    ],
    image: { src: '/screens/app-rhymes.webp', w: 1720, h: 810, alt: 'The word “light” is selected in the editor. A small menu above it shows rhymes: night, fight, height, tight, bright, flight.' },
  },
  {
    id: 'flow',
    eyebrow: 'Flow',
    title: 'Every line,',
    accent: 'counted.',
    body: 'Rhyme Helper counts the syllables of every line while you type and colours the words that rhyme. You see your flow before you say it out loud.',
    points: [
      <>Syllables per line, with an average per verse and chorus</>,
      <>Rhyme scheme in colour: the same colour means the same rhyme</>,
      <>BPM and key on every song</>,
    ],
    image: { src: '/screens/app-syllables.webp', w: 1610, h: 680, alt: 'A verse with syllable counts per line (9, 10, 12, 12) and the rhyming words light, fight, height and night marked in amber, the chorus rhymes fold, told and gold in green.' },
  },
  {
    id: 'studio',
    eyebrow: 'Studio · Pro',
    title: 'Your beat,',
    accent: 'right there.',
    body: 'Drop a beat into the app and write while it plays. Play and pause with one shortcut, without leaving your lyrics.',
    points: [
      <>Play and pause with <Kbd keys={['Ctrl', 'Space']} /></>,
      <>Loop, set timestamps and export synced lyrics as .lrc</>,
      <>Save your lyrics into the MP3 itself</>,
    ],
    image: { src: '/screens/app-studio.webp', w: 1560, h: 490, alt: 'The chorus of a song with the Studio player below it: a play button, the beat “Late Night 92bpm”, a waveform and the time 0:09 of 0:41.' },
  },
];

const FEATURES: { icon: LucideIcon; title: string; body: React.ReactNode; pro?: boolean }[] = [
  { icon: History, title: 'Autosave and history', body: 'Every change is saved within a second. Go back to any earlier version.' },
  { icon: Maximize2, title: 'Focus mode', body: <>Hide everything but your lyrics with <Kbd keys={['F11']} />.</> },
  { icon: Command, title: 'Command palette', body: <>Find any song, rhyme or action with <Kbd keys={['Ctrl', 'K']} />.</> },
  { icon: StickyNote, title: 'Idea board', body: 'Park alternate bars and concepts next to your song, not in it.' },
  { icon: Languages, title: 'English and Dutch', body: 'The app, the rhymes and the syllable counts work in both.' },
  { icon: Printer, title: 'Print and PDF', body: 'Clean lyric sheets with line numbers, without any app chrome.' },
  { icon: Columns2, title: 'Tabs and split screen', body: 'Keep several songs open and write two side by side.', pro: true },
  { icon: Cloud, title: 'Cloud Sync', body: `Your songs backed up and on every computer you write on. Optional, ${APP_CONFIG.CLOUD_SYNC_PRICE} a month.` },
];

const AUDIENCE = [
  { who: 'Rappers', what: 'Find multi-syllable rhymes fast and keep every bar on count.' },
  { who: 'Singers and songwriters', what: 'Structure verses and choruses and match syllables to your melody.' },
  { who: 'Producers', what: 'Play the instrumental in the app and leave notes on the song structure.' },
  { who: 'Poets', what: 'Use synonyms and near rhymes to find the exact word.' },
];


export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.22),transparent)]" />
        <Container className="relative text-center">
          <div>
            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-display">
              Find the rhyme. <span className="text-iris-text">Keep the flow.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted sm:text-lead">
              The writing app for lyrics. Rhymes, syllable counts and your beat, together in one quiet window.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} size="lg" icon={Download}>Download free for Windows</ButtonLink>
              <ButtonLink href="/pricing" size="lg" variant="secondary" iconRight={ArrowRight}>See Pro</ButtonLink>
            </div>
            <p className="mt-4 text-sm text-text-muted">
              Windows 10 and 11 · Free forever · Pro {APP_CONFIG.SALE_PRICE} one-time
            </p>
          </div>

          <div className="mt-14 sm:mt-20">
            <div className="relative mx-auto max-w-[1120px] rounded-xl border border-border-strong bg-surface p-1.5 shadow-modal sm:rounded-2xl sm:p-2">
              <Image
                src="/screens/app-editor.webp"
                width={2880}
                height={1800}
                priority
                sizes="(min-width: 1200px) 1104px, 100vw"
                alt="Rhyme Helper with the song “Midnight Pen”: lyrics with syllable counts per line, rhyming words in colour and the rhyme panel for “light” on the right."
                className="h-auto w-full rounded-lg sm:rounded-xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Uitgelicht */}
      <Section id="features" className="scroll-mt-16">
        <SectionHeading
          title="Built for writing,"
          accent="nothing else."
          lead="Everything you reach for while writing a song, inside the page you're writing on."
        />
        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {SPOTLIGHTS.map((s, i) => (
            <FadeIn key={s.id}>
              <div id={s.id} className={`grid scroll-mt-24 items-center gap-10 lg:gap-16 ${i % 2 === 1 ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                  <p className="text-[13px] font-medium text-iris-text">{s.eyebrow}</p>
                  <h3 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
                    {s.title} <span className="text-text-muted">{s.accent}</span>
                  </h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-text-muted">{s.body}</p>
                  <ul className="mt-6 space-y-3 text-[15px]">
                    {s.points.map((p, j) => (
                      <li key={j} className="flex gap-3">
                        <Check aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-iris-text" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : undefined}>
                  <div className="overflow-hidden rounded-xl border border-border bg-bg shadow-float">
                    <Image src={s.image.src} width={s.image.w} height={s.image.h} alt={s.image.alt} sizes="(min-width: 1024px) 680px, 100vw" className="h-auto w-full" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Alles erbij */}
      <Section className="border-t border-border">
        <SectionHeading title="And everything" accent="around it." lead="The small things that keep you writing instead of searching." />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <li key={f.title} className="bg-surface p-6">
              <div className="flex items-center justify-between">
                <f.icon aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" />
                {f.pro && <Badge tone="accent">Pro</Badge>}
              </div>
              <h3 className="mt-5 text-[15px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Voor wie */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading title="For everyone" accent="who writes to a beat." />
            <p className="mt-8 text-[17px] leading-relaxed text-text-muted">
              I been up all <RhymeWord family={1}>night</RhymeWord> chasing the <RhymeWord family={1}>light</RhymeWord>,
              <br />every line on the <RhymeWord family={2}>page</RhymeWord> feels like a <RhymeWord family={2}>stage</RhymeWord>.
            </p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {AUDIENCE.map((a) => (
              <div key={a.who} className="bg-surface p-6">
                <dt className="text-lg font-semibold tracking-[-0.02em]">{a.who}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-text-muted">{a.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Free en Pro */}
      <Section className="border-t border-border" id="pricing">
        <SectionHeading align="center" title="Free to write." accent="Pro to go further." lead="Start with the free version. Upgrade once, whenever you're ready." />
        <PlanCards className="mt-12" />
        <p className="mt-6 text-center text-sm text-text-muted">
          <Link href="/pricing" className="text-iris-text hover:underline">Compare everything</Link> in Free and Pro.
        </p>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border" narrow>
        <SectionHeading align="center" title="Questions," accent="answered." />
        <FaqList items={FAQS.slice(0, 5)} className="mt-10" />
        <p className="mt-6 text-center text-sm text-text-muted">
          More in the <Link href="/faq" className="text-iris-text hover:underline">FAQ</Link> and the <Link href="/resources" className="text-iris-text hover:underline">docs</Link>.
        </p>
      </Section>

      {/* Afsluiter */}
      <section className="pb-8">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <RhymeStrip className="h-1 rounded-none" />
            <div className="flex flex-col items-start gap-8 px-7 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
                  Your next verse <span className="text-text-muted">starts here.</span>
                </h2>
                <p className="mt-3 text-[17px] text-text-muted">Free for Windows. No account needed.</p>
              </div>
              <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} variant="pill" size="lg" icon={Download}>Download free</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
