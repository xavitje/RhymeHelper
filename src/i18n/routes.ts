/**
 * Talen en routes. Engels staat zonder voorvoegsel, Nederlands onder /nl met Nederlandse paden.
 * Nieuwe pagina in beide talen? Voeg hem hier toe; menu, footer, taalwissel en sitemap volgen.
 */
export type Lang = 'en' | 'nl';
export const LANGS: Lang[] = ['en', 'nl'];

export const ROUTES = {
  home: { en: '/', nl: '/nl' },
  features: { en: '/#features', nl: '/nl#features' },
  pricing: { en: '/pricing', nl: '/nl/prijzen' },
  faq: { en: '/faq', nl: '/nl/faq' },
  docs: { en: '/resources', nl: '/nl/handleiding' },
  privacy: { en: '/privacy', nl: '/nl/privacy' },
  terms: { en: '/terms', nl: '/nl/voorwaarden' },
  login: { en: '/login', nl: '/nl/inloggen' },
  dashboard: { en: '/dashboard', nl: '/nl/dashboard' },
  account: { en: '/account', nl: '/nl/account' },
  resetPassword: { en: '/reset-password', nl: '/nl/wachtwoord-herstellen' },
  thankYou: { en: '/thank-you', nl: '/nl/bedankt' },
} as const;

export type RouteKey = keyof typeof ROUTES;

export const href = (lang: Lang, key: RouteKey) => ROUTES[key][lang];

export const langFromPath = (pathname: string | null | undefined): Lang =>
  pathname === '/nl' || pathname?.startsWith('/nl/') ? 'nl' : 'en';

/** Zelfde pagina in de andere taal; pagina's zonder vertaling (bijv. Sinterklaas) gaan naar de homepage. */
export function switchPath(pathname: string, to: Lang): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  for (const r of Object.values(ROUTES)) {
    if (r.en === clean || r.nl === clean) return r[to];
  }
  return ROUTES.home[to];
}

/** `alternates` voor metadata: canonical + hreflang. */
export function alternates(key: RouteKey, lang: Lang) {
  return {
    canonical: ROUTES[key][lang],
    languages: { en: ROUTES[key].en, nl: ROUTES[key].nl, 'x-default': ROUTES[key].en },
  };
}
