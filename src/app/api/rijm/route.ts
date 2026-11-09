import { NextResponse, type NextRequest } from 'next/server';
import { nlRhymesFor } from '../../../lib/rhymes/server';

/** GET /api/rijm?w=cadeau → Nederlandse rijmwoorden (voor de rijmzoeker op de website). */
export async function GET(req: NextRequest) {
  const w = (req.nextUrl.searchParams.get('w') || '').trim();
  if (!w || w.length > 40 || !/^[\p{L}' -]+$/u.test(w)) {
    return NextResponse.json({ error: 'Geef één woord (alleen letters).' }, { status: 400 });
  }
  try {
    const answer = await nlRhymesFor(w);
    return NextResponse.json(answer, { headers: { 'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=86400' } });
  } catch (err) {
    console.error('rijm-api:', err);
    return NextResponse.json({ error: 'Rijmen laden lukt nu even niet.' }, { status: 503 });
  }
}
