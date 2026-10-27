import { ThankYouView, thankYouMetadata } from '../../../views/ThankYouView';

export const metadata = thankYouMetadata('nl');

export default function Bedankt() {
  return <ThankYouView lang="nl" />;
}
