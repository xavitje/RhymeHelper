import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Check, Cloud, Columns2, Command, History, Languages, Maximize2, Printer, StickyNote,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { APP_CONFIG, SITE, proPrice } from '../config';
import { getFaqs } from '../content/faq';
import { FadeIn } from '../components/FadeIn';
import { PlanCards } from '../components/PlanCards';
import { GetAppButton } from '../components/GetAppButton';
import { FaqList } from '../components/home/FaqList';
import { Badge, ButtonLink, Container, Kbd, RhymeStrip, RhymeWord, Section, SectionHeading } from '../components/ui';
import type { Lang } from '../i18n/routes';
import { alternates, href } from '../i18n/routes';
import { fmtPrice } from '../i18n/ui';

type Spotlight = {
  id: string; eyebrow: string; title: string; accent: string; body: string; points: ReactNode[];
  image: { src: string; w: number; h: number; alt: string };
};
type Feature = { icon: LucideIcon; title: string; body: ReactNode; pro?: boolean };

const IMG = {
  rhymes: { src: '/screens/app-rhymes.webp', w: 1720, h: 810 },
  flow: { src: '/screens/app-syllables.webp', w: 1610, h: 680 },
  studio: { src: '/screens/app-studio.webp', w: 1560, h: 490 },
};

const link = 'text-iris-text underline decoration-iris-text/40 underline-offset-4 hover:decoration-iris-text';

function content(lang: Lang) {
  const pro = fmtPrice(lang, proPrice().price);
  const cloud = fmtPrice(lang, APP_CONFIG.CLOUD_SYNC_PRICE);
  if (lang === 'nl') {
    return {
      metaTitle: 'Songteksten schrijven met rijmen en lettergrepen',
      metaDesc: 'Rhyme Helper is een schrijfapp voor songteksten en raps: Nederlandse en Engelse rijmwoorden, lettergrepen per regel en je beat in één venster. Gratis voor Windows.',
      h1: 'Vind het rijm.', h1Accent: 'Houd de flow.',
      lead: 'De schrijfapp voor songteksten en raps. Rijmen, lettergrepen per regel en je beat, samen in één rustig venster. In het Nederlands en het Engels.',
      seePro: 'Bekijk Pro',
      heroMeta: `Windows 10 en 11 · Altijd gratis · Pro ${pro} eenmalig`,
      heroAlt: 'Rhyme Helper met het lied “Midnight Pen”: songtekst met lettergrepen per regel, rijmwoorden in kleur en rechts het rijmpaneel voor “light”.',
      featTitle: 'Gemaakt om te schrijven,', featAccent: 'verder niets.',
      featLead: 'Alles waar je naar grijpt als je een lied schrijft, op de pagina waarop je schrijft.',
      spotlights: [
        { id: 'rhymes', eyebrow: 'Rijmen', title: 'Rijmen precies daar', accent: 'waar je schrijft.',
          body: 'Selecteer een woord en de rijmen staan erboven. Klik op een rijm om het te vervangen. Geen browsertabbladen, je raakt je plek niet kwijt.',
          points: [<>Houd <Kbd keys={['Ctrl']} /> ingedrukt en klik op een rijm om het achter je woord te zetten</>, <>Het zijpaneel groepeert rijmen op lettergrepen, naast je notities</>, <>Bijna-rijmen, synoniemen en meerlettergrepige zinsdelen met Pro</>],
          image: { ...IMG.rhymes, alt: 'Het woord “light” is geselecteerd in de editor. Een klein menu erboven toont rijmen: night, fight, height, tight, bright, flight.' } },
        { id: 'flow', eyebrow: 'Flow', title: 'Elke regel,', accent: 'geteld.',
          body: 'Rhyme Helper telt de lettergrepen van elke regel terwijl je typt en kleurt de woorden die rijmen. Je ziet je flow voordat je hem hardop zegt.',
          points: [<>Lettergrepen per regel, met een gemiddelde per couplet en refrein</>, <>Rijmschema in kleur: dezelfde kleur is hetzelfde rijm</>, <>BPM en toonsoort bij elk lied</>],
          image: { ...IMG.flow, alt: 'Een couplet met lettergrepen per regel (9, 10, 12, 12) en de rijmwoorden light, fight, height en night in amber, de refreinrijmen fold, told en gold in groen.' } },
        { id: 'studio', eyebrow: 'Studio · Pro', title: 'Je beat,', accent: 'gewoon erbij.',
          body: 'Sleep een beat in de app en schrijf terwijl hij speelt. Afspelen en pauzeren met één sneltoets, zonder je tekst te verlaten.',
          points: [<>Afspelen en pauzeren met <Kbd keys={['Ctrl', 'Space']} /></>, <>Loopen, tijdstempels zetten en gesynchroniseerde tekst exporteren als .lrc</>, <>Je tekst opslaan in de MP3 zelf</>],
          image: { ...IMG.studio, alt: 'Het refrein van een lied met de Studio-speler eronder: een afspeelknop, de beat “Late Night 92bpm”, een golfvorm en de tijd 0:09 van 0:41.' } },
      ] as Spotlight[],
      moreTitle: 'En alles', moreAccent: 'eromheen.', moreLead: 'De kleine dingen waardoor je blijft schrijven in plaats van zoeken.',
      features: [
        { icon: History, title: 'Autosave en geschiedenis', body: 'Elke wijziging wordt binnen een seconde bewaard. Ga terug naar elke eerdere versie.' },
        { icon: Maximize2, title: 'Focusmodus', body: <>Verberg alles behalve je tekst met <Kbd keys={['F11']} />.</> },
        { icon: Command, title: 'Opdrachtenpalet', body: <>Vind elk lied, rijm of commando met <Kbd keys={['Ctrl', 'K']} />.</> },
        { icon: StickyNote, title: 'Notities', body: 'Parkeer alternatieve regels en losse ideeën naast je lied, niet erin.' },
        { icon: Languages, title: 'Nederlands en Engels', body: 'De app, de rijmen en het tellen van lettergrepen werken in allebei.' },
        { icon: Printer, title: 'Printen en PDF', body: 'Nette tekstvellen met regelnummers, zonder knoppen of menu’s.' },
        { icon: Columns2, title: 'Tabbladen en gesplitst scherm', body: 'Houd meerdere liedjes open en schrijf er twee naast elkaar.', pro: true },
        { icon: Cloud, title: 'Cloud Sync', body: `Begin een lied op de ene computer, maak het af op de andere. Je cloudbibliotheek synchroniseert binnen seconden. Optioneel, ${cloud} per maand.` },
      ] as Feature[],
      whoTitle: 'Voor iedereen', whoAccent: 'die op een beat schrijft.',
      whoLyric: <>Ik schrijf tot de ochtend, de stad is nog <RhymeWord family={1}>stil</RhymeWord>,<br />elk woord op papier is precies wat ik <RhymeWord family={1}>wil</RhymeWord>.</>,
      audience: [
        { who: 'Rappers', what: 'Vind snel meerlettergrepige rijmen en houd elke regel op tel.' },
        { who: 'Zangers en songwriters', what: 'Bouw je coupletten en refreinen op en laat de lettergrepen passen bij je melodie.' },
        { who: 'Producers', what: 'Speel de instrumental af in de app en zet notities bij de opbouw van het nummer.' },
        { who: 'Dichters', what: 'Gebruik synoniemen en bijna-rijmen om precies het juiste woord te vinden.' },
      ],
      priceTitle: 'Gratis schrijven.', priceAccent: 'Pro voor meer.', priceLead: 'Begin met de gratis versie. Upgrade één keer, wanneer jij er klaar voor bent.',
      compareA: 'Vergelijk alles', compareB: 'in Free en Pro.',
      faqTitle: 'Vragen,', faqAccent: 'beantwoord.',
      faqMore: <>Meer in de <Link href={href('nl', 'faq')} className={link}>FAQ</Link> en de <Link href={href('nl', 'docs')} className={link}>handleiding</Link>. Een Sinterklaasgedicht schrijven? <Link href="/nl/sinterklaasgedicht" className={link}>Zo doe je dat</Link>.</>,
      endTitle: 'Je volgende couplet', endAccent: 'begint hier.', endSub: 'Gratis voor Windows. Geen account nodig.',
    };
  }
  return {
    metaTitle: undefined as string | undefined,
    metaDesc: undefined as string | undefined,
    h1: 'Find the rhyme.', h1Accent: 'Keep the flow.',
    lead: 'The writing app for lyrics. Rhymes, syllable counts and your beat, together in one quiet window.',
    seePro: 'See Pro',
    heroMeta: `Windows 10 and 11 · Free forever · Pro ${pro} one-time`,
    heroAlt: 'Rhyme Helper with the song “Midnight Pen”: lyrics with syllable counts per line, rhyming words in colour and the rhyme panel for “light” on the right.',
    featTitle: 'Built for writing,', featAccent: 'nothing else.',
    featLead: "Everything you reach for while writing a song, inside the page you're writing on.",
    spotlights: [
      { id: 'rhymes', eyebrow: 'Rhymes', title: 'Rhymes right where', accent: 'you write.',
        body: 'Select a word and rhymes appear above it. Click one to swap it in. No browser tabs, no losing your place.',
        points: [<>Hold <Kbd keys={['Ctrl']} /> and click a rhyme to add it after your word</>, <>The side panel groups rhymes by syllables, next to your notes</>, <>Near rhymes, synonyms and multi-syllable phrases with Pro</>],
        image: { ...IMG.rhymes, alt: 'The word “light” is selected in the editor. A small menu above it shows rhymes: night, fight, height, tight, bright, flight.' } },
      { id: 'flow', eyebrow: 'Flow', title: 'Every line,', accent: 'counted.',
        body: 'Rhyme Helper counts the syllables of every line while you type and colours the words that rhyme. You see your flow before you say it out loud.',
        points: [<>Syllables per line, with an average per verse and chorus</>, <>Rhyme scheme in colour: the same colour means the same rhyme</>, <>BPM and key on every song</>],
        image: { ...IMG.flow, alt: 'A verse with syllable counts per line (9, 10, 12, 12) and the rhyming words light, fight, height and night marked in amber, the chorus rhymes fold, told and gold in green.' } },
      { id: 'studio', eyebrow: 'Studio · Pro', title: 'Your beat,', accent: 'right there.',
        body: 'Drop a beat into the app and write while it plays. Play and pause with one shortcut, without leaving your lyrics.',
        points: [<>Play and pause with <Kbd keys={['Ctrl', 'Space']} /></>, <>Loop, set timestamps and export synced lyrics as .lrc</>, <>Save your lyrics into the MP3 itself</>],
        image: { ...IMG.studio, alt: 'The chorus of a song with the Studio player below it: a play button, the beat “Late Night 92bpm”, a waveform and the time 0:09 of 0:41.' } },
    ] as Spotlight[],
    moreTitle: 'And everything', moreAccent: 'around it.', moreLead: 'The small things that keep you writing instead of searching.',
    features: [
      { icon: History, title: 'Autosave and history', body: 'Every change is saved within a second. Go back to any earlier version.' },
      { icon: Maximize2, title: 'Focus mode', body: <>Hide everything but your lyrics with <Kbd keys={['F11']} />.</> },
      { icon: Command, title: 'Command palette', body: <>Find any song, rhyme or action with <Kbd keys={['Ctrl', 'K']} />.</> },
      { icon: StickyNote, title: 'Notes', body: 'Park alternate bars and loose ideas next to your song, not in it.' },
      { icon: Languages, title: 'English and Dutch', body: 'The app, the rhymes and the syllable counts work in both.' },
      { icon: Printer, title: 'Print and PDF', body: 'Clean lyric sheets with line numbers, without any app chrome.' },
      { icon: Columns2, title: 'Tabs and split screen', body: 'Keep several songs open and write two side by side.', pro: true },
      { icon: Cloud, title: 'Cloud Sync', body: `Start a song on one computer, finish it on another. Your cloud library syncs in seconds. Optional, ${cloud} a month.` },
    ] as Feature[],
    whoTitle: 'For everyone', whoAccent: 'who writes to a beat.',
    whoLyric: <>I been up all <RhymeWord family={1}>night</RhymeWord> chasing the <RhymeWord family={1}>light</RhymeWord>,<br />every line on the <RhymeWord family={2}>page</RhymeWord> feels like a <RhymeWord family={2}>stage</RhymeWord>.</>,
    audience: [
      { who: 'Rappers', what: 'Find multi-syllable rhymes fast and keep every bar on count.' },
      { who: 'Singers and songwriters', what: 'Structure verses and choruses and match syllables to your melody.' },
      { who: 'Producers', what: 'Play the instrumental in the app and leave notes on the song structure.' },
      { who: 'Poets', what: 'Use synonyms and near rhymes to find the exact word.' },
    ],
    priceTitle: 'Free to write.', priceAccent: 'Pro to go further.', priceLead: "Start with the free version. Upgrade once, whenever you're ready.",
    compareA: 'Compare everything', compareB: 'in Free and Pro.',
    faqTitle: 'Questions,', faqAccent: 'answered.',
    faqMore: <>More in the <Link href="/faq" className={link}>FAQ</Link> and the <Link href="/resources" className={link}>docs</Link>.</>,
    endTitle: 'Your next verse', endAccent: 'starts here.', endSub: 'Free for Windows. No account needed.',
  };
}

export function homeMetadata(lang: Lang): Metadata {
  const c = content(lang);
  if (lang === 'en') return { alternates: alternates('home', 'en') };
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: alternates('home', 'nl'),
    openGraph: { title: `${SITE.name} – Vind het rijm. Houd de flow.`, description: c.metaDesc, url: '/nl', locale: 'nl_NL' },
    twitter: { title: `${SITE.name} – Vind het rijm. Houd de flow.`, description: c.metaDesc },
  };
}

/** Founding Writers: alleen op de Nederlandse homepage (de eerste outreach is Nederlands). */
function FoundingWriters() {
  return (
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
          Doe je mee? Mail naar <a href={`mailto:${SITE.contactEmail}?subject=Founding%20Writer`} className={link}>{SITE.contactEmail}</a> met je artiestennaam en een link naar je werk.
        </p>
      </div>
    </Section>
  );
}

export function HomeView({ lang }: { lang: Lang }) {
  const c = content(lang);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.22),transparent)]" />
        <Container className="relative text-center">
          <div>
            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-display">
              {c.h1} <span className="text-iris-text">{c.h1Accent}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted sm:text-lead">{c.lead}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GetAppButton lang={lang} size="lg" />
              <ButtonLink href={href(lang, 'pricing')} size="lg" variant="secondary" iconRight={ArrowRight}>{c.seePro}</ButtonLink>
            </div>
            <p className="mt-4 text-sm text-text-muted">{c.heroMeta}</p>
          </div>

          <div className="mt-14 sm:mt-20">
            <div className="relative mx-auto max-w-[1120px] rounded-xl border border-border-strong bg-surface p-1.5 shadow-modal sm:rounded-2xl sm:p-2">
              <Image
                src="/screens/app-editor.webp"
                width={2880}
                height={1800}
                priority
                sizes="(min-width: 1200px) 1104px, 100vw"
                alt={c.heroAlt}
                className="h-auto w-full rounded-lg sm:rounded-xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Uitgelicht */}
      <Section id="features" className="scroll-mt-16">
        <SectionHeading title={c.featTitle} accent={c.featAccent} lead={c.featLead} />
        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {c.spotlights.map((s, i) => (
            <FadeIn key={s.id}>
              <div id={s.id} className={`grid scroll-mt-24 items-center gap-10 lg:gap-16 ${i % 2 === 1 ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                  <p className="text-[13px] font-medium text-iris-text">{s.eyebrow}</p>
                  <h3 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
                    {s.title} <span className="text-text-muted">{s.accent}</span>
                  </h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-text-muted">{s.body}</p>
                  <ul className="mt-6 space-y-3 text-[15px]">
                    {s.points.map((p, j) => (
                      <li key={j} className="flex gap-3">
                        <Check aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-iris-text" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : undefined}>
                  <div className="overflow-hidden rounded-xl border border-border bg-bg shadow-float">
                    <Image src={s.image.src} width={s.image.w} height={s.image.h} alt={s.image.alt} sizes="(min-width: 1024px) 680px, 100vw" className="h-auto w-full" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Alles erbij */}
      <Section className="border-t border-border">
        <SectionHeading title={c.moreTitle} accent={c.moreAccent} lead={c.moreLead} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {c.features.map((f) => (
            <li key={f.title} className="bg-surface p-6">
              <div className="flex items-center justify-between">
                <f.icon aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" />
                {f.pro && <Badge tone="accent">Pro</Badge>}
              </div>
              <h3 className="mt-5 text-[15px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Voor wie */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading title={c.whoTitle} accent={c.whoAccent} />
            <p className="mt-8 text-[17px] leading-relaxed text-text-muted">{c.whoLyric}</p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {c.audience.map((a) => (
              <div key={a.who} className="bg-surface p-6">
                <dt className="text-lg font-semibold tracking-[-0.02em]">{a.who}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-text-muted">{a.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Free en Pro */}
      <Section className="border-t border-border" id="pricing">
        <SectionHeading align="center" title={c.priceTitle} accent={c.priceAccent} lead={c.priceLead} />
        <PlanCards lang={lang} className="mt-12" />
        <p className="mt-6 text-center text-sm text-text-muted">
          <Link href={href(lang, 'pricing')} className={link}>{c.compareA}</Link> {c.compareB}
        </p>
      </Section>

      {lang === 'nl' && <FoundingWriters />}

      {/* FAQ */}
      <Section className="border-t border-border" narrow>
        <SectionHeading align="center" title={c.faqTitle} accent={c.faqAccent} />
        <FaqList items={getFaqs(lang).slice(0, 5)} className="mt-10" />
        <p className="mt-6 text-center text-sm text-text-muted">{c.faqMore}</p>
      </Section>

      {/* Afsluiter */}
      <section className="pb-8">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <RhymeStrip className="h-1 rounded-none" />
            <div className="flex flex-col items-start gap-8 px-7 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
                  {c.endTitle} <span className="text-text-muted">{c.endAccent}</span>
                </h2>
                <p className="mt-3 text-[17px] text-text-muted">{c.endSub}</p>
              </div>
              <GetAppButton lang={lang} variant="pill" size="lg" short />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
