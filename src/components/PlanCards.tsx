import { ArrowRight, Check, Download, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../config';
import { FREE_HIGHLIGHTS, PRO_HIGHLIGHTS } from '../content/plans';
import { cn } from '../lib/cn';
import { Badge } from './ui/Badge';
import { ButtonLink } from './ui/Button';

/**
 * Free- en Pro-kaart naast elkaar. `checkout` = de Pro-knop gaat direct naar Lemon Squeezy (prijspagina);
 * anders naar /pricing (homepage).
 */
export function PlanCards({ checkout = false, className }: { checkout?: boolean; className?: string }) {
  return (
    <div className={cn('mx-auto grid max-w-4xl gap-6 md:grid-cols-2', className)}>
      <div className="flex flex-col rounded-xl border border-border bg-surface p-7">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-semibold">Free</h3>
          <p className="text-2xl font-semibold tracking-[-0.02em]">€0</p>
        </div>
        <p className="mt-1 text-sm text-text-muted">Everything you need to write. Forever.</p>
        <ul className="mt-6 flex-1 space-y-3 text-[15px]">
          {FREE_HIGHLIGHTS.map((f) => (
            <li key={f} className="flex gap-3"><Check aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-text-muted" />{f}</li>
          ))}
        </ul>
        <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} variant="secondary" size="lg" icon={Download} fullWidth className="mt-8">
          Download free
        </ButtonLink>
      </div>

      <div className="flex flex-col rounded-xl border border-iris/60 bg-surface p-7 shadow-[0_0_0_1px_rgb(124_108_255/0.25)]">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="flex items-center gap-2 text-xl font-semibold">Pro <Badge tone="accent">Launch deal</Badge></h3>
          <p className="text-2xl font-semibold tracking-[-0.02em] whitespace-nowrap">
            {APP_CONFIG.SALE_PRICE}{' '}
            <span className="text-base font-normal text-text-muted line-through" aria-label={`was ${APP_CONFIG.PRICE}`}>{APP_CONFIG.PRICE}</span>
          </p>
        </div>
        <p className="mt-1 text-sm text-text-muted">One-time purchase. Everything in Free, plus:</p>
        <ul className="mt-6 flex-1 space-y-3 text-[15px]">
          {PRO_HIGHLIGHTS.map((f) => (
            <li key={f} className="flex gap-3"><Sparkles aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-iris-text" />{f}</li>
          ))}
        </ul>
        {checkout ? (
          <ButtonLink href={APP_CONFIG.LEMON_SQUEEZY_CHECKOUT_URL} external size="lg" fullWidth className="mt-8 lemonsqueezy-button">
            Buy Pro for {APP_CONFIG.SALE_PRICE}
          </ButtonLink>
        ) : (
          <ButtonLink href="/pricing" size="lg" iconRight={ArrowRight} fullWidth className="mt-8">Get Pro</ButtonLink>
        )}
      </div>
    </div>
  );
}
