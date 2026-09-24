import Link from 'next/link';
import { APP_CONFIG, SITE } from '../config';
import { Logo } from './ui/Logo';
import { RhymeStrip } from './ui/Rhyme';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/#features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: APP_CONFIG.WINDOWS_DOWNLOAD_URL, label: 'Download for Windows', plain: true },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/resources', label: 'Docs' },
      { href: '/faq', label: 'FAQ' },
      { href: `mailto:${SITE.contactEmail}`, label: 'Contact', plain: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bg-subtle">
      <RhymeStrip className="h-1 rounded-none" />
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Rhyme Helper, home" className="inline-block rounded-md">
            <Logo size={28} />
          </Link>
          <p className="mt-4 text-[15px] font-medium">{SITE.tagline}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
            The writing app for lyrics, with rhymes, syllables and your beat in one place.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-[13px] font-semibold text-text">{col.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  {'plain' in l && l.plain ? (
                    <a href={l.href} className="text-text-muted transition-colors hover:text-text">{l.label}</a>
                  ) : (
                    <Link href={l.href} className="text-text-muted transition-colors hover:text-text">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 border-t border-border px-5 py-6 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Rhyme Helper. Built for creatives by creatives.</p>
        <a href={`mailto:${SITE.contactEmail}`} className="transition-colors hover:text-text">{SITE.contactEmail}</a>
      </div>
    </footer>
  );
}
