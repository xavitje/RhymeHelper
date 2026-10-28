import { TESTIMONIALS } from '../../content/testimonials';
import type { Lang } from '../../i18n/routes';
import { Section, SectionHeading } from '../ui';

const T = {
  en: { title: 'From writers', accent: 'using it.' },
  nl: { title: 'Van schrijvers', accent: 'die het gebruiken.' },
} as const;

/** Quotes van echte gebruikers. Rendert niets zolang er geen quotes zijn voor deze taal. */
export function Testimonials({ lang }: { lang: Lang }) {
  const items = TESTIMONIALS.filter((q) => !q.lang || q.lang === lang);
  if (items.length === 0) return null;
  return (
    <Section className="border-t border-border">
      <SectionHeading title={T[lang].title} accent={T[lang].accent} />
      <ul className={`mt-12 grid gap-6 ${items.length > 1 ? 'md:grid-cols-2' : ''} ${items.length > 2 ? 'lg:grid-cols-3' : ''}`}>
        {items.map((q) => (
          <li key={q.quote} className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <blockquote className="flex-1 text-[17px] leading-relaxed">“{q.quote}”</blockquote>
            <p className="mt-5 text-sm">
              {q.href ? <a href={q.href} className="font-semibold hover:underline" rel="noopener" target="_blank">{q.name}</a> : <span className="font-semibold">{q.name}</span>}
              {q.role && <span className="text-text-muted"> · {q.role}</span>}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
