import { DocsView, docsMetadata } from '../../views/DocsView';

export const metadata = docsMetadata('en');

export default function Docs() {
  return <DocsView lang="en" />;
}
