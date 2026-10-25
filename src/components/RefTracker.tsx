"use client";
import { useEffect } from 'react';

/**
 * Onthoudt het kanaal uit ?ref=… (of utm_source) voor 30 dagen en hangt het aan elke
 * downloadlink, zodat /downloads/windows ziet waar een download vandaan komt.
 * Bijv. rhymehelper.store/?ref=ig in je Instagram-bio of DM.
 * Stuurt ook een GA-event 'download_click' (alleen als GA na toestemming geladen is).
 */
const KEY = 'rh-ref';
const CHECKOUT_HOST = 'checkout.rhymehelper.store';
const DAYS = 30;

function clean(v: string | null) {
  const c = (v || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  return c || null;
}

function readRef(): string | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { ref, until } = JSON.parse(raw);
    return typeof ref === 'string' && Date.now() < until ? ref : null;
  } catch {
    return null;
  }
}

export function RefTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fresh = clean(params.get('ref') || params.get('utm_source'));
    if (fresh) {
      try { localStorage.setItem(KEY, JSON.stringify({ ref: fresh, until: Date.now() + DAYS * 864e5 })); } catch { /* privémodus */ }
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a) return;
      const url = new URL(a.href, window.location.href);

      // Checkout: affiliate-ID van Lemon Squeezy meegeven (vangnet naast affiliate.js zelf).
      if (url.hostname === CHECKOUT_HOST && !url.searchParams.has('aff_ref')) {
        // affiliate.js bewaart de klik als cookie ls_aff_ref (alleen na toestemming).
        const id = document.cookie.split(';').map((c) => c.trim()).find((c) => c.startsWith('ls_aff_ref='))?.slice('ls_aff_ref='.length);
        if (id) { url.searchParams.set('aff_ref', decodeURIComponent(id)); a.href = url.toString(); }
        return;
      }

      if (url.origin !== window.location.origin || !url.pathname.startsWith('/downloads/')) return;
      const ref = fresh || readRef();
      if (ref && !url.searchParams.has('ref')) {
        url.searchParams.set('ref', ref);
        a.href = url.toString();
      }
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.('event', 'download_click', { ref: ref || '(none)', page: window.location.pathname });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
