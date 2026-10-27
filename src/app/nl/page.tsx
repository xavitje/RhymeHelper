import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, AudioLines, Check, Download, Hash, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { APP_CONFIG, SITE, proPrice, nlPrice } from '../../config';
import type { FaqItem } from '../../content/faq';
import { FaqList } from '../../components/home/FaqList';
import { Badge, ButtonLink, Container, RhymeStrip, Section, SectionHeading, SongCard } from '../../components/ui';
import type { LyricLine } from '../../components/ui';

const TITLE = 'Songteksten schrijven met rijmen en lettergrepen';
const DESCRIPTION = 'Rhyme Helper is een schrijfapp voor songteksten en raps: Nederlandse en Engelse rijmwoorden, lettergrepen per regel en je beat in één venster. Gratis voor Windows.';

export const revalidate = 3600; // prijs volgt PRO_PRICING in config.ts

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/nl', languages: { en: '/', nl: '/nl' } },
  openGraph: { title: `${SITE.name} – Vind het rijm. Houd de flow.`, description: DESCRIPTION, url: '/nl', locale: 'nl_NL' },
  twitter: { title: `${SITE.name} – Vind het rijm. Houd de flow.`, description: DESCRIPTION },
};

const LYRICS: LyricLine[] = [
  { parts: ['Ik schrijf tot de ochtend, de stad is nog ', { w: 'stil', f: 1 }], syllables: 11 },
  { parts: ['elk woord op papier is precies wat ik ', { w: 'wil', f: 1 }], syllables: 11 },
  { parts: ['de beat in mijn oren, de pen in mijn ', { w: 'hand', f: 2 }], syllables: 11 },
  { parts: ['ik schrijf aan een flow voor het hele ', { w: 'land', f: 2 }], syllables: 10 },
];

const POINTS: { icon: LucideIcon; title: string; body: string; pro?: boolean }[] = [
  { icon: Sparkles, title: 'Rijmen boven je woord', body: 'Selecteer een woord en de rijmen staan erboven. Klik en het staat in je tekst. Ook in het Nederlands, ook offline.' },
  { icon: Hash, title: 'Lettergrepen per regel', body: 'Elke regel telt mee terwijl je typt, met een gemiddelde per couplet en refrein. Zo hoor je je flow voordat je hem uitspreekt.' },
  { icon: AudioLines, title: 'Je beat erbij', body: 'Sleep je beat in de app en schrijf terwijl hij speelt. Afspelen en pauzeren met Ctrl + Spatie.', pro: true },
];

const faqNl = (): FaqItem[] => [
  { question: 'Is Rhyme Helper echt gratis?', answer: 'Ja. De gratis versie heeft de volledige editor, perfecte rijmen, lettergrepen per regel, notities, autosave en versiegeschiedenis. Geen proefperiode, geen tijdslimiet.' },
  { question: 'Werken de rijmen echt in het Nederlands?', answer: 'Ja. De app, de rijmwoorden en het tellen van lettergrepen werken in het Nederlands en het Engels. Je kiest de taal bij de eerste start en kunt hem altijd wisselen.' },
  { question: 'Is Pro een abonnement?', answer: `Nee. Pro koop je één keer voor ${nlPrice(proPrice().price)}, inclusief updates. Alleen Cloud Sync (${APP_CONFIG.CLOUD_SYNC_PRICE.replace('.', ',')} per maand) is een abonnement, en dat is optioneel.` },
  { question: 'Werkt het op een Mac of telefoon?', answer: 'Nog niet. Rhyme Helper is er nu voor Windows 10 en 11.' },
  { question: 'Windows zegt "Windows heeft uw pc beschermd". Is dat veilig?', answer: 'Die melding krijg je bij nieuwe apps van kleine makers. Klik op "Meer informatie" en dan op "Toch uitvoeren". De installer komt rechtstreeks van onze GitHub-release.' },
];

export default function NlHome() {
  return (
    <div lang="nl">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.22),transparent)]" />
        <Container className="relative text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-display">
            Vind het rijm. <span className="text-iris-text">Houd de flow.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted sm:text-lead">
            De schrijfapp voor songteksten en raps. Nederlandse rijmen, lettergrepen per regel en je beat, samen in één rustig venster.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} size="lg" icon={Download}>Gratis downloaden voor Windows</ButtonLink>
            <ButtonLink href="/pricing" size="lg" variant="secondary" iconRight={ArrowRight}>Bekijk Pro</ButtonLink>
          </div>
          <p className="mt-4 text-sm text-text-muted">
            Windows 10 en 11 · Altijd gratis · Pro {nlPrice(proPrice().price)} eenmalig
          </p>
          <div className="mt-14 sm:mt-20">
            <div className="relative mx-auto max-w-[1120px] rounded-xl border border-border-strong bg-surface p-1.5 shadow-modal sm:rounded-2xl sm:p-2">
              <Image
                src="/screens/app-editor.webp"
                width={2880}
                height={1800}
                priority
                sizes="(min-width: 1200px) 1104px, 100vw"
                alt="Rhyme Helper met een songtekst: lettergrepen per regel, rijmwoorden in kleur en rechts het rijmpaneel."
                className="h-auto w-full rounded-lg sm:rounded-xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Wat het doet */}
      <Section className="border-t border-border">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <SectionHeading title="Gemaakt om te schrijven," accent="in je eigen taal." lead="Engelse rijmtools snappen Nederlands niet. Rhyme Helper wel: rijmen, bijna-rijmen en lettergrepen werken in allebei de talen." />
            <ul className="mt-10 space-y-6">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <p.icon aria-hidden strokeWidth={1.75} className="mt-1 size-5 shrink-0 text-text-muted" />
                  <div>
                    <h3 className="flex items-center gap-2 text-[17px] font-semibold">{p.title}{p.pro && <Badge tone="accent">Pro</Badge>}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <SongCard title="Ochtendlicht" meta="Couplet 1 · 88 BPM · A mineur" lines={LYRICS} />
        </div>
      </Section>

      {/* Founding Writers */}
      <Section className="border-t border-border" narrow>
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <p className="text-[13px] font-medium text-iris-text">Founding Writers</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
            Schrijf mee <span className="text-text-muted">vanaf het begin.</span>
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-text-muted">
            Rhyme Helper is gemaakt door één onafhankelijke maker uit Nederland. De eerste 50 schrijvers krijgen Pro gratis, in ruil voor eerlijke feedback na twee weken schrijven.
          </p>
          <ul className="mt-6 space-y-3 text-[15px]">
            {['Pro voor altijd, zonder te betalen', 'Twee weken schrijven, daarna 15 minuten feedback', 'Wil je, dan kom je met naam op de site'].map((t) => (
              <li key={t} className="flex gap-3">
                <Check aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-iris-text" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-text-muted">
            Doe je mee? Mail naar <a href={`mailto:${SITE.contactEmail}?subject=Founding%20Writer`} className="text-iris-text underline decoration-iris-text/40 underline-offset-4 hover:decoration-iris-text">{SITE.contactEmail}</a> met je artiestennaam en een link naar je werk.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border" narrow>
        <SectionHeading align="center" title="Vragen," accent="beantwoord." />
        <FaqList items={faqNl()} className="mt-10" headingLevel={3} />
        <p className="mt-6 text-center text-sm text-text-muted">
          Een Sinterklaasgedicht schrijven? <Link href="/nl/sinterklaasgedicht" className="text-iris-text underline decoration-iris-text/40 underline-offset-4 hover:decoration-iris-text">Zo doe je dat met Rhyme Helper</Link>.
        </p>
      </Section>

      {/* Afsluiter */}
      <section className="pb-8">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <RhymeStrip className="h-1 rounded-none" />
            <div className="flex flex-col items-start gap-8 px-7 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
                  Je volgende couplet <span className="text-text-muted">begint hier.</span>
                </h2>
                <p className="mt-3 text-[17px] text-text-muted">Gratis voor Windows. Geen account nodig.</p>
              </div>
              <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} variant="pill" size="lg" icon={Download}>Gratis downloaden</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
