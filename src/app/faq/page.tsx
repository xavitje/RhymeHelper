import { FaqView, faqMetadata } from '../../views/FaqView';

export const revalidate = 3600; // prijs volgt PRO_PRICING in config.ts
export const metadata = faqMetadata('en');

export default function Faq() {
  return <FaqView lang="en" />;
}
