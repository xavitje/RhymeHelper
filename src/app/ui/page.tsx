import type { Metadata } from 'next';
import { Download, ArrowRight, Plus } from 'lucide-react';
import {
  Badge, Button, ButtonLink, Card, Kbd, RhymeStrip, RhymeWord, SAMPLE_LYRICS, Section, SectionHeading, SongCard, Logo, LogoMark,
} from '../../components/ui';

// Interne overzichtspagina van de bouwstenen (voor review op de Vercel-preview). Niet indexeren.
export const metadata: Metadata = { title: 'UI kit', robots: { index: false, follow: false } };

const SWATCHES = [
  ['bg', 'bg-bg'], ['surface', 'bg-surface'], ['raised', 'bg-raised'], ['iris', 'bg-iris'], ['iris-deep', 'bg-iris-deep'],
  ['iris-light', 'bg-iris-light'], ['rhyme-1', 'bg-rhyme-1'], ['rhyme-2', 'bg-rhyme-2'], ['rhyme-3', 'bg-rhyme-3'], ['rhyme-4', 'bg-rhyme-4'],
] as const;

export default function UiKit() {
  return (
    <div className="pt-16">
      <Section>
        <SectionHeading as="h1" eyebrow="Internal" title="Find the rhyme." accent="Keep the flow." accentTone="iris" lead="The building blocks of rhymehelper.store, straight from the brand guide." />
        <RhymeStrip className="mt-10 w-60" />
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-2xl">Colour</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SWATCHES.map(([name, cls]) => (
            <div key={name} className="overflow-hidden rounded-lg border border-border">
              <div className={`h-16 ${cls}`} />
              <p className="px-3 py-2 font-mono text-xs text-text-muted">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-2xl">Type</h2>
        <div className="mt-6 space-y-5">
          <p className="text-5xl sm:text-display font-semibold tracking-[-0.035em]">Display 92</p>
          <p className="text-4xl sm:text-headline font-semibold tracking-[-0.03em]">Headline 56</p>
          <p className="text-lead text-text-muted">Lead 22 – The writing app for lyrics, with rhymes, syllables and your beat in one place.</p>
          <p className="text-base">Body 16 – Select a word in your lyrics, or type one above, to see rhymes.</p>
          <p className="font-mono text-xs text-text-muted">[01:12.40] 12 104 BPM</p>
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-2xl">Buttons, badges, keys</h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/downloads/windows" icon={Download}>Download free</ButtonLink>
          <Button variant="secondary" icon={Plus}>New song</Button>
          <Button variant="ghost">Cancel</Button>
          <ButtonLink href="/pricing" variant="pill" size="lg" iconRight={ArrowRight}>Start free</ButtonLink>
          <Button size="lg">Sign in</Button>
          <Button size="sm" variant="secondary">Add to lyrics</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge tone="accent">Pro</Badge><Badge>Free</Badge><Badge tone="success">Saved</Badge><Badge tone="warning">Offline</Badge><Badge tone="danger">Sync failed</Badge>
          <span className="ml-4 text-sm text-text-muted">Command palette</span> <Kbd keys={['Ctrl', 'K']} />
        </div>
      </Section>

      <Section className="border-t border-border">
        <h2 className="text-2xl">Song card and rhymes</h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <SongCard title="Midnight Pen" meta="4 lines · avg 5" badge="Verse 1" lines={SAMPLE_LYRICS} className="max-w-[440px]" />
          <Card>
            <p className="text-[17px] leading-relaxed">
              I been up all <RhymeWord family={1}>night</RhymeWord> chasing the <RhymeWord family={1}>light</RhymeWord>,
              every line on the <RhymeWord family={2}>page</RhymeWord> feels like a <RhymeWord family={2}>stage</RhymeWord>.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <Logo />
              <LogoMark size={48} />
              <LogoMark size={24} />
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
