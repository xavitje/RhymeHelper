import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Analytics } from '../../components/Analytics';
import { HtmlLang, SkipLink } from '../../i18n/HtmlLang';
import { RefTracker } from '../../components/RefTracker';
import { ResumeCheckout } from '../../components/ResumeCheckout';
import { AffiliateTracking } from '../../components/AffiliateTracking';
import { SITE } from '../../config';

// Geist en Geist Mono, zelf gehost (dezelfde bestanden als de app; SIL Open Font License).
const geist = localFont({
  src: '../fonts/geist-latin-wght-normal.woff2',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
});
const geistMono = localFont({
  src: '../fonts/geist-mono-latin-wght-normal.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

/** Gedeelde metadata; per taal alleen de locale anders. */
export const rootMetadata = (lang: 'en' | 'nl'): Metadata => ({
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['lyrics', 'songwriting', 'rhyme dictionary', 'rap', 'syllable counter', 'songwriter app', 'rhymes'],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: '/',
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${SITE.name}: ${SITE.tagline}` }],
    locale: lang === 'nl' ? 'nl_NL' : 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
});

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
  colorScheme: 'dark',
};

/** De hele pagina; <html lang> komt al goed uit de server (Google leest dat), niet pas in de browser. */
export function RootShell({ lang, children }: { lang: 'en' | 'nl'; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans antialiased">
        <SkipLink />
        <HtmlLang />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <RefTracker />
        <ResumeCheckout />
        <AffiliateTracking />
      </body>
    </html>
  );
}
