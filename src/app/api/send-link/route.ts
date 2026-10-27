import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { mailConfigured, sendDownloadLinkMail } from '../../../lib/downloadLinkMail';

export const dynamic = 'force-dynamic';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, max) || null : null;

/**
 * "Stuur me de downloadlink": registreert de aanvraag (met limieten in Supabase) en mailt de link.
 * Body: { email, lang: 'en'|'nl', platform, ref, wantsMac, website (honeypot, moet leeg zijn) }
 * Antwoorden: 200 { ok: true } · 400 invalid_email · 429 limit · 503 not_configured · 500 failed
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  // Honeypot: bots vullen dit verborgen veld in. Doe alsof het gelukt is.
  if (typeof body.website === 'string' && body.website.trim() !== '') return NextResponse.json({ ok: true });

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (email.length > 254 || !EMAIL.test(email)) return NextResponse.json({ error: 'invalid_email' }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !mailConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const lang = body.lang === 'nl' ? 'nl' : 'en';
  const wantsMac = body.wantsMac === true;
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data: id, error } = await supabase.rpc('request_download_link', {
    p_email: email,
    p_platform: clean(body.platform, 20),
    p_language: lang,
    p_ref: clean(body.ref, 40),
    p_wants_mac: wantsMac,
  });
  if (error) {
    if (error.code === '22023') return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    console.error('send-link: request failed:', error.message);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
  if (id === null) return NextResponse.json({ error: 'limit' }, { status: 429 });

  try {
    await sendDownloadLinkMail(email, lang, wantsMac);
  } catch (e) {
    console.error('send-link: mail failed:', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
