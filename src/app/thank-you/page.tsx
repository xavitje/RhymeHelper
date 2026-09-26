import type { Metadata } from 'next';
import { CheckCircle2, Download, LayoutDashboard } from 'lucide-react';
import { APP_CONFIG, SITE } from '../../config';
import { ButtonLink, Container, Kbd, RhymeStrip } from '../../components/ui';

export const metadata: Metadata = {
  title: 'Welcome to Pro',
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    title: 'Find your license key',
    body: 'We emailed it to you right after your purchase (from Lemon Squeezy). Can’t find it? Check your spam folder or log in to your dashboard.',
  },
  {
    title: 'Open Rhyme Helper',
    body: 'Download and install the app if you haven’t yet. Windows may show a SmartScreen warning: click More info, then Run anyway.',
  },
  {
    title: 'Activate Pro',
    body: 'In the app, choose Upgrade to Pro, then “I already have a license key”, and paste your key. That’s it.',
  },
];

export default function ThankYou() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-56 left-1/2 h-[560px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.18),transparent)]" />
      <Container narrow className="relative py-16 sm:py-24">
        <p className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-[13px] font-medium text-success">
          <CheckCircle2 aria-hidden strokeWidth={1.75} className="size-4" /> Payment received
        </p>
        <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-headline">
          Welcome to Pro. <span className="text-text-muted">Let’s write.</span>
        </h1>
        <p className="mt-5 text-lg text-text-muted sm:text-lead">
          Thanks for supporting Rhyme Helper. Three steps and you’re set.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface">
          <RhymeStrip className="h-1 rounded-none" />
          <ol>
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-5 border-t border-border p-5 first-of-type:border-t-0 sm:p-6">
              <span aria-hidden className="font-mono text-sm text-text-faint">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="text-[17px] font-semibold tracking-[-0.01em]">{s.title}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-text-muted">{s.body}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} size="lg" icon={Download}>Download for Windows</ButtonLink>
          <ButtonLink href="/dashboard" size="lg" variant="secondary" icon={LayoutDashboard}>Go to your dashboard</ButtonLink>
        </div>

        <p className="mt-10 text-sm text-text-muted">
          Tip: press <Kbd keys={['Ctrl', 'K']} /> in the app to find any song, rhyme or action. Questions? Mail{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="text-text underline-offset-4 hover:underline">{SITE.contactEmail}</a>.
        </p>
      </Container>
    </div>
  );
}
