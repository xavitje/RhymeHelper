import { PricingView, pricingMetadata } from '../../../views/PricingView';

export const revalidate = 3600;
export const generateMetadata = () => pricingMetadata('nl');

export default function Prijzen() {
  return <PricingView lang="nl" />;
}
