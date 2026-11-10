"use client";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { checkoutPath, readPendingCheckout } from '../lib/checkout';
import { langFromPath } from '../i18n/routes';

/**
 * Terug van de bevestigingsmail of Google terwijl je aan het afrekenen was? Dan direct door naar stap 2,
 * op welke pagina Supabase je ook neerzet (zonder toegestane redirect-URL is dat de homepage, met #access_token).
 */
export function ResumeCheckout() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (/^\/(nl\/)?(code|checkout|afrekenen)\/?$/.test(pathname || '')) return;
    const go = (signedIn: boolean) => {
      const p = signedIn ? readPendingCheckout() : null;
      if (p) router.replace(checkoutPath(p.lang || langFromPath(pathname), p.kind, p.code || undefined));
    };
    supabase.auth.getSession().then(({ data: { session } }) => go(!!session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') go(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, [pathname, router]);
  return null;
}
