"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { isPro } from '../lib/entitlements';
import { proPrice } from '../config';
import { href, switchPath } from '../i18n/routes';
import { fmtPrice, ui } from '../i18n/ui';
import { useLang } from '../i18n/useLang';
import { GetAppButton } from './GetAppButton';
import { Logo } from './ui/Logo';
import { cn } from '../lib/cn';


export default function Navbar() {
  const pathname = usePathname() ?? '/';
  const lang = useLang();
  const t = ui(lang);
  const other = lang === 'en' ? 'nl' : 'en';
  const LINKS = [
    { href: href(lang, 'features'), label: t.nav.features, match: href(lang, 'features') },
    { href: href(lang, 'pricing'), label: t.nav.pricing, match: href(lang, 'pricing') },
    { href: href(lang, 'docs'), label: t.nav.docs, match: href(lang, 'docs') },
    { href: href(lang, 'faq'), label: t.nav.faq, match: href(lang, 'faq') },
  ];
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const accountHref = user ? href(lang, 'dashboard') : href(lang, 'login');
  const accountLabel = user ? t.nav.dashboard : t.nav.login;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  // Haarlijn en vlak pas tonen als er gescrold is.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu sluiten bij navigatie.
  useEffect(() => setOpen(false), [pathname]);

  // Mobiel menu: Esc sluit, focus blijft in het menu, pagina scrollt niet mee.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const focusables = () => Array.from(sheet?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      } else if (e.key === 'Tab') {
        const items = [toggleRef.current!, ...focusables()];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const hasLicense = isPro(user);
  const isActive = (match: string) => !match.includes('#') && (pathname === match || pathname.startsWith(`${match}/`));

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-200',
        // Zachte overgang naar de inhoud i.p.v. een harde lijn; alleen zichtbaar na scrollen.
        "after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-gradient-to-b after:from-bg/70 after:to-transparent after:opacity-0 after:transition-opacity after:duration-200 after:content-['']",
        scrolled || open ? 'bg-bg/80 backdrop-blur-md backdrop-saturate-150 after:opacity-100' : 'bg-bg',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href={href(lang, 'home')} aria-label={t.nav.home} className="rounded-md">
          <Logo size={28} />
        </Link>

        <nav aria-label={t.nav.main} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.match) ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive(l.match) ? 'text-text' : 'text-text-muted hover:text-text',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchPath(pathname, other)}
            hrefLang={other}
            lang={other}
            aria-label={t.langSwitch.toOther}
            title={t.langSwitch.toOther}
            className="hidden rounded-md px-2 py-2 text-[13px] font-semibold tracking-wide text-text-muted transition-colors hover:text-text md:block"
          >
            {t.langSwitch.short}
          </Link>
          <Link
            href={accountHref}
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text md:block"
          >
            {accountLabel}
          </Link>
          <GetAppButton size="sm" short label={hasLicense ? 'Download' : undefined} />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-raised hover:text-text md:hidden"
          >
            {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          className="menu-sheet fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border bg-bg px-5 pt-4 pb-10 md:hidden"
        >
          <nav aria-label={t.nav.mobile}>
            <ul className="divide-y divide-border">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.match) ? 'page' : undefined}
                    className={cn('block py-4 text-2xl font-semibold tracking-[-0.02em]', isActive(l.match) ? 'text-iris-text' : 'text-text')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={accountHref} onClick={() => setOpen(false)} className="block py-4 text-2xl font-semibold tracking-[-0.02em] text-text">
                  {accountLabel}
                </Link>
              </li>
            </ul>
          </nav>
          <GetAppButton size="lg" fullWidth className="mt-8" paid={hasLicense} />
          <p className="mt-3 text-center text-sm text-text-muted">{t.priceLine(fmtPrice(lang, proPrice().price))}</p>
          <Link
            href={switchPath(pathname, other)}
            hrefLang={other}
            lang={other}
            className="mt-8 block text-center text-sm font-medium text-text-muted underline decoration-text-faint underline-offset-4 hover:text-text"
          >
            {t.langSwitch.toOther}
          </Link>
        </div>
      )}
    </>
  );
}
