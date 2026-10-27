import { ThankYouView, thankYouMetadata } from '../../views/ThankYouView';

export const metadata = thankYouMetadata('en');

export default function ThankYou() {
  return <ThankYouView lang="en" />;
}
