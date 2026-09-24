import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-raised text-text-muted',
  accent: 'bg-iris/16 text-iris-text',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
};

/** Label van één of twee woorden ("Pro", "Free", "Saved"). Altijd een woord, nooit alleen kleur. */
export function Badge({ tone = 'neutral', className, children }: { tone?: BadgeTone; className?: string; children: ReactNode }) {
  return (
    <span className={cn('inline-flex h-5 items-center gap-1 rounded-full px-2 text-[11px] font-semibold leading-none whitespace-nowrap', tones[tone], className)}>
      {children}
    </span>
  );
}
