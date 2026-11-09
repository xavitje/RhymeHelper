// 404 voor adressen die nergens bij horen (de site heeft twee root layouts: Engels en /nl).
import { RootShell, rootMetadata } from './_shell/root';
import { NotFoundView } from '../views/NotFoundView';

export const metadata = { ...rootMetadata('en'), title: 'Page not found · Rhyme Helper', robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundView lang="en" />
    </RootShell>
  );
}
