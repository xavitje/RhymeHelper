"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { APP_CONFIG } from '../config';
import { ButtonLink } from './ui/Button';
import { Logo } from './ui/Logo';
import { cn } from '../lib/cn';

const LINKS = [
  { href: '/#features', label: 'Features', match: '/#features' },
  { href: '/pricing', label: 'Pricing', match: '/pricing' },
  { href: '/resources', label: 'Docs', match: '/resources' },
  { href: '/faq', label: 'FAQ', match: '/faq' },
];

export default function Navbar() {
  const pathname = usePathname() ?? '/';
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

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

  const hasLicense = !!user?.user_metadata?.license_key;
  const isActive = (match: string) => !match.startsWith('/#') && (pathname === match || pathname.startsWith(`${match}/`));

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-200',
        scrolled || open ? 'border-border bg-bg/85 backdrop-blur-md' : 'border-transparent bg-bg',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Rhyme Helper, home" className="rounded-md">
          <Logo size={28} />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
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
            href={user ? '/dashboard' : '/login'}
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text md:block"
          >
            {user ? 'Dashboard' : 'Log in'}
          </Link>
          <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} size="sm" icon={Download} className="hidden sm:inline-flex">
            {hasLicense ? 'Download' : 'Download free'}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
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
          className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border bg-bg px-5 pt-4 pb-10 md:hidden"
        >
          <nav aria-label="Mobile">
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
                <Link href={user ? '/dashboard' : '/login'} onClick={() => setOpen(false)} className="block py-4 text-2xl font-semibold tracking-[-0.02em] text-text">
                  {user ? 'Dashboard' : 'Log in'}
                </Link>
              </li>
            </ul>
          </nav>
          <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} size="lg" icon={Download} fullWidth className="mt-8">
            {hasLicense ? 'Download for Windows' : 'Download free for Windows'}
          </ButtonLink>
          <p className="mt-3 text-center text-sm text-text-muted">Windows 10 and 11 · Free forever, Pro {APP_CONFIG.SALE_PRICE} once</p>
        </div>
      )}
    </>
  );
}
