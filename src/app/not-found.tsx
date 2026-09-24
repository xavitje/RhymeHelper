import type { Metadata } from 'next';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { SongCard } from '../components/ui/SongCard';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-64 left-1/2 h-[560px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.18),transparent)]" />
      <div className="relative mx-auto grid min-h-[70vh] w-full max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_440px]">
        <div>
          <p className="font-mono text-sm text-text-muted">404</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-headline">
            This page <span className="text-iris-text">missed the beat.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-text-muted sm:text-lead">
            The page you're looking for doesn't exist or has moved. Let's get you back to writing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg" icon={ArrowLeft}>Back to home</ButtonLink>
            <ButtonLink href="/resources" size="lg" variant="secondary" icon={BookOpen}>Read the docs</ButtonLink>
          </div>
        </div>
        <SongCard
          title="Lost Verse"
          meta="2 lines · 1 missing"
          badge="404"
          lines={[
            { parts: ['Looked all over for this ', { w: 'page', f: 1 }], syllables: 7 },
            { parts: ['but it already left the ', { w: 'stage', f: 1 }], syllables: 7 },
          ]}
        />
      </div>
    </div>
  );
}
