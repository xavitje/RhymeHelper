import { RootShell, rootMetadata } from '../_shell/root';

export { viewport } from '../_shell/root';
export const metadata = rootMetadata('nl');

/** Root layout voor alle Nederlandse pagina's: <html lang="nl">. */
export default function NlLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="nl">{children}</RootShell>;
}
