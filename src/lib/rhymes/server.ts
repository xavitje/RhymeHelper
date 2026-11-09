import { gunzipSync } from 'node:zlib';
import { buildNlIndex, findNlRhymes, isCoarse, type NlIndex } from './nlRhymes';

/**
 * Nederlandse rijmen op de website, met dezelfde engine en woordenlijst als de app.
 * De lijst komt van de webapp (één bron); hij wordt één keer per server geladen en blijft in het geheugen.
 */
const DATA_URL = process.env.RHYME_DATA_URL || 'https://app.rhymehelper.store/data/nl-rijm.txt.gz';

let indexPromise: Promise<NlIndex> | null = null;

export function getNlIndex(): Promise<NlIndex> {
  if (!indexPromise) {
    indexPromise = (async () => {
      const res = await fetch(DATA_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`rijmlijst: HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const text = (buf[0] === 0x1f && buf[1] === 0x8b ? gunzipSync(buf) : buf).toString('utf-8');
      return buildNlIndex(text);
    })().catch((err) => { indexPromise = null; throw err; });
  }
  return indexPromise;
}

const SHORT_OK = new Set(['zo', 'nu', 'ja', 'na', 'al', 'nee', 'ik', 'jij', 'wij', 'zij', 'af', 'op', 'in', 'uit', 'om']);

export type RhymeWord = { word: string; syllables: number };
export type RhymeAnswer = { word: string; known: boolean; perfect: RhymeWord[]; near: RhymeWord[] };

/** Alleen Nederlandse, gangbare woorden; grove woorden niet (de website is voor iedereen). */
export async function nlRhymesFor(raw: string, { perfectMax = 60, nearMax = 20 } = {}): Promise<RhymeAnswer> {
  const word = raw.trim().toLowerCase().slice(0, 40);
  const index = await getNlIndex();
  const r = findNlRhymes(index, word);
  const seen = new Set<string>();
  // Sleutel van het gezochte woord (Nederlandse uitspraak): woorden die ook Engels zijn (lied, bed) mogen
  // blijven als ze óók in het Nederlands rijmen; alleen-Engels-rijm (show, war) niet.
  const qi = index.byWord.get(word);
  const qKey = qi === undefined ? null : index.words[qi].key;
  const keep = (list: { word: string; numSyllables: number; freq: number }[], max: number) => {
    const out: RhymeWord[] = [];
    for (const x of list) {
      const i = index.byWord.get(x.word);
      const e = i === undefined ? null : index.words[i];
      if (!e || e.lang !== 'nl' || (e.alt && (!qKey || e.key !== qKey)) || x.freq <= 0 || isCoarse(x.word) || x.word.includes(' ')) continue;
      if (x.word.length <= 2 && !SHORT_OK.has(x.word)) continue; // oh, ho, yo: geen rijmwoorden voor een gedicht
      const plain = x.word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (seen.has(plain)) continue; // zó naast zo
      seen.add(plain);
      out.push({ word: x.word, syllables: x.numSyllables });
      if (out.length >= max) break;
    }
    return out;
  };
  return { word, known: r.known, perfect: keep([...r.perfect, ...r.multi.filter((m) => !r.perfect.some((p) => p.word === m.word))], perfectMax), near: keep(r.near, nearMax) };
}
