import type { Lang } from './routes';

/** Vaste teksten die op elke pagina staan (menu, footer, cookiemelding, kruimelpad). */
export const UI = {
  en: {
    skip: 'Skip to content',
    nav: { features: 'Features', pricing: 'Pricing', docs: 'Docs', faq: 'FAQ', login: 'Log in', dashboard: 'Dashboard', main: 'Main', mobile: 'Mobile', openMenu: 'Open menu', closeMenu: 'Close menu', home: 'Rhyme Helper, home' },
    priceLine: (price: string) => `Windows 10 and 11 · Free forever, Pro ${price} once`,
    langSwitch: { label: 'Language', toOther: 'Nederlands', short: 'NL' },
    footer: {
      tagline: 'The writing app for lyrics, with rhymes, syllables and your beat in one place.',
      product: 'Product', help: 'Help', legal: 'Legal',
      features: 'Features', pricing: 'Pricing', download: 'Download for Windows',
      docs: 'Docs', faq: 'FAQ', contact: 'Contact',
      privacy: 'Privacy policy', terms: 'Terms of service',
      rights: (y: number) => `© ${y} Rhyme Helper. Built for creatives by creatives.`,
      cookies: 'Cookie settings',
    },
    cookie: {
      title: 'Can we count your visit?',
      short: 'Analytics and referral tracking, only if you allow it.',
      long: 'We’d like to use Google Analytics to see how people find Rhyme Helper, and Lemon Squeezy’s referral tracking so creators who recommend us get credit. Both only run if you allow it.',
      details: 'Details', policy: 'Privacy policy', allow: 'Allow', deny: 'No thanks', aria: 'Cookie choice',
    },
    crumbsHome: 'Home',
  },
  nl: {
    skip: 'Naar de inhoud',
    nav: { features: 'Functies', pricing: 'Prijzen', docs: 'Handleiding', faq: 'FAQ', login: 'Inloggen', dashboard: 'Dashboard', main: 'Hoofdmenu', mobile: 'Mobiel menu', openMenu: 'Menu openen', closeMenu: 'Menu sluiten', home: 'Rhyme Helper, home' },
    priceLine: (price: string) => `Windows 10 en 11 · Altijd gratis, Pro ${price} eenmalig`,
    langSwitch: { label: 'Taal', toOther: 'English', short: 'EN' },
    footer: {
      tagline: 'De schrijfapp voor songteksten, met rijmen, lettergrepen en je beat op één plek.',
      product: 'Product', help: 'Hulp', legal: 'Juridisch',
      features: 'Functies', pricing: 'Prijzen', download: 'Download voor Windows',
      docs: 'Handleiding', faq: 'FAQ', contact: 'Contact',
      privacy: 'Privacyverklaring', terms: 'Voorwaarden',
      rights: (y: number) => `© ${y} Rhyme Helper. Gemaakt door makers, voor makers.`,
      cookies: 'Cookie-instellingen',
    },
    cookie: {
      title: 'Mogen we je bezoek tellen?',
      short: 'Statistieken en affiliate-tracking, alleen als je dat goedvindt.',
      long: 'We willen Google Analytics gebruiken om te zien hoe mensen Rhyme Helper vinden, en de affiliate-tracking van Lemon Squeezy, zodat makers die ons aanraden daarvoor worden beloond. Allebei draaien ze alleen als je dat toestaat.',
      details: 'Meer info', policy: 'Privacyverklaring', allow: 'Toestaan', deny: 'Nee, dank je', aria: 'Cookiekeuze',
    },
    crumbsHome: 'Home',
  },
} as const;

export const ui = (lang: Lang) => UI[lang];

/** Prijs in de notatie van de taal: €9.99 → €9,99 in het Nederlands. */
export const fmtPrice = (lang: Lang, p: string) => (lang === 'nl' ? p.replace('.', ',') : p);
