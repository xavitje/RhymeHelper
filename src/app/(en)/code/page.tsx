import type { Metadata } from 'next';
import { CheckoutView } from '../../../views/CheckoutView';

export const metadata: Metadata = { title: 'Redeem your code', alternates: { canonical: '/code' }, robots: { index: false, follow: true } };

export default function Page() {
  return <CheckoutView kind="code" />;
}
