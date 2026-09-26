import type { ReactNode } from 'react';
import { LogoMark } from '../ui/Logo';

/** Gecentreerde kaart voor inloggen en wachtwoord, zoals het inlogscherm van de app. */
export function AuthCard({ title, sub, children, footer }: { title: string; sub?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-72 left-1/2 h-[640px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_108_255/0.18),transparent)]" />
      <div className="relative flex min-h-[calc(100vh-4rem)] items-start justify-center px-5 py-16 sm:items-center">
        <div className="w-full max-w-[400px]">
          <div className="rounded-2xl bg-surface p-7 shadow-modal sm:p-8">
            <div className="flex justify-center"><LogoMark size={48} /></div>
            <h1 className="mt-5 text-center text-2xl font-semibold tracking-[-0.02em]">{title}</h1>
            {sub && <p className="mt-2 text-center text-sm leading-relaxed text-text-muted">{sub}</p>}
            <div className="mt-6">{children}</div>
          </div>
          {footer && <div className="mt-5 text-center text-sm text-text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

/** Google-logo als inline SVG (geen externe afbeelding). */
export function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.28V6.62H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.27 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77z" />
    </svg>
  );
}
