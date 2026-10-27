import type { Metadata } from 'next';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { SongCard } from '../components/ui/SongCard';
import type { Lang } from '../i18n/routes';
import { href } from '../i18n/routes';

const T = {
  en: {
    meta: 'Page not found', h1: 'This page', accent: 'missed the beat.',
    lead: "The page you're looking for doesn't exist or has moved. Let's get you back to writing.",
    home: 'Back to home', docs: 'Read the docs', song: 'Lost Verse', meta2: '2 lines · 1 missing',
    l1: 'Looked all over for this ', w1: 'page', s1: 7, l2: 'but it already left the ', w2: 'stage', s2: 7,
  },
  nl: {
    meta: 'Pagina niet gevonden', h1: 'Deze pagina', accent: 'mist de beat.',
    lead: 'De pagina die je zoekt bestaat niet of is verhuisd. Snel terug naar het schrijven.',
    home: 'Terug naar home', docs: 'Lees de handleiding', song: 'Kwijt couplet', meta2: '2 regels · 1 kwijt',
    l1: 'Ik zocht deze pagina ', w1: 'overal', s1: 10, l2: 'maar hij is uit de maat, wat een vreemd ', w2: 'geval', s2: 11,
  },
} as const;

export const notFoundMetadata = (lang: Lang): Metadata => ({ title: T[lang].meta });


export function NotFoundView({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="relative overflow-hidden">
      <title>{`${t.meta} · Rhyme Helper`}</title>
      <div aria-hidden className="pointer-events-none absolute -top-64 left-1/2 h-[560px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.18),transparent)]" />
      <div className="relative mx-auto grid min-h-[70vh] w-full max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_440px]">
        <div>
          <p className="font-mono text-sm text-text-muted">404</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-headline">
            {t.h1} <span className="text-iris-text">{t.accent}</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-text-muted sm:text-lead">
            {t.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={href(lang, 'home')} size="lg" icon={ArrowLeft}>{t.home}</ButtonLink>
            <ButtonLink href={href(lang, 'docs')} size="lg" variant="secondary" icon={BookOpen}>{t.docs}</ButtonLink>
          </div>
        </div>
        <SongCard
          title={t.song}
          meta={t.meta2}
          badge="404"
          lines={[
            { parts: [t.l1, { w: t.w1, f: 1 }], syllables: t.s1 },
            { parts: [t.l2, { w: t.w2, f: 1 }], syllables: t.s2 },
          ]}
        />
      </div>
    </div>
  );
}
