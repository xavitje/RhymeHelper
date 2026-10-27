"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useLang } from '../../i18n/useLang';
import type { Lang } from '../../i18n/routes';

type Row = { id: string; size: number | null; modified_at: string; deleted_at: string | null; device_name: string | null };
type Stats = { songs: number; bytes: number; trashed: number; last: Row | null };

const fmtSize = (b: number) =>
  b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(b < 10 * 1024 ? 1 : 0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

function ago(iso: string, lang: Lang) {
  const nl = lang === 'nl';
  const min = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (min < 1) return nl ? 'zojuist' : 'just now';
  if (min < 60) return nl ? `${min} min geleden` : `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return nl ? `${h} uur geleden` : `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 31) return d === 1 ? (nl ? 'gisteren' : 'yesterday') : nl ? `${d} dagen geleden` : `${d} days ago`;
  return (nl ? 'op ' : 'on ') + new Date(iso).toLocaleDateString(nl ? 'nl-NL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const T = {
  en: {
    empty: 'Your cloud library is empty. New songs you write in the app are added automatically.',
    lib: (n: number, size: string) => `Your cloud library: ${n} ${n === 1 ? 'song' : 'songs'} · ${size}`,
    last: (when: string, dev: string | null) => `Last change ${when}${dev ? ` on ${dev}` : ''}.`,
    off: 'Cloud Sync is off. Your songs stay here and in the app; new changes are not uploaded.',
    trash: (n: number) => `${n} in Recently deleted. Restore them in the app from the Cloud menu within 30 days.`,
  },
  nl: {
    empty: 'Je cloudbibliotheek is leeg. Nieuwe liedjes die je in de app schrijft, komen er vanzelf in.',
    lib: (n: number, size: string) => `Je cloudbibliotheek: ${n} ${n === 1 ? 'lied' : 'liedjes'} · ${size}`,
    last: (when: string, dev: string | null) => `Laatste wijziging ${when}${dev ? ` op ${dev}` : ''}.`,
    off: 'Cloud Sync staat uit. Je liedjes blijven hier en in de app; nieuwe wijzigingen worden niet geüpload.',
    trash: (n: number) => `${n} in Onlangs verwijderd. Zet ze binnen 30 dagen terug in de app via het Cloud-menu.`,
  },
} as const;

/** "Your cloud library: 23 songs · 1.2 MB · last change 2 min ago on Studio-PC". */
export function CloudLibraryStats({ active }: { active: boolean }) {
  const lang = useLang();
  const t = T[lang];
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase.rpc('cloud_library').then(({ data, error }) => {
      if (!alive) return;
      if (error) { setFailed(true); return; }
      const rows = (data || []) as Row[];
      const live = rows.filter((r) => !r.deleted_at);
      setStats({
        songs: live.length,
        bytes: live.reduce((n, r) => n + (r.size || 0), 0),
        trashed: rows.length - live.length,
        last: live[0] ?? null, // cloud_library() is gesorteerd op laatste wijziging
      });
    });
    return () => { alive = false; };
  }, []);

  if (failed) return null;
  if (!stats) return active ? <p className="mt-3 h-5 w-48 animate-pulse rounded bg-raised" aria-hidden /> : null;
  if (stats.songs === 0 && stats.trashed === 0) {
    if (!active) return null;
    return <p className="mt-3 text-sm text-text-muted">{t.empty}</p>;
  }
  return (
    <div className="mt-3 rounded-lg border border-border bg-bg-subtle px-4 py-3 text-sm" data-testid="cloud-library-stats">
      <p className="font-medium text-text">
        {t.lib(stats.songs, fmtSize(stats.bytes))}
      </p>
      {stats.last && (
        <p className="mt-1 text-text-muted">
          {t.last(ago(stats.last.modified_at, lang), stats.last.device_name)}
        </p>
      )}
      {!active && (
        <p className="mt-1 text-text-muted">{t.off}</p>
      )}
      {stats.trashed > 0 && (
        <p className="mt-1 text-text-muted">
          {t.trash(stats.trashed)}
        </p>
      )}
    </div>
  );
}
