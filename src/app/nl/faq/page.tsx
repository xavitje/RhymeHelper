import { FaqView, faqMetadata } from '../../../views/FaqView';

export const revalidate = 3600;
export const metadata = faqMetadata('nl');

export default function NlFaq() {
  return <FaqView lang="nl" />;
}
