import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn';

/** Graphite-kaart met haarlijn. `pad` = marketing (24px) of app (16px). */
export function Card({ className, pad = 'lg', ...rest }: ComponentPropsWithoutRef<'div'> & { pad?: 'md' | 'lg' | 'none' }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface',
        pad === 'lg' && 'p-6',
        pad === 'md' && 'p-4',
        className,
      )}
      {...rest}
    />
  );
}
