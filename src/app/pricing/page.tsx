import type { Metadata } from 'next';
import { Check, Cloud, Info, Minus } from 'lucide-react';
import { APP_CONFIG } from '../../config';
import { COMPARISON } from '../../content/plans';
import { FAQS } from '../../content/faq';
import { PlanCards } from '../../components/PlanCards';
import { FaqList } from '../../components/home/FaqList';
import { Badge, ButtonLink, Container, Section, SectionHeading } from '../../components/ui';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `Rhyme Helper is free to use. Pro is a one-time purchase of ${APP_CONFIG.SALE_PRICE}: near rhymes, AI suggestions, Studio, tabs and split screen.`,
  alternates: { canonical: '/pricing' },
};

const PRICING_FAQ = FAQS.filter((f) =>
  /one-time|license key|more than one computer|Cloud Sync/i.test(f.question),
);

function Cell({ on, plan }: { on: boolean; plan: string }) {
  return on ? (
    <Check strokeWidth={1.75} className="mx-auto size-4 text-text" aria-label={`Included in ${plan}`} role="img" />
  ) : (
    <Minus strokeWidth={1.75} className="mx-auto size-4 text-text-faint" aria-label={`Not in ${plan}`} role="img" />
  );
}

export default function Pricing() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-4 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.16),transparent)]" />
        <Container className="relative">
          <SectionHeading
            className="[&_p]:mx-auto [&_p]:max-w-2xl"
            as="h1"
            align="center"
            title="Free to write."
            accent="Pay once for Pro."
            lead={`Rhyme Helper is free, with no trial and no time limit. Pro is a one-time purchase of ${APP_CONFIG.SALE_PRICE}, not a subscription.`}
          />
          <PlanCards checkout headingLevel={2} className="mt-14" />
          <p className="mt-6 text-center text-sm text-text-muted">
            Secure checkout by Lemon Squeezy.
          </p>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex gap-4">
              <Cloud aria-hidden strokeWidth={1.75} className="mt-1 size-5 shrink-0 text-text-muted" />
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold">Cloud Sync <Badge>Optional add-on</Badge></h2>
                <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-text-muted">
                  Automatic backups and your songs in sync on every computer. Works with Free and Pro. You need a free account.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
              <p className="text-lg font-semibold">{APP_CONFIG.CLOUD_SYNC_PRICE}<span className="text-sm font-normal text-text-muted"> / month</span></p>
              <ButtonLink href="/account" variant="secondary" size="sm">Set up in your account</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading align="center" title="Compare" accent="everything." />
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full border-collapse text-left text-[15px]">
            <caption className="sr-only">What is included in Free and Pro</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-5 py-4 text-sm font-medium text-text-muted sm:px-6">Feature</th>
                <th scope="col" className="w-20 px-2 py-4 text-center text-sm font-semibold sm:w-28">Free</th>
                <th scope="col" className="w-20 px-2 py-4 text-center text-sm font-semibold sm:w-28">
                  <Badge tone="accent">Pro</Badge>
                </th>
              </tr>
            </thead>
            {COMPARISON.map((group) => (
              <tbody key={group.title} className="border-b border-border last:border-b-0">
                <tr>
                  <th colSpan={3} scope="colgroup" className="bg-bg-subtle px-5 pt-5 pb-2 text-[13px] font-semibold text-text sm:px-6">
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-border first:border-t-0">
                    <th scope="row" className="px-5 py-3 font-normal text-text-muted sm:px-6">{row.feature}</th>
                    <td className="px-2 py-3"><Cell on={row.free} plan="Free" /></td>
                    <td className="px-2 py-3"><Cell on={row.pro} plan="Pro" /></td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Section>

      <Section className="border-t border-border" narrow>
        <SectionHeading align="center" title="Before you" accent="buy." />
        <FaqList items={PRICING_FAQ} className="mt-10" />

        <div className="mt-8 flex gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6">
          <Info aria-hidden strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-text-muted" />
          <div className="text-[15px] leading-relaxed text-text-muted">
            <p className="font-medium text-text">Installing on Windows</p>
            <p className="mt-1">
              Our code-signing certificate is still being processed, so Windows SmartScreen may show a blue warning the first time.
              Click <span className="rounded-sm bg-raised px-1.5 py-0.5 text-[13px] text-text">More info</span> and then{' '}
              <span className="rounded-sm bg-raised px-1.5 py-0.5 text-[13px] text-text">Run anyway</span> to install.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
