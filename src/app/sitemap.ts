import type { MetadataRoute } from 'next';
import { SITE } from '../config';
import { ROUTES } from '../i18n/routes';

type Freq = 'weekly' | 'monthly' | 'yearly';
const PAGES: { key: keyof typeof ROUTES; priority: number; changeFrequency: Freq }[] = [
  { key: 'home', priority: 1, changeFrequency: 'weekly' },
  { key: 'pricing', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'docs', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'faq', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'login', priority: 0.4, changeFrequency: 'yearly' },
  { key: 'privacy', priority: 0.3, changeFrequency: 'yearly' },
  { key: 'terms', priority: 0.3, changeFrequency: 'yearly' },
];

/** Elke pagina in beide talen, met hreflang-verwijzingen naar elkaar. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = PAGES.flatMap((p) => {
    const en = ROUTES[p.key].en;
    const nl = ROUTES[p.key].nl;
    const languages = { en: `${SITE.url}${en === '/' ? '' : en}`, nl: `${SITE.url}${nl}` };
    return [
      { url: languages.en, lastModified: now, changeFrequency: p.changeFrequency, priority: p.priority, alternates: { languages } },
      { url: languages.nl, lastModified: now, changeFrequency: p.changeFrequency, priority: Math.max(0.3, p.priority - 0.1), alternates: { languages } },
    ];
  });
  return [...pages, { url: `${SITE.url}/nl/sinterklaasgedicht`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 }];
}
