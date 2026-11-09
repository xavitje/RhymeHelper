import { RootShell, rootMetadata } from '../_shell/root';

export { viewport } from '../_shell/root';
export const metadata = rootMetadata('en');

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
