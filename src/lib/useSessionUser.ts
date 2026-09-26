"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

/**
 * Ingelogde gebruiker voor beveiligde pagina's. Zonder sessie → /login.
 * Haalt daarna verse gegevens op (webhook-updates zoals license_key / cloud_sync_active).
 */
export function useSessionUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
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
  }, [router]);

  return { user, setUser, loading };
}
