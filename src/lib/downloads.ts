import { NextResponse, after, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const RELEASES_API = 'https://api.github.com/repos/xavitje/RhymeHelper/releases?per_page=5';
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

/** Telt de download, zonder cookies of IP-adres. Kanaal meegeven: ?ref=ig (of utm_source=ig). */
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

type Asset = { name: string; browser_download_url: string };
type Release = { draft: boolean; prerelease: boolean; assets?: Asset[] };

/**
 * Telt de download en stuurt door naar het nieuwste installatiebestand op GitHub dat bij `match` past.
 * Zoekt in de laatste paar gepubliceerde releases, zodat een release waar (nog) alleen de Windows-versie
 * in staat de Mac-download niet breekt.
 */
export async function redirectToAsset(req: NextRequest, match: (name: string) => boolean, label: string) {
  after(() => logDownload(req).catch((e) => console.error('download log failed:', e)));

  try {
    const res = await fetch(RELEASES_API, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error('Failed to fetch releases from GitHub', res.status);
      return new NextResponse('Failed to fetch the latest release', { status: 502 });
    }
    const releases: Release[] = await res.json();
    for (const release of releases) {
      if (release.draft || release.prerelease) continue;
      const asset = release.assets?.find((a) => match(a.name));
      if (asset) return NextResponse.redirect(asset.browser_download_url);
    }
    return new NextResponse(`No ${label} download found in the latest release`, { status: 404 });
  } catch (error) {
    console.error('Error in download redirect:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
