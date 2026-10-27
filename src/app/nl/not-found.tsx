import { NotFoundView, notFoundMetadata } from '../../views/NotFoundView';

export const metadata = notFoundMetadata('nl');

export default function NlNotFound() {
  return <NotFoundView lang="nl" />;
}
