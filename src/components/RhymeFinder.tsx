"use client";
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Input, Alert } from './ui/Field';
import { cn } from '../lib/cn';

type RhymeWord = { word: string; syllables: number };
type Answer = { word: string; known: boolean; perfect: RhymeWord[]; near: RhymeWord[] };

const DEFAULT_SUGGESTIONS = ['cadeau', 'Piet', 'Sint', 'gedicht', 'schoen', 'pepernoot', 'marsepein', 'Spanje'];

/**
 * "Wat rijmt op …?" — Nederlandse rijmwoorden uit dezelfde lijst als de app (via /api/rijm).
 * Klik op een woord om het te kopiëren.
 */
export function RhymeFinder({ suggestions = DEFAULT_SUGGESTIONS, initial, className, headingLevel = 'h2' }: {
  suggestions?: string[]; initial?: string; className?: string; headingLevel?: 'h2' | 'h3';
}) {
  const [query, setQuery] = useState(initial ?? '');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [copied, setCopied] = useState<string | null>(null);
  const reqId = useRef(0);
  const H = headingLevel;

  const search = async (raw: string) => {
    const w = raw.trim();
    if (!w) return;
    setQuery(w);
    const id = ++reqId.current;
    setState('loading');
    try {
      const res = await fetch(`/api/rijm?w=${encodeURIComponent(w)}`);
      const data = await res.json();
      if (id !== reqId.current) return;
      if (!res.ok) throw new Error(data?.error);
      setAnswer(data);
      setState('idle');
    } catch {
      if (id === reqId.current) setState('error');
    }
  };

  useEffect(() => { if (initial) search(initial); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (e: FormEvent) => { e.preventDefault(); search(query); };

  const copy = async (w: string) => {
    try { await navigator.clipboard.writeText(w); } catch { /* geen klembord: het woord staat er toch */ }
    setCopied(w);
    window.setTimeout(() => setCopied((c) => (c === w ? null : c)), 1400);
  };

  const groups = answer ? [1, 2, 3, 4].map((n) => ({
    n, items: answer.perfect.filter((r) => (n === 4 ? r.syllables >= 4 : r.syllables === n)),
  })).filter((g) => g.items.length) : [];

  return (
    <div className={cn('rounded-2xl border border-border bg-surface p-5 sm:p-7', className)} data-testid="rhyme-finder">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row" role="search">
        <label htmlFor="rhyme-q" className="sr-only">Wat rijmt op</label>
        <div className="flex-1">
          <Input id="rhyme-q" icon={Search} value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Typ een woord, bijvoorbeeld cadeau" autoComplete="off" autoCapitalize="off" spellCheck={false}
            enterKeyHint="search" maxLength={40} className="h-12 text-base" />
        </div>
        <Button type="submit" size="lg" disabled={state === 'loading'}>Zoek rijmwoorden</Button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-text-muted">Probeer:</span>
        {suggestions.map((s) => (
          <button key={s} type="button" onClick={() => search(s)}
            className="rounded-full border border-border px-3 py-1 text-text-muted transition-colors hover:border-iris/60 hover:text-text">
            {s}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-6">
        {state === 'loading' && <p className="text-sm text-text-muted">Rijmwoorden zoeken…</p>}
        {state === 'error' && <Alert tone="error">Dat lukte even niet. Probeer het nog een keer.</Alert>}
        {state === 'idle' && answer && (
          answer.perfect.length === 0 && answer.near.length === 0 ? (
            <Alert>Geen rijmwoorden gevonden voor “{answer.word}”. {answer.known ? 'Probeer een ander woord aan het eind van je regel.' : 'Staat het woord goed gespeld?'}</Alert>
          ) : (
            <div>
              <H className="text-lg font-semibold tracking-[-0.01em]">Rijmt op “{answer.word}”</H>
              <p className="mt-1 text-xs text-text-muted">Klik op een woord om het te kopiëren.</p>
              {groups.map((g) => (
                <div key={g.n} className="mt-4">
                  <p className="text-[12px] font-medium text-text-muted">{g.n === 4 ? '4 of meer lettergrepen' : `${g.n} lettergreep${g.n === 1 ? '' : 'en'}`}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((r) => (
                      <li key={r.word}>
                        <button type="button" onClick={() => copy(r.word)}
                          className="inline-flex items-center gap-1 rounded-md bg-raised px-2.5 py-1 text-[15px] text-text transition-colors hover:bg-iris/15">
                          {copied === r.word && <Check aria-hidden className="size-3.5 text-iris-text" />}
                          {r.word}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {answer.near.length > 0 && (
                <div className="mt-5">
                  <p className="text-[12px] font-medium text-text-muted">Bijna-rijm (klinkt erop)</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {answer.near.map((r) => (
                      <li key={r.word}>
                        <button type="button" onClick={() => copy(r.word)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-[15px] text-text-muted transition-colors hover:text-text">
                          {copied === r.word && <Check aria-hidden className="size-3.5 text-iris-text" />}
                          {r.word}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
