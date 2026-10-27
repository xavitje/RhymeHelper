"use client";
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { href, langFromPath } from '../i18n/routes';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

/**
 * Ingelogde gebruiker voor beveiligde pagina's. Zonder sessie → /login.
 * Haalt daarna verse gegevens op (webhook-updates zoals license_key / cloud_sync_active).
 */
export function useSessionUser() {
  const router = useRouter();
  const loginPath = href(langFromPath(usePathname()), 'login');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace(loginPath);
        return;
      }
      if (alive) setUser(session.user);
      const { data } = await supabase.auth.getUser();
      if (alive) {
        if (data?.user) setUser(data.user);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [router, loginPath]);

  return { user, setUser, loading };
}
