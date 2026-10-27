import { HomeView, homeMetadata } from '../views/HomeView';

export const revalidate = 3600; // prijs volgt PRO_PRICING in config.ts
export const metadata = homeMetadata('en');

export default function Home() {
  return <HomeView lang="en" />;
}
