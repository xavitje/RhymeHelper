import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Inloggen', alternates: { canonical: '/nl/inloggen', languages: { en: '/login', nl: '/nl/inloggen' } }, robots: { index: false, follow: true } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
