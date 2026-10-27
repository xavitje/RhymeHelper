import { NotFoundView, notFoundMetadata } from '../views/NotFoundView';

export const metadata = notFoundMetadata('en');

export default function NotFound() {
  return <NotFoundView lang="en" />;
}
