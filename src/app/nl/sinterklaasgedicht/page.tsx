import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '../../../config';
import type { FaqItem } from '../../../content/faq';
import { FaqList } from '../../../components/home/FaqList';
import { GetAppButton } from '../../../components/GetAppButton';
import { Container, RhymeStrip, Section, SectionHeading, SongCard } from '../../../components/ui';
import type { LyricLine } from '../../../components/ui';

const TITLE = 'Sinterklaasgedicht schrijven met rijmwoorden';
const DESCRIPTION = 'Schrijf je Sinterklaasgedicht in een paar minuten: Rhyme Helper geeft Nederlandse rijmwoorden boven je woord en telt de lettergrepen per regel, zodat je gedicht lekker loopt. Gratis voor Windows.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['sinterklaasgedicht', 'sinterklaas gedicht maken', 'rijmwoorden', 'rijmwoordenboek', 'surprise gedicht', 'gedicht schrijven'],
  alternates: { canonical: '/nl/sinterklaasgedicht' },
  openGraph: { title: `${TITLE} · ${SITE.name}`, description: DESCRIPTION, url: '/nl/sinterklaasgedicht', locale: 'nl_NL' },
  twitter: { title: `${TITLE} · ${SITE.name}`, description: DESCRIPTION },
};

const POEM: LyricLine[] = [
  { parts: ['Sint zat in Madrid, met zijn boek op ', { w: 'schoot', f: 1 }], syllables: 10 },
  { parts: ['het rijm voor Sanne werd zijn grootste ', { w: 'nood', f: 1 }], syllables: 10 },
  { parts: ['Ze schrijft hele dagen, ze rapt in de ', { w: 'klas', f: 2 }], syllables: 11 },
  { parts: ['dus zat er een schrijfapp voor haar in de ', { w: 'tas', f: 2 }], syllables: 11 },
];

const STEPS = [
  { title: 'Begin met wie het is', body: 'Schrijf twee regels over de persoon: een hobby, een gewoonte, iets wat iedereen herkent. Maak je nog niet druk om het rijm.' },
  { title: 'Selecteer het laatste woord', body: 'Rhyme Helper zet de rijmwoorden er direct boven. Klik op een woord en het staat in je gedicht. Werkt ook met lastige woorden als "cadeau" of "chocola".' },
  { title: 'Kijk naar de lettergrepen', body: 'Achter elke regel staat het aantal lettergrepen. Houd ze ongeveer gelijk (bijvoorbeeld 10 of 11), dan loopt het gedicht als je het voorleest.' },
  { title: 'Print of maak een PDF', body: 'Netjes op papier, zonder knoppen of menu’s. Klaar om bij de surprise te stoppen.' },
];

const TIPS = [
  'Gebruik paarrijm: regel 1 en 2 rijmen, regel 3 en 4 rijmen. Dat is het klassieke Sinterklaasritme.',
  'Plaag lief. Eén grap over een gewoonte werkt beter dan drie over iemands uiterlijk.',
  'Laat de laatste regel naar het cadeau wijzen, zodat het uitpakken een clou heeft.',
  'Lees het hardop. Struikel je, kijk dan welke regel veel meer lettergrepen heeft dan de rest.',
  'Eindig met de klassieker: “Sint en Piet”. Dat rijmt op bijna alles met -iet.',
];

const FAQ_SINT: FaqItem[] = [
  { question: 'Kost het iets?', answer: 'Nee. Rijmwoorden, lettergrepen tellen en printen zitten in de gratis versie. Geen proefperiode, geen account nodig.' },
  { question: 'Werkt het op mijn Mac of telefoon?', answer: 'Nog niet. Rhyme Helper is er nu voor Windows 10 en 11.' },
  { question: 'Heb ik internet nodig?', answer: 'Nee. De Nederlandse rijmwoorden zitten in de app zelf, dus het werkt ook offline.' },
  { question: 'Schrijft de app het gedicht voor me?', answer: 'Nee, jij schrijft. De app geeft rijmwoorden en telt lettergrepen, zodat jouw gedicht beter loopt. Zo blijft het persoonlijk.' },
];

export default function Sinterklaasgedicht() {
  return (
    <div lang="nl">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.20),transparent)]" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <p className="text-[13px] font-medium text-iris-text">Pakjesavond 5 december</p>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl">
                Je Sinterklaasgedicht, <span className="text-iris-text">zonder rijmstress.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-text-muted sm:text-lead">
                Selecteer een woord en de Nederlandse rijmen staan erboven. Achter elke regel zie je de lettergrepen, zodat je gedicht lekker loopt als je het voorleest.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <GetAppButton lang="nl" size="lg" />
              </div>
              <p className="mt-4 text-sm text-text-muted">Gratis · Windows 10 en 11 · Werkt offline</p>
            </div>
            <SongCard title="Voor Sanne" meta="Sinterklaasgedicht · paarrijm" lines={POEM} />
          </div>
        </Container>
      </section>

      {/* Zo werkt het */}
      <Section className="border-t border-border">
        <SectionHeading title="In vier stappen" accent="van idee naar gedicht." />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-surface p-6">
              <span className="font-mono text-sm text-text-muted">{i + 1}</span>
              <h3 className="mt-4 text-[15px] font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Tips */}
      <Section className="border-t border-border" narrow>
        <SectionHeading title="Vijf tips" accent="voor een goed Sinterklaasgedicht." />
        <ul className="mt-10 space-y-4 text-[17px] leading-relaxed">
          {TIPS.map((t) => (
            <li key={t} className="border-l border-border pl-5 text-text-muted">{t}</li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border" narrow>
        <SectionHeading align="center" title="Vragen," accent="beantwoord." />
        <FaqList items={FAQ_SINT} className="mt-10" />
        <p className="mt-6 text-center text-sm text-text-muted">
          Schrijf je ook songteksten of raps? <Link href="/nl" className="text-iris-text underline decoration-iris-text/40 underline-offset-4 hover:decoration-iris-text">Lees wat Rhyme Helper daarvoor doet</Link>.
        </p>
      </Section>

      <section className="pb-8">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <RhymeStrip className="h-1 rounded-none" />
            <div className="flex flex-col items-start gap-8 px-7 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
                  Sint heeft het druk. <span className="text-text-muted">Jij nu niet meer.</span>
                </h2>
                <p className="mt-3 text-[17px] text-text-muted">Gratis voor Windows. Geen account nodig.</p>
              </div>
              <GetAppButton lang="nl" variant="pill" size="lg" short />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
