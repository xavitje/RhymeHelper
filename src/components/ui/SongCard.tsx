import { cn } from '../../lib/cn';
import { Badge } from './Badge';
import { RhymeWord, type RhymeFamily } from './Rhyme';

/** Een regel songtekst: tekstdelen, waarvan rijmwoorden als { w, f } (woord + familie). */
export type LyricSegment = string | { w: string; f: RhymeFamily };
export type LyricLine = { parts: LyricSegment[]; syllables: number };

/**
 * Gestileerd stuk van de editor: titel, meta, regels met rijmen, regelnummers en lettergrepen.
 * Het hoofdbeeld van posts, advertenties en de website. Max. twee rijmfamilies.
 */
export function SongCard({
  title, meta, badge, lines, className,
}: { title: string; meta?: string; badge?: string; lines: LyricLine[]; className?: string }) {
  return (
    <figure className={cn('overflow-hidden rounded-xl bg-surface shadow-float', className)}>
      <figcaption className="flex items-center justify-between border-b border-border px-5 pt-4 pb-3">
        <div>
          <p className="text-lg font-semibold tracking-[-0.02em]">{title}</p>
          {meta && <p className="mt-0.5 text-xs text-text-muted">{meta}</p>}
        </div>
        {badge && <Badge tone="accent">{badge}</Badge>}
      </figcaption>
      <ol className="px-5 pt-3 pb-5">
        {lines.map((line, i) => (
          <li key={i} className="grid grid-cols-[22px_1fr_24px] items-baseline gap-3 text-[17px] leading-[1.6]">
            <span aria-hidden className="font-mono text-xs text-text-faint">{i + 1}</span>
            <span>
              {line.parts.map((p, j) => (typeof p === 'string' ? <span key={j}>{p}</span> : <RhymeWord key={j} family={p.f}>{p.w}</RhymeWord>))}
            </span>
            <span className="text-right font-mono text-xs text-text-muted" aria-label={`${line.syllables} syllables`}>{line.syllables}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Vaste voorbeeldtekst uit de brand guide. */
export const SAMPLE_LYRICS: LyricLine[] = [
  { parts: ['I been up all ', { w: 'night', f: 1 }], syllables: 5 },
  { parts: ['chasing the ', { w: 'light', f: 1 }], syllables: 4 },
  { parts: ['every line on the ', { w: 'page', f: 2 }], syllables: 7 },
  { parts: ['feels like a ', { w: 'stage', f: 2 }], syllables: 4 },
];
