import { HomeView, homeMetadata } from '../../views/HomeView';

export const revalidate = 3600; // prijs volgt PRO_PRICING in config.ts
export const metadata = homeMetadata('nl');

export default function NlHome() {
  return <HomeView lang="nl" />;
}
