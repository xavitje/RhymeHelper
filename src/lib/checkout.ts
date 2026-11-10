import { href } from '../i18n/routes';

/** Pro kopen (buy) of een code van een kaartje verzilveren (code). Zie views/CheckoutView. */
export type Kind = 'buy' | 'code';

const PENDING_KEY = 'rh-pending-checkout';

/** Opgeslagen "ik was aan het afrekenen" (overleeft de bevestigingsmail en het inloggen met Google). */
export function readPendingCheckout(): { kind: Kind; code: string; lang?: 'en' | 'nl' } | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return Date.now() < p.until ? { kind: p.kind, code: p.code || '', lang: p.lang === 'nl' ? 'nl' : p.lang === 'en' ? 'en' : undefined } : null;
  } catch { return null; }
}
export const savePending = (kind: Kind, code: string, lang?: 'en' | 'nl') => {
  try { localStorage.setItem(PENDING_KEY, JSON.stringify({ kind, code, lang, until: Date.now() + 864e5 })); } catch { /* privémodus */ }
};
export const clearPending = () => { try { localStorage.removeItem(PENDING_KEY); } catch { /* */ } };

export function checkoutPath(lang: 'en' | 'nl', kind: Kind, code?: string) {
  const base = href(lang, kind === 'code' ? 'code' : 'checkout');
  return code ? `${base}?code=${encodeURIComponent(code)}` : base;
}

