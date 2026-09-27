"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type Row = { id: string; size: number | null; modified_at: string; deleted_at: string | null; device_name: string | null };
type Stats = { songs: number; bytes: number; trashed: number; last: Row | null };

const fmtSize = (b: number) =>
  b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(b < 10 * 1024 ? 1 : 0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

function ago(iso: string) {
  const min = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 31) return d === 1 ? 'yesterday' : `${d} days ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** "Your cloud library: 23 songs · 1.2 MB · last change 2 min ago on Studio-PC". */
export function CloudLibraryStats({ active }: { active: boolean }) {
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
    return <p className="mt-3 text-sm text-text-muted">Your cloud library is empty. New songs you write in the app are added automatically.</p>;
  }
  return (
    <div className="mt-3 rounded-lg border border-border bg-bg-subtle px-4 py-3 text-sm" data-testid="cloud-library-stats">
      <p className="font-medium text-text">
        Your cloud library: {stats.songs} {stats.songs === 1 ? 'song' : 'songs'} · {fmtSize(stats.bytes)}
      </p>
      {stats.last && (
        <p className="mt-1 text-text-muted">
          Last change {ago(stats.last.modified_at)}{stats.last.device_name ? ` on ${stats.last.device_name}` : ''}.
        </p>
      )}
      {!active && (
        <p className="mt-1 text-text-muted">Cloud Sync is off. Your songs stay here and in the app; new changes are not uploaded.</p>
      )}
      {stats.trashed > 0 && (
        <p className="mt-1 text-text-muted">
          {stats.trashed} in Recently deleted. Restore them in the app from the Cloud menu within 30 days.
        </p>
      )}
    </div>
  );
}
