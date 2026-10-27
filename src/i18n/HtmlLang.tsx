"use client";
import { useEffect } from 'react';
import { useLang } from './useLang';
import { ui } from './ui';

/** Zet <html lang> op de taal van de pagina (de root layout rendert altijd "en"). */
export function HtmlLang() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

/** "Naar de inhoud"-link in de taal van de pagina. */
export function SkipLink() {
  const lang = useLang();
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-iris-deep focus:px-4 focus:py-2 focus:text-on-iris">
      {ui(lang).skip}
    </a>
  );
}
