"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

import { useLang } from '../../i18n/useLang';
import { href } from '../../i18n/routes';

const T = {
  en: { overview: 'Overview', settings: 'Account settings', logout: 'Log out', loading: 'Loading your account…' },
  nl: { overview: 'Overzicht', settings: 'Accountinstellingen', logout: 'Uitloggen', loading: 'Je account wordt geladen…' },
} as const;

/** Kop van dashboard en account: titel, e-mail, tabs en uitloggen. */
export function AccountHeader({ title, email }: { title: string; email?: string | null }) {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const lang = useLang();
  const L = T[lang];
  const TABS = [
    { href: href(lang, 'dashboard'), label: L.overview },
    { href: href(lang, 'account'), label: L.settings },
  ];
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push(href(lang, 'home'));
  };
  return (
    <div className="border-b border-border">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h1>
          {email && <p className="mt-1.5 text-sm text-text-muted">{email}</p>}
        </div>
        <Button variant="ghost" size="sm" icon={LogOut} onClick={signOut}>{L.logout}</Button>
      </div>
      <nav aria-label="Account" className="mt-6 -mb-px flex gap-5">
        {TABS.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'border-b-2 pb-3 text-sm font-medium transition-colors',
                active ? 'border-iris text-text' : 'border-transparent text-text-muted hover:text-text',
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/** Rustige laadstaat met dezelfde opbouw als de pagina. */
export function AccountSkeleton() {
  const lang = useLang();
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8" aria-busy="true" aria-live="polite">
      <span className="sr-only">{T[lang].loading}</span>
      <div className="h-9 w-56 animate-pulse rounded-md bg-raised" />
      <div className="mt-3 h-4 w-40 animate-pulse rounded bg-raised" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="h-56 animate-pulse rounded-xl bg-surface" />
        <div className="h-56 animate-pulse rounded-xl bg-surface" />
      </div>
    </div>
  );
}
