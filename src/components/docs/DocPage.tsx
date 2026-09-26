import type { ReactNode } from 'react';
import Breadcrumbs from '../Breadcrumbs';
import { cn } from '../../lib/cn';

/** Kop voor tekstpagina's (docs, FAQ, juridisch): kruimelpad, titel, lead/meta. */
export function DocHeader({ crumb, title, lead, className }: { crumb: string; title: ReactNode; lead?: ReactNode; className?: string }) {
  return (
    <header className={cn('border-b border-border pb-10', className)}>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: crumb }]} />
      <h1 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-5xl">{title}</h1>
      {lead && <div className="mt-4 max-w-2xl text-lg text-text-muted">{lead}</div>}
    </header>
  );
}

/** Leeskolom met rustige typografie voor lange tekst (68 tekens). */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        'max-w-[68ch] text-[16px] leading-[1.7] text-text-muted',
        '[&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-text',
        '[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:pl-1 [&_li::marker]:text-text-faint',
        '[&_strong]:font-medium [&_strong]:text-text [&_a]:text-text [&_a]:underline [&_a]:underline-offset-4',
      )}
    >
      {children}
    </div>
  );
}
