import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Container } from './Container';

/** Een blok op een pagina met vaste verticale ruimte. */
export function Section({ className, children, narrow, ...rest }: ComponentPropsWithoutRef<'section'> & { narrow?: boolean }) {
  return (
    <section className={cn('py-20 sm:py-28', className)} {...rest}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}

/**
 * Kop + lead. `accent` komt achter de titel in text-muted; `accentTone="iris"` alleen voor de ene Iris per scherm (hero).
 * Voorbeeld: <SectionHeading title="Every line," accent="counted." lead="…" />
 */
export function SectionHeading({
  eyebrow, title, accent, accentTone = 'muted', lead, align = 'left', as: Tag = 'h2', className,
}: {
  eyebrow?: ReactNode; title: ReactNode; accent?: ReactNode; accentTone?: 'muted' | 'iris'; lead?: ReactNode;
  align?: 'left' | 'center'; as?: 'h1' | 'h2'; className?: string;
}) {
  return (
    <div className={cn(Tag === 'h1' ? 'max-w-4xl' : 'max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="mb-4 text-[13px] font-medium text-iris-text">{eyebrow}</p>}
      <Tag className={cn(Tag === 'h1' ? 'text-5xl sm:text-7xl lg:text-display' : 'text-4xl sm:text-headline', 'font-semibold tracking-[-0.035em] leading-[1.04]')}>
        {title}
        {accent && <> <span className={accentTone === 'iris' ? 'text-iris-text' : 'text-text-muted'}>{accent}</span></>}
      </Tag>
      {lead && <p className="mt-5 text-lg sm:text-lead text-text-muted">{lead}</p>}
    </div>
  );
}
