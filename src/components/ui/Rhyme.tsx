import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type RhymeFamily = 1 | 2 | 3 | 4;

const fam = { 1: 'rhyme-1', 2: 'rhyme-2', 3: 'rhyme-3', 4: 'rhyme-4' } as const;

/** Een woord dat rijmt op andere woorden in dezelfde familie (zelfde kleur = zelfde rijm). */
export function RhymeWord({ family, children, className }: { family: RhymeFamily; children: ReactNode; className?: string }) {
  return <span className={cn('-mx-0.5 rounded-sm px-0.5 font-medium', fam[family], className)}>{children}</span>;
}

/** De rijmstrook: vier gelijke banden. Het enige decoratieve gebruik van de rijmkleuren. */
export function RhymeStrip({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('flex h-1.5 overflow-hidden rounded-full', className)}>
      <i className="flex-1 bg-rhyme-1" />
      <i className="flex-1 bg-rhyme-2" />
      <i className="flex-1 bg-rhyme-3" />
      <i className="flex-1 bg-rhyme-4" />
    </div>
  );
}
