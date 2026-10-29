"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BUSINESS, APP_CONFIG, SITE } from '../config';
import { href, switchPath } from '../i18n/routes';
import { ui } from '../i18n/ui';
import { useLang } from '../i18n/useLang';
import { Logo } from './ui/Logo';
import { RhymeStrip } from './ui/Rhyme';
import { CookieSettingsButton } from './Analytics';

export default function Footer() {
  const pathname = usePathname() ?? '/';
  const lang = useLang();
  const t = ui(lang).footer;
  const other = lang === 'en' ? 'nl' : 'en';
  const columns = [
    {
      title: t.product,
      links: [
        { href: href(lang, 'features'), label: t.features },
        { href: href(lang, 'pricing'), label: t.pricing },
        { href: APP_CONFIG.WINDOWS_DOWNLOAD_URL, label: t.download, plain: true },
        { href: APP_CONFIG.MAC_DOWNLOAD_URL, label: t.downloadMac, plain: true },
      ],
    },
    {
      title: t.help,
      links: [
        { href: href(lang, 'docs'), label: t.docs },
        { href: href(lang, 'faq'), label: t.faq },
        { href: `mailto:${SITE.contactEmail}`, label: t.contact, plain: true },
      ],
    },
    {
      title: t.legal,
      links: [
        { href: href(lang, 'privacy'), label: t.privacy },
        { href: href(lang, 'terms'), label: t.terms },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-bg-subtle">
      <RhymeStrip className="h-1 rounded-none" />
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href={href(lang, 'home')} aria-label={ui(lang).nav.home} className="inline-block rounded-md">
            <Logo size={28} />
          </Link>
          <p className="mt-4 text-[15px] font-medium">{lang === 'nl' ? 'Vind het rijm. Houd de flow.' : SITE.tagline}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">{t.tagline}</p>
        </div>
        {columns.map((col) => (
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
        <div>
          <p>{t.rights(new Date().getFullYear())}</p>
          {BUSINESS.kvk && (
            <p className="mt-1">
              {[BUSINESS.tradeName + ' · ' + BUSINESS.legalName, BUSINESS.address, `KvK ${BUSINESS.kvk}`, BUSINESS.vat && `${lang === 'nl' ? 'btw' : 'VAT'} ${BUSINESS.vat}`].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href={switchPath(pathname, other)} hrefLang={other} lang={other} className="font-medium transition-colors hover:text-text">
            {ui(lang).langSwitch.toOther}
          </Link>
          <CookieSettingsButton className="rounded-sm transition-colors hover:text-text" label={t.cookies} />
          <a href={`mailto:${SITE.contactEmail}`} className="transition-colors hover:text-text">{SITE.contactEmail}</a>
        </div>
      </div>
    </footer>
  );
}
