import type { Metadata } from 'next';
import Link from 'next/link';
import { PenLine } from 'lucide-react';
import { APP_CONFIG, SITE } from '../../../config';
import { RhymeFinder } from '../../../components/RhymeFinder';
import { ButtonLink, Container, RhymeStrip, Section } from '../../../components/ui';
import { nlRhymesFor, type RhymeWord } from '../../../lib/rhymes/server';

// Rijmlijsten worden bij het bouwen opgehaald en daarna één keer per dag ververst.
export const revalidate = 86400;
export const dynamic = 'force-static';

const TITLE = 'Rijmwoorden voor je Sinterklaasgedicht';
const DESCRIPTION = 'Wat rijmt op cadeau, Piet, Sint of pepernoot? Rijmwoorden voor de woorden die in elk Sinterklaasgedicht staan, met een voorbeeldregel bij elk woord. Of zoek zelf een woord op.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/nl/sinterklaas-rijmwoorden' },
  openGraph: { title: `${TITLE} · ${SITE.name}`, description: DESCRIPTION, url: '/nl/sinterklaas-rijmwoorden', locale: 'nl_NL' },
  twitter: { title: `${TITLE} · ${SITE.name}`, description: DESCRIPTION },
};

/** De woorden die in Sinterklaasgedichten steeds terugkomen, elk met een eigen voorbeeld (zelf geschreven). */
const WORDS: { word: string; id: string; lines: [string, string] }[] = [
  { word: 'cadeau', id: 'cadeau', lines: ['Je vroeg om een fiets, maar ach, het is zo:', 'de Sint had nog plek voor een kleiner cadeau.'] },
  { word: 'Sinterklaas', id: 'sinterklaas', lines: ['Je speelt op je Xbox, je bent daar de baas,', 'maar wie wint er altijd? Juist: Sinterklaas.'] },
  { word: 'Sint', id: 'sint', lines: ['De Sint dacht heel lang: wat geef ik dit kind?', 'Iets wat ze écht leuk vindt, zo snel als de wind.'] },
  { word: 'Piet', id: 'piet', lines: ['Je zingt onder de douche, dat hoorde zelfs Piet,', 'maar meestal is het wel steeds hetzelfde lied.'] },
  { word: 'gedicht', id: 'gedicht', lines: ['De Sint zat te zweten op dit gedicht,', 'hij schreef het om middernacht, bij kaarslicht.'] },
  { word: 'schoen', id: 'schoen', lines: ['Wat vond Piet vanochtend weer in jouw schoen?', 'Een sok en een boterham. Wat moet hij doen?'] },
  { word: 'paard', id: 'paard', lines: ['Ozosnel stond te wachten, het trouwe paard,', 'terwijl Sint nog zocht naar de kam voor zijn baard.'] },
  { word: 'pepernoot', id: 'pepernoot', lines: ['Je at deze week weer een zak pepernoot,', 'de Sint zag het wel, en die zak was heel groot.'] },
  { word: 'stoomboot', id: 'stoomboot', lines: ['De Sint kwam uit Spanje, met de stoomboot,', 'met pakjes voor klein en voor groot.'] },
  { word: 'Spanje', id: 'spanje', lines: ['De Sint droeg een sjaal, ook al was het in Spanje:', 'jij gaf hem die vorig jaar, knaloranje.'] },
  { word: 'marsepein', id: 'marsepein', lines: ['Je houdt van taart en van marsepein,', 'maar dit cadeau is gelukkig niet klein.'] },
  { word: 'chocoladeletter', id: 'chocoladeletter', lines: ['Je viel van de trap bijna te pletter,', 'voor één hap van je chocoladeletter.'] },
  { word: 'snoep', id: 'snoep', lines: ['Je deelt nooit je snoep, dat weet de hele groep,', 'dus krijg jij van Sint dit jaar alleen maar soep.'] },
  { word: 'zak', id: 'zak', lines: ['Piet sjouwde het mee in zijn grote zak,', 'en klom er vannacht mee over het dak.'] },
  { word: 'schoorsteen', id: 'schoorsteen', lines: ['Dit pakje kwam vannacht door de schoorsteen,', 'voor jou en voor niemand anders, alleen.'] },
  { word: 'staf', id: 'staf', lines: ['De Sint pakte zijn mijter, zijn boek en zijn staf,', 'en reed naar jouw huis, in een rustige draf.'] },
  { word: 'brief', id: 'brief', lines: ['Je schreef aan de Sint een hele lange brief,', 'met tekeningen erbij. Wat was dat lief!'] },
  { word: 'pakjesavond', id: 'pakjesavond', lines: ['Wie belt er straks aan, misschien al vanavond?', 'Ja hoor, het is weer pakjesavond!'] },
  { word: 'december', id: 'december', lines: ['Je kalender stond nog op november,', 'maar kijk eens: het is al vijf december!'] },
  { word: 'roe', id: 'roe', lines: ['Je was soms wat stout, dat geef ik wel toe,', 'maar daarvoor krijg je echt nog geen roe.'] },
  { word: 'werk', id: 'werk', lines: ['Je zit elke dag tot laat op je werk,', 'dit pakje maakt je hopelijk weer sterk.'] },
  { word: 'telefoon', id: 'telefoon', lines: ['Je zit de hele dag op je telefoon,', 'dus schreef de Sint je deze keer heel gewoon.'] },
];

const link = 'text-iris-text underline decoration-iris-text/40 underline-offset-4 hover:decoration-iris-text';

async function rhymesOf(word: string): Promise<RhymeWord[]> {
  try {
    return (await nlRhymesFor(word, { perfectMax: 24, nearMax: 0 })).perfect;
  } catch {
    return []; // lijst even niet bereikbaar: de pagina werkt nog, de zoeker haalt ze later op
  }
}

export default async function SinterklaasRijmwoorden() {
  const lists = await Promise.all(WORDS.map((w) => rhymesOf(w.word)));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sinterklaasgedicht', item: `${SITE.url}/nl/sinterklaasgedicht` },
      { '@type': 'ListItem', position: 2, name: 'Rijmwoorden', item: `${SITE.url}/nl/sinterklaas-rijmwoorden` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="relative overflow-hidden pt-16 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.18),transparent)]" />
        <Container className="relative">
          <nav aria-label="Kruimelpad" className="text-sm text-text-muted">
            <Link href="/nl/sinterklaasgedicht" className="hover:text-text">Sinterklaasgedicht</Link> <span aria-hidden>›</span> Rijmwoorden
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            Rijmwoorden voor je <span className="text-iris-text">Sinterklaasgedicht</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-text-muted">
            Wat rijmt op cadeau, Piet of pepernoot? Hieronder staan de woorden die in bijna elk Sinterklaasgedicht terugkomen, elk met een voorbeeld. Zoek je een ander woord? Typ het hier.
          </p>
          <RhymeFinder className="mt-8" />
          <nav aria-label="Woorden op deze pagina" className="mt-8 flex flex-wrap gap-2 text-sm">
            {WORDS.map((w) => (
              <a key={w.id} href={`#${w.id}`} className="rounded-full border border-border px-3 py-1 text-text-muted hover:border-iris/60 hover:text-text">{w.word}</a>
            ))}
          </nav>
        </Container>
      </section>

      <Section narrow>
        <div className="space-y-14">
          {WORDS.map((w, i) => (
            <section key={w.id} id={w.id} className="scroll-mt-24" aria-labelledby={`h-${w.id}`}>
              <h2 id={`h-${w.id}`} className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">Wat rijmt op {w.word}?</h2>
              <blockquote className="mt-4 border-l-2 border-iris/60 pl-4 text-[17px] leading-relaxed text-text">
                {w.lines[0]}<br />{w.lines[1]}
              </blockquote>
              {lists[i].length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Rijmwoorden op ${w.word}`}>
                  {lists[i].map((r) => (
                    <li key={r.word} className="rounded-md bg-raised px-2.5 py-1 text-[15px]">{r.word}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Section>

      <section className="pb-8">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <RhymeStrip className="h-1 rounded-none" />
            <div className="flex flex-col items-start gap-8 px-7 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
                  Schrijf het hele gedicht. <span className="text-text-muted">Met de rijmen erbij.</span>
                </h2>
                <p className="mt-3 max-w-xl text-[17px] text-text-muted">
                  Selecteer een woord en de rijmen staan erboven, en je ziet hoeveel lettergrepen elke regel heeft. Gratis in je browser, ook op je telefoon. <Link href="/nl/sinterklaasgedicht" className={link}>Zo werkt het</Link>.
                </p>
              </div>
              <ButtonLink href={APP_CONFIG.SINT_TEMPLATE_URL} size="lg" icon={PenLine}>Begin je gedicht</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
