import type { Metadata } from 'next';
import { CheckoutView } from '../../../views/CheckoutView';

export const metadata: Metadata = { title: 'Pro kopen', alternates: { canonical: '/nl/afrekenen' }, robots: { index: false, follow: true } };

export default function Page() {
  return <CheckoutView kind="buy" />;
}
