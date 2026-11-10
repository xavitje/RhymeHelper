import type { Metadata } from 'next';
import { CheckoutView } from '../../../views/CheckoutView';

export const metadata: Metadata = { title: 'Get Pro', alternates: { canonical: '/checkout' }, robots: { index: false, follow: true } };

export default function Page() {
  return <CheckoutView kind="buy" />;
}
