"use client";
import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/Button';

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
          aria-label="Cookie choice"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md rounded-xl bg-surface p-5 shadow-modal sm:inset-x-auto sm:left-5 sm:bottom-5 sm:mx-0"
        >
          <p className="text-[15px] font-semibold">Can we count your visit?</p>
          <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
            We’d like to use Google Analytics to see how people find Rhyme Helper. It only runs if you allow it.{' '}
            <Link href="/privacy#analytics" className="text-text underline-offset-4 hover:underline">Privacy policy</Link>
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => choose('granted')}>Allow</Button>
            <Button size="sm" variant="ghost" onClick={() => choose('denied')}>No thanks</Button>
          </div>
        </div>
      )}
    </>
  );
}

/** Knop in de footer om de keuze te wijzigen. Alleen zichtbaar als Analytics is ingesteld. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('rh:cookie-settings'))}>
      Cookie settings
    </button>
  );
}
