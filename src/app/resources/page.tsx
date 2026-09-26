import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { DOCS, SHORTCUTS } from '../../content/docs';
import { SITE } from '../../config';
import { DocHeader } from '../../components/docs/DocPage';
import { KeyCombo, RichText } from '../../components/docs/RichText';
import { Badge, ButtonLink, Container } from '../../components/ui';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'How to use Rhyme Helper: writing, finding rhymes, songs and files, Studio, Pro and Cloud Sync, plus every keyboard shortcut.',
  alternates: { canonical: '/resources' },
};

const TOC = [...DOCS.map((s) => ({ id: s.id, title: s.title })), { id: 'shortcuts', title: 'Keyboard shortcuts' }];

export default function Docs() {
  return (
    <Container className="py-12 sm:py-16">
      <DocHeader
        crumb="Docs"
        title={<>How Rhyme Helper <span className="text-text-muted">works.</span></>}
        lead="Everything you need to know to write faster, from your first song to Studio."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-[13px] font-semibold text-text">On this page</p>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0.5">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="block rounded-md px-2.5 py-1.5 text-sm text-text-muted transition-colors hover:bg-raised hover:text-text max-lg:border max-lg:border-border">
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 max-w-3xl">
          {DOCS.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="scroll-mt-24 border-b border-border pb-12 mb-12 last:border-0">
              <h2 id={`${section.id}-h`} className="text-2xl font-semibold tracking-[-0.02em]">{section.title}</h2>
              {section.intro && <p className="mt-3 text-[17px] leading-relaxed text-text-muted">{section.intro}</p>}
              <dl className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
                {section.items.map(([term, text, pro]) => (
                  <div key={term} className="grid gap-1.5 px-5 py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6 sm:px-6">
                    <dt className="flex items-center gap-2 text-[15px] font-medium text-text">
                      {term} {pro && <Badge tone="accent">Pro</Badge>}
                    </dt>
                    <dd className="text-[15px] leading-relaxed text-text-muted"><RichText text={text} /></dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section id="shortcuts" aria-labelledby="shortcuts-h" className="scroll-mt-24">
            <h2 id="shortcuts-h" className="text-2xl font-semibold tracking-[-0.02em]">Keyboard shortcuts</h2>
            <p className="mt-3 text-[17px] leading-relaxed text-text-muted">
              On a Mac keyboard, use ⌘ instead of Ctrl. You can see every shortcut in the app under Help → Keyboard shortcuts.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {SHORTCUTS.map((g) => (
                <div key={g.group} className="overflow-hidden rounded-xl border border-border bg-surface">
                  <h3 className="border-b border-border bg-bg-subtle px-5 py-3 text-[13px] font-semibold">{g.group}</h3>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      {g.items.map(([label, keys]) => (
                        <tr key={label}>
                          <th scope="row" className="px-5 py-2.5 text-left font-normal text-text-muted">{label}</th>
                          <td className="px-5 py-2.5 text-right"><KeyCombo combo={keys} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <h2 className="text-lg font-semibold">Still stuck?</h2>
              <p className="mt-1 text-[15px] text-text-muted">
                Check the <Link href="/faq" className="text-text underline-offset-4 hover:underline">FAQ</Link> or send us a message. We read every email.
              </p>
            </div>
            <ButtonLink href={`mailto:${SITE.contactEmail}`} variant="secondary" icon={Mail}>Email us</ButtonLink>
          </div>
        </div>
      </div>
    </Container>
  );
}
