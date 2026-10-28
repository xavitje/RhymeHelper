import type { NextRequest } from 'next/server';
import { redirectToAsset } from '../../../lib/downloads';

export const dynamic = 'force-dynamic';

/** Stuurt door naar de nieuwste Windows-installer (.exe) op GitHub. */
export function GET(req: NextRequest) {
  return redirectToAsset(req, (name) => name.endsWith('.exe'), 'Windows');
}
