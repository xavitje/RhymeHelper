import type { Metadata } from 'next';
import { CheckCircle2, LayoutDashboard } from 'lucide-react';
import { SITE } from '../config';
import { ButtonLink, Container, Kbd, RhymeStrip } from '../components/ui';
import { GetAppButton, MacIntelLink } from '../components/GetAppButton';
import type { Lang } from '../i18n/routes';
import { href } from '../i18n/routes';

const T = {
  en: {
    meta: 'Welcome to Pro',
    steps: [
      { title: 'Find your license key', body: 'We emailed it to you right after your purchase (from Lemon Squeezy). Can’t find it? Check your spam folder or log in to your dashboard.' },
      { title: 'Open Rhyme Helper', body: 'Download and install the app if you haven’t yet (Windows or Mac). Windows may show a SmartScreen warning: click More info, then Run anyway.' },
      { title: 'Activate Pro', body: 'In the app, choose Upgrade to Pro, then “I already have a license key”, and paste your key. That’s it.' },
    ],
    paid: 'Payment received', h1: 'Welcome to Pro.', h1b: 'Let’s write.', lead: 'Thanks for supporting Rhyme Helper. Three steps and you’re set.',
    dash: 'Go to your dashboard',
    tipA: 'Tip: press', tipB: 'in the app to find any song, rhyme or action. Questions? Mail',
  },
  nl: {
    meta: 'Welkom bij Pro',
    steps: [
      { title: 'Zoek je licentiesleutel', body: 'We hebben hem direct na je aankoop gemaild (afzender Lemon Squeezy). Kun je hem niet vinden? Kijk in je spammap of log in op je dashboard.' },
      { title: 'Open Rhyme Helper', body: 'Download en installeer de app als je dat nog niet hebt gedaan (Windows of Mac). Windows kan een SmartScreen-melding tonen: klik op Meer informatie en dan op Toch uitvoeren.' },
      { title: 'Activeer Pro', body: 'Kies in de app Upgraden naar Pro, dan “Ik heb al een licentiesleutel”, en plak je sleutel. Klaar.' },
    ],
    paid: 'Betaling ontvangen', h1: 'Welkom bij Pro.', h1b: 'Tijd om te schrijven.', lead: 'Bedankt dat je Rhyme Helper steunt. Nog drie stappen en je bent klaar.',
    dash: 'Naar je dashboard',
    tipA: 'Tip: druk in de app op', tipB: 'om elk lied, rijm of commando te vinden. Vragen? Mail naar',
  },
} as const;

export const thankYouMetadata = (lang: Lang): Metadata => ({ title: T[lang].meta, robots: { index: false, follow: false } });

export function ThankYouView({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-56 left-1/2 h-[560px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.18),transparent)]" />
      <Container narrow className="relative py-16 sm:py-24">
        <p className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-[13px] font-medium text-success">
          <CheckCircle2 aria-hidden strokeWidth={1.75} className="size-4" /> {t.paid}
        </p>
        <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-headline">
          {t.h1} <span className="text-text-muted">{t.h1b}</span>
        </h1>
        <p className="mt-5 text-lg text-text-muted sm:text-lead">
          {t.lead}
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <RhymeStrip className="h-1 rounded-none" />
          <ol>
          {t.steps.map((s, i) => (
            <li key={s.title} className="flex gap-5 border-t border-border p-5 first-of-type:border-t-0 sm:p-6">
              <span aria-hidden className="font-mono text-sm text-text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="text-[17px] font-semibold tracking-[-0.01em]">{s.title}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-text-muted">{s.body}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <GetAppButton lang={lang} paid size="lg" />
          <ButtonLink href={href(lang, 'dashboard')} size="lg" variant="secondary" icon={LayoutDashboard}>{t.dash}</ButtonLink>
        </div>
        <MacIntelLink lang={lang} className="mt-3" />

        <p className="mt-10 text-sm text-text-muted">
          {t.tipA} <Kbd keys={['Ctrl', 'K']} /> {t.tipB}{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="text-text underline decoration-text-faint underline-offset-4 hover:decoration-text">{SITE.contactEmail}</a>.
        </p>
      </Container>
    </div>
  );
}
