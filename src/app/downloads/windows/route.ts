import { NextResponse, after, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const RELEASE_API = 'https://api.github.com/repos/xavitje/RhymeHelper/releases/latest';
// Link-previews en crawlers tellen we niet als download.
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|slack|twitter|linkedin|embedly|headless|lighthouse/i;

/** Alleen letters, cijfers, '-' en '_' (max 40): voorkomt rommel in de tabel. */
function clean(value: string | null, max = 40) {
  if (!value) return null;
  const v = value.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, max);
  return v || null;
}

function referrerHost(req: NextRequest) {
  try {
    const host = new URL(req.headers.get('referer') || '').hostname.replace(/^www\./, '');
    return host ? host.slice(0, 100) : null;
  } catch {
    return null;
  }
}

/**
 * Telt de download (zonder cookies of IP-adres) en stuurt door naar de nieuwste .exe op GitHub.
 * Kanaal meegeven: /downloads/windows?ref=ig (of utm_source=ig).
 */
async function logDownload(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || BOT.test(req.headers.get('user-agent') || '')) return;
  const params = req.nextUrl.searchParams;
  const row = {
    ref: clean(params.get('ref') || params.get('utm_source')),
    referrer_host: referrerHost(req),
    country: clean(req.headers.get('x-vercel-ip-country'), 2)?.toUpperCase() ?? null,
  };
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from('download_events').insert(row);
  if (error) console.error('download log failed:', error.message);
}

export async function GET(req: NextRequest) {
  after(() => logDownload(req).catch((e) => console.error('download log failed:', e)));

  try {
    const res = await fetch(RELEASE_API, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error('Failed to fetch latest release from GitHub');
      return new NextResponse('Failed to fetch latest release', { status: 500 });
    }
    const release = await res.json();
    const exeAsset = release.assets?.find((asset: { name: string }) => asset.name.endsWith('.exe'));
    if (!exeAsset) {
      return new NextResponse('No Windows installer found in the latest release', { status: 404 });
    }
    return NextResponse.redirect(exeAsset.browser_download_url);
  } catch (error) {
    console.error('Error in download redirect:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
