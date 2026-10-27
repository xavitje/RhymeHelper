import type { Metadata } from 'next';
import { Check, Cloud, Info, Minus } from 'lucide-react';
import { APP_CONFIG, proPrice } from '../config';
import { COMPARISON } from '../content/plans';
import { getFaqs } from '../content/faq';
import { PlanCards } from '../components/PlanCards';
import { FaqList } from '../components/home/FaqList';
import { Badge, ButtonLink, Container, Section, SectionHeading } from '../components/ui';
import type { Lang } from '../i18n/routes';
import { alternates, href } from '../i18n/routes';
import { fmtPrice } from '../i18n/ui';

const T = {
  en: {
    metaTitle: 'Pricing',
    metaDesc: (p: string) => `Rhyme Helper is free to use. Pro is a one-time purchase of ${p}: near rhymes, AI suggestions, Studio, tabs and split screen.`,
    title: 'Free to write.', accent: 'Pay once for Pro.',
    lead: (p: string) => `Rhyme Helper is free, with no trial and no time limit. Pro is a one-time purchase of ${p}, not a subscription.`,
    secure: 'Secure checkout by Lemon Squeezy.',
    addon: 'Optional add-on',
    cloudBody: 'Your songs in a cloud library, on every computer you write on. Changes sync in seconds, offline edits catch up later, and deleted songs can be restored for 30 days. Works with Free and Pro. You need a free account.',
    month: ' / month', setup: 'Set up in your account',
    compare: 'Compare', compareAccent: 'everything.', caption: 'What is included in Free and Pro', feature: 'Feature',
    incl: (p: string) => `Included in ${p}`, notIn: (p: string) => `Not in ${p}`,
    before: 'Before you', beforeAccent: 'buy.',
    winTitle: 'Installing on Windows',
    winBody: 'Our code-signing certificate is still being processed, so Windows SmartScreen may show a blue warning the first time. Click',
    more: 'More info', then: 'and then', run: 'Run anyway', toInstall: 'to install.',
  },
  nl: {
    metaTitle: 'Prijzen',
    metaDesc: (p: string) => `Rhyme Helper is gratis te gebruiken. Pro koop je één keer voor ${p}: bijna-rijmen, AI-suggesties, Studio, tabbladen en gesplitst scherm.`,
    title: 'Gratis schrijven.', accent: 'Eén keer betalen voor Pro.',
    lead: (p: string) => `Rhyme Helper is gratis, zonder proefperiode en zonder tijdslimiet. Pro koop je één keer voor ${p}. Geen abonnement.`,
    secure: 'Veilig afrekenen via Lemon Squeezy.',
    addon: 'Optionele uitbreiding',
    cloudBody: 'Je liedjes in een cloudbibliotheek, op elke computer waarop je schrijft. Wijzigingen staan binnen seconden overal, offline werk wordt later bijgewerkt en verwijderde liedjes kun je 30 dagen terugzetten. Werkt met Free en Pro. Je hebt een gratis account nodig.',
    month: ' / maand', setup: 'Instellen in je account',
    compare: 'Alles', compareAccent: 'vergeleken.', caption: 'Wat zit er in Free en Pro', feature: 'Functie',
    incl: (p: string) => `Zit in ${p}`, notIn: (p: string) => `Niet in ${p}`,
    before: 'Voordat je', beforeAccent: 'koopt.',
    winTitle: 'Installeren op Windows',
    winBody: 'Ons code-signing-certificaat wordt nog verwerkt, dus Windows SmartScreen kan de eerste keer een blauwe melding tonen. Klik op',
    more: 'Meer informatie', then: 'en dan op', run: 'Toch uitvoeren', toInstall: 'om te installeren.',
  },
} as const;

export function pricingMetadata(lang: Lang): Metadata {
  const t = T[lang];
  return {
    title: t.metaTitle,
    description: t.metaDesc(fmtPrice(lang, proPrice().price)),
    alternates: alternates('pricing', lang),
    ...(lang === 'nl' ? { openGraph: { locale: 'nl_NL', url: href('nl', 'pricing') } } : {}),
  };
}

const PRICING_FAQ = ['oneTime', 'licenseKey', 'devices', 'cloudSync'] as const;
const pricingFaq = (lang: Lang) => getFaqs(lang).filter((f) => f.id && (PRICING_FAQ as readonly string[]).includes(f.id));

function Cell({ on, plan, lang }: { on: boolean; plan: string; lang: Lang }) {
  return on ? (
    <Check strokeWidth={1.75} className="mx-auto size-4 text-text" aria-label={T[lang].incl(plan)} role="img" />
  ) : (
    <Minus strokeWidth={1.75} className="mx-auto size-4 text-text-faint" aria-label={T[lang].notIn(plan)} role="img" />
  );
}

export function PricingView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const price = fmtPrice(lang, proPrice().price);
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-4 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.16),transparent)]" />
        <Container className="relative">
          <SectionHeading
            className="[&_p]:mx-auto [&_p]:max-w-2xl"
            as="h1"
            align="center"
            title={t.title}
            accent={t.accent}
            lead={t.lead(price)}
          />
          <PlanCards lang={lang} checkout headingLevel={2} className="mt-14" />
          <p className="mt-6 text-center text-sm text-text-muted">
            {t.secure}
          </p>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex gap-4">
              <Cloud aria-hidden strokeWidth={1.75} className="mt-1 size-5 shrink-0 text-text-muted" />
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold">Cloud Sync <Badge>{t.addon}</Badge></h2>
                <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-text-muted">
                  {t.cloudBody}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
              <p className="text-lg font-semibold">{fmtPrice(lang, APP_CONFIG.CLOUD_SYNC_PRICE)}<span className="text-sm font-normal text-text-muted">{t.month}</span></p>
              <ButtonLink href={href(lang, 'account')} variant="secondary" size="sm">{t.setup}</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading align="center" title={t.compare} accent={t.compareAccent} />
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full border-collapse text-left text-[15px]">
            <caption className="sr-only">{t.caption}</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-5 py-4 text-sm font-medium text-text-muted sm:px-6">{t.feature}</th>
                <th scope="col" className="w-20 px-2 py-4 text-center text-sm font-semibold sm:w-28">Free</th>
                <th scope="col" className="w-20 px-2 py-4 text-center text-sm font-semibold sm:w-28">
                  <Badge tone="accent">Pro</Badge>
                </th>
              </tr>
            </thead>
            {COMPARISON[lang].map((group) => (
              <tbody key={group.title} className="border-b border-border last:border-b-0">
                <tr>
                  <th colSpan={3} scope="colgroup" className="bg-bg-subtle px-5 pt-5 pb-2 text-[13px] font-semibold text-text sm:px-6">
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-border first:border-t-0">
                    <th scope="row" className="px-5 py-3 font-normal text-text-muted sm:px-6">{row.feature}</th>
                    <td className="px-2 py-3"><Cell lang={lang} on={row.free} plan="Free" /></td>
                    <td className="px-2 py-3"><Cell lang={lang} on={row.pro} plan="Pro" /></td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Section>

      <Section className="border-t border-border" narrow>
        <SectionHeading align="center" title={t.before} accent={t.beforeAccent} />
        <FaqList items={pricingFaq(lang)} className="mt-10" />

        <div className="mt-8 flex gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6">
          <Info aria-hidden strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-text-muted" />
          <div className="text-[15px] leading-relaxed text-text-muted">
            <p className="font-medium text-text">{t.winTitle}</p>
            <p className="mt-1">
              {t.winBody} <span className="rounded-sm bg-raised px-1.5 py-0.5 text-[13px] text-text">{t.more}</span> {t.then}{' '}
              <span className="rounded-sm bg-raised px-1.5 py-0.5 text-[13px] text-text">{t.run}</span> {t.toInstall}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
