import type { NextRequest } from 'next/server';
import { redirectToAsset } from '../../../lib/downloads';

export const dynamic = 'force-dynamic';

/**
 * Stuurt door naar de nieuwste Mac-installer (.dmg) op GitHub.
 * ?arch=x64 voor Intel-Macs; standaard Apple Silicon (arm64).
 */
export function GET(req: NextRequest) {
  const arch = req.nextUrl.searchParams.get('arch') === 'x64' ? 'x64' : 'arm64';
  return redirectToAsset(req, (name) => name.endsWith(`-mac-${arch}.dmg`), `Mac (${arch})`);
}
