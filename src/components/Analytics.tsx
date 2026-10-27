"use client";
import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { href } from '../i18n/routes';
import { ui } from '../i18n/ui';
import { useLang } from '../i18n/useLang';

/**
 * Google Analytics 4, alleen na toestemming (AVG/ePrivacy).
 * - Meet-ID komt uit NEXT_PUBLIC_GA_MEASUREMENT_ID (Vercel → Environment Variables). Zonder ID: niets.
 * - Keuze in localStorage ('rh-analytics-consent' = 'granted' | 'denied').
 * - "Cookie settings" in de footer stuurt het event 'rh:cookie-settings' om de keuze te wijzigen.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const KEY = 'rh-analytics-consent';
type Consent = 'granted' | 'denied' | null;

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

function clearGaCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n.startsWith('_ga')).forEach((name) => {
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    });
  });
}

export function Analytics() {
  const lang = useLang();
  const t = ui(lang).cookie;
  const [consent, setConsent] = useState<Consent>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    const c = readConsent();
    setConsent(c);
    setOpen(c === null);
    const reopen = () => setOpen(true);
    window.addEventListener('rh:cookie-settings', reopen);
    return () => window.removeEventListener('rh:cookie-settings', reopen);
  }, []);

  if (!GA_ID) return null;

  const choose = (value: 'granted' | 'denied') => {
    try { localStorage.setItem(KEY, value); } catch { /* privémodus: keuze geldt alleen deze sessie */ }
    if (value === 'denied') {
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
      clearGaCookies();
    } else {
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
    }
    setConsent(value);
    setOpen(false);
    window.dispatchEvent(new CustomEvent('rh:consent', { detail: value }));
  };

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t.aria}
          className={
            // Mobiel: smalle balk onderaan, zodat het productbeeld zichtbaar blijft. Vanaf sm: kaart linksonder.
            'menu-sheet fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-surface px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] ' +
            'sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md sm:rounded-xl sm:border-t-0 sm:p-5 sm:shadow-modal'
          }
        >
          <p className="hidden text-[15px] font-semibold sm:block">{t.title}</p>
          <p className="text-[13px] leading-snug text-text-muted sm:mt-1.5 sm:text-sm sm:leading-relaxed">
            <span className="sm:hidden">{t.short}</span>
            <span className="hidden sm:inline">{t.long}</span>{' '}
            <Link href={`${href(lang, 'privacy')}#analytics`} className="text-text underline decoration-text-faint underline-offset-4 hover:decoration-text">
              <span className="sm:hidden">{t.details}</span><span className="hidden sm:inline">{t.policy}</span>
            </Link>
          </p>
          <div className="mt-2.5 flex gap-2 sm:mt-4">
            <Button size="sm" variant="secondary" onClick={() => choose('granted')}>{t.allow}</Button>
            <Button size="sm" variant="ghost" onClick={() => choose('denied')}>{t.deny}</Button>
          </div>
        </div>
      )}
    </>
  );
}

/** Knop in de footer om de keuze te wijzigen. Alleen zichtbaar als Analytics is ingesteld. */
export function CookieSettingsButton({ className, label = 'Cookie settings' }: { className?: string; label?: string }) {
  if (!GA_ID) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('rh:cookie-settings'))}>
      {label}
    </button>
  );
}
