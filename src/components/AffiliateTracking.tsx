"use client";
import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Lemon Squeezy-affiliates, alleen na toestemming (zelfde keuze als Google Analytics, 'rh-analytics-consent').
 * affiliate.js zet bij een affiliatelink (…?aff=CODE) een cookie `ls_aff_ref` en gebruikt een browser-
 * fingerprint; daarom pas laden na "Allow". Daarna vult het script checkoutlinks aan met `aff_ref`, ook dagen
 * later: de Pro-knop in de app opent /pricing, waar dit script de link aanvult.
 * Testen: zet debug op true en kijk in de browserconsole.
 */
const KEY = 'rh-analytics-consent';

function granted() {
  try { return localStorage.getItem(KEY) === 'granted'; } catch { return false; }
}

function clearAffiliateCookie() {
  const host = window.location.hostname;
  ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`].forEach((d) => {
    document.cookie = `ls_aff_ref=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
  });
}

export function AffiliateTracking() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(granted());
    const onConsent = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      setAllowed(value === 'granted');
      if (value === 'denied') clearAffiliateCookie();
    };
    window.addEventListener('rh:consent', onConsent);
    return () => window.removeEventListener('rh:consent', onConsent);
  }, []);

  if (!allowed) return null;
  return (
    <>
      <Script id="ls-affiliate-config" strategy="afterInteractive">
        {`window.lemonSqueezyAffiliateConfig = { store: "rhyme", domains: ["checkout.rhymehelper.store"], debug: false };`}
      </Script>
      <Script
        src="https://lmsqueezy.com/affiliate.js"
        strategy="afterInteractive"
        onLoad={() => {
          // affiliate.js start zelf pas bij window 'load'. Laadt het later (na "Allow"), dan zelf starten.
          const w = window as unknown as { createLemonSqueezyAffiliate?: () => void };
          if (document.readyState === 'complete') w.createLemonSqueezyAffiliate?.();
        }}
      />
    </>
  );
}
