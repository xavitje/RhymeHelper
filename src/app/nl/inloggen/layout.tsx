import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Inloggen', alternates: { canonical: '/nl/inloggen', languages: { en: '/login', nl: '/nl/inloggen' } } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
