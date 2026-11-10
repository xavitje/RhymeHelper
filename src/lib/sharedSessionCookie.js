// Eén login voor rhymehelper.store én app.rhymehelper.store.
// Elke site bewaart zijn login normaal apart (per domein). Deze opslag zet de Supabase-sessie in een cookie op
// .rhymehelper.store, zodat website en webapp dezelfde sessie delen: inloggen of uitloggen op de een geldt ook
// voor de ander. Eén sessie (niet twee kopieën), dus geen problemen met het vernieuwen van tokens.
// Alleen op het echte domein; in de desktop-app, op localhost en op previews blijft het localStorage.
// LET OP: dit bestand staat in beide repo's (website en app) en moet gelijk blijven.

const DOMAIN = '.rhymehelper.store';
const CHUNK = 3000; // tekens per cookie (een sessie is groter dan de 4 KB van één cookie)
const MAX_AGE = 400 * 24 * 3600;

export function sharedCookiesEnabled() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (window.electronAPI) return false;
  return /(^|\.)rhymehelper\.store$/.test(window.location.hostname);
}

function readAll() {
  const out = {};
  for (const part of document.cookie.split(';')) {
    const c = part.trim();
    if (!c) continue;
    const i = c.indexOf('=');
    out[i === -1 ? c : c.slice(0, i)] = i === -1 ? '' : c.slice(i + 1);
  }
  return out;
}

function write(name, value, maxAge) {
  document.cookie = `${name}=${value}; Domain=${DOMAIN}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`;
}

export function cookieGet(key) {
  const all = readAll();
  let out = '';
  let i = 0;
  while (all[`${key}.${i}`] !== undefined) { out += all[`${key}.${i}`]; i += 1; }
  if (!i) return null;
  try { return decodeURIComponent(out); } catch { return null; }
}

export function cookieSet(key, value) {
  const enc = encodeURIComponent(value);
  const all = readAll();
  const n = Math.max(1, Math.ceil(enc.length / CHUNK));
  for (let i = 0; i < n; i += 1) write(`${key}.${i}`, enc.slice(i * CHUNK, (i + 1) * CHUNK), MAX_AGE);
  for (let i = n; all[`${key}.${i}`] !== undefined; i += 1) write(`${key}.${i}`, '', 0); // oude, langere sessie
}

export function cookieRemove(key) {
  const all = readAll();
  for (let i = 0; all[`${key}.${i}`] !== undefined; i += 1) write(`${key}.${i}`, '', 0);
}

/**
 * Opslag voor createClient({ auth: { storage } }). Bestaande logins (localStorage) worden overgenomen,
 * zodat niemand na deze wijziging opnieuw hoeft in te loggen.
 */
export const sharedAuthStorage = {
  getItem(key) {
    const fromCookie = cookieGet(key);
    if (fromCookie !== null) return fromCookie;
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  setItem(key, value) {
    cookieSet(key, value);
    try { window.localStorage.removeItem(key); } catch { /* privémodus */ }
  },
  removeItem(key) {
    cookieRemove(key);
    try { window.localStorage.removeItem(key); } catch { /* */ }
  },
};
