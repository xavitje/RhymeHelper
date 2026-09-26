import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Analytics } from '../components/Analytics';
import { SITE } from '../config';

// Geist en Geist Mono, zelf gehost (dezelfde bestanden als de app; SIL Open Font License).
const geist = localFont({
  src: './fonts/geist-latin-wght-normal.woff2',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
});
const geistMono = localFont({
  src: './fonts/geist-mono-latin-wght-normal.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
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
    locale: 'en_US',
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
};

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-iris-deep focus:px-4 focus:py-2 focus:text-on-iris">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
