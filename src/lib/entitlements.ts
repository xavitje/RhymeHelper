import type { User } from '@supabase/supabase-js';

// Rechten komen uit app_metadata: alleen de server (webhook, Edge Function activate-license) kan dat schrijven.
// Zelfde logica als de app (src/lib/entitlements.js in RymeHelper).

export function isPro(user: User | null | undefined) {
  const app = (user?.app_metadata ?? {}) as Record<string, unknown>;
  return app.pro === true || (typeof app.license_key === 'string' && app.license_key.length > 0);
}

export function hasCloudSync(user: User | null | undefined, now = Date.now()) {
  const app = (user?.app_metadata ?? {}) as Record<string, unknown>;
  if (app.cloud_sync_active !== true) return false;
  if (!app.cloud_sync_until) return true;
  const until = Date.parse(String(app.cloud_sync_until));
  return Number.isNaN(until) ? true : until > now;
}

export function cloudSyncEndsAt(user: User | null | undefined) {
  const v = (user?.app_metadata as Record<string, unknown> | undefined)?.cloud_sync_until;
  const t = v ? Date.parse(String(v)) : NaN;
  return Number.isNaN(t) ? null : new Date(t);
}

export function licenseKey(user: User | null | undefined): string | undefined {
  const k = (user?.app_metadata as Record<string, unknown> | undefined)?.license_key;
  return typeof k === 'string' && k ? k : undefined;
}

export function customerPortalUrl(user: User | null | undefined): string | undefined {
  const u = (user?.app_metadata as Record<string, unknown> | undefined)?.customer_portal_url;
  return typeof u === 'string' && u ? u : undefined;
}
