import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { proPrice } from '../config';
import { FREE_HIGHLIGHTS, PRO_HIGHLIGHTS } from '../content/plans';
import { cn } from '../lib/cn';
import { Badge } from './ui/Badge';
import { ButtonLink } from './ui/Button';
import { GetAppButton } from './GetAppButton';
import type { Lang } from '../i18n/routes';
import { href } from '../i18n/routes';
import { fmtPrice } from '../i18n/ui';

const T = {
  en: { freeSub: 'Everything you need to write. Forever.', launch: 'Launch price', was: 'was', oneTime: 'One-time purchase.', until: (d: string) => ` Launch price until ${d}.`, plus: ' Everything in Free, plus:', buy: (p: string) => `Buy Pro for ${p}`, get: 'Get Pro' },
  nl: { freeSub: 'Alles wat je nodig hebt om te schrijven. Voor altijd.', launch: 'Lanceringsprijs', was: 'was', oneTime: 'Eenmalige aankoop.', until: (d: string) => ` Lanceringsprijs tot en met ${d}.`, plus: ' Alles uit Free, plus:', buy: (p: string) => `Koop Pro voor ${p}`, get: 'Bekijk Pro' },
} as const;

/**
 * Free- en Pro-kaart naast elkaar. `checkout` = de Pro-knop gaat direct naar Lemon Squeezy (prijspagina);
 * anders naar /pricing (homepage).
 */
export function PlanCards({ checkout = false, className, headingLevel = 3, lang = 'en' }: { checkout?: boolean; className?: string; headingLevel?: 2 | 3; lang?: Lang }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const pro = proPrice();
  const t = T[lang];
  const price = fmtPrice(lang, pro.price);
  const regular = fmtPrice(lang, pro.regular);
  return (
    <div className={cn('mx-auto grid max-w-4xl gap-6 md:grid-cols-2', className)}>
      <div className="flex flex-col rounded-xl border border-border bg-surface p-7">
        <div className="flex items-baseline justify-between">
          <H className="text-xl font-semibold">Free</H>
          <p className="text-2xl font-semibold tracking-[-0.02em]">€0</p>
        </div>
        <p className="mt-1 text-sm text-text-muted">{t.freeSub}</p>
        <ul className="mt-6 flex-1 space-y-3 text-[15px]">
          {FREE_HIGHLIGHTS[lang].map((f) => (
            <li key={f} className="flex gap-3"><Check aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-text-muted" />{f}</li>
          ))}
        </ul>
        <GetAppButton lang={lang} variant="secondary" size="lg" fullWidth short className="mt-8" />
      </div>

      <div className="flex flex-col rounded-xl border border-iris/60 bg-surface p-7 shadow-[0_0_0_1px_rgb(124_108_255/0.25)]">
        <div className="flex items-baseline justify-between gap-4">
          <H className="flex items-center gap-2 text-xl font-semibold">Pro {pro.isLaunch && <Badge tone="accent">{t.launch}</Badge>}</H>
          <p className="text-2xl font-semibold tracking-[-0.02em] whitespace-nowrap">
            {price}
            {pro.isLaunch && (
              <>
                {' '}
                <span className="text-base font-normal text-text-muted line-through" aria-label={`${t.was} ${regular}`}>{regular}</span>
              </>
            )}
          </p>
        </div>
        <p className="mt-1 text-sm text-text-muted">
          {t.oneTime}{pro.isLaunch && t.until(lang === 'nl' ? pro.lastDayNl : pro.lastDayEn)}{t.plus}
        </p>
        <ul className="mt-6 flex-1 space-y-3 text-[15px]">
          {PRO_HIGHLIGHTS[lang].map((f) => (
            <li key={f} className="flex gap-3"><Sparkles aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-iris-text" />{f}</li>
          ))}
        </ul>
        {checkout ? (
          <ButtonLink href={pro.checkoutUrl} external size="lg" fullWidth className="mt-8 lemonsqueezy-button">
            {t.buy(price)}
          </ButtonLink>
        ) : (
          <ButtonLink href={href(lang, 'pricing')} size="lg" iconRight={ArrowRight} fullWidth className="mt-8">{t.get}</ButtonLink>
        )}
      </div>
    </div>
  );
}
