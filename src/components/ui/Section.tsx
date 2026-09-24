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
 * Kop + lead. `accent` wordt achter de titel gezet in iris-text (één accent per kop).
 * Voorbeeld: <SectionHeading title="Every line," accent="counted." lead="…" />
 */
export function SectionHeading({
  eyebrow, title, accent, lead, align = 'left', as: Tag = 'h2', className,
}: {
  eyebrow?: ReactNode; title: ReactNode; accent?: ReactNode; lead?: ReactNode;
  align?: 'left' | 'center'; as?: 'h1' | 'h2'; className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="mb-4 text-[13px] font-medium text-iris-text">{eyebrow}</p>}
      <Tag className={cn(Tag === 'h1' ? 'text-5xl sm:text-7xl lg:text-display' : 'text-4xl sm:text-headline', 'font-semibold tracking-[-0.035em] leading-[1.04]')}>
        {title}
        {accent && <> <span className="text-iris-text">{accent}</span></>}
      </Tag>
      {lead && <p className="mt-5 text-lg sm:text-lead text-text-muted">{lead}</p>}
    </div>
  );
}
