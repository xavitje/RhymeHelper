import { PricingView, pricingMetadata } from '../../views/PricingView';

export const revalidate = 3600; // prijs wisselt vanzelf na de launch-einddatum (zie PRO_PRICING in config.ts)
export const generateMetadata = () => pricingMetadata('en');

export default function Pricing() {
  return <PricingView lang="en" />;
}
