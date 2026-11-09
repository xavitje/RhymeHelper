// KOPIE van RymeHelper (app) src/lib/nlRhymes.js — dezelfde rijm-engine als de app. Pas wijzigingen in de app aan en kopieer ze hierheen.
// Nederlandse rijmen op klank (uitspraak), niet op spelling.
// Puur JavaScript zonder fs of DOM: de Web Worker (web) en electron/main.js (desktop) laden de woordenlijst
// (public/data/nl-rijm.txt.gz) en roepen deze functies aan. De uitspraak is vooraf berekend met espeak-ng
// (scripts/build-nl-rhymes.py) als IPA met klemtoontekens, bijvoorbeeld "liefde" → "lˈivdə".
//
//  - perfect:   zelfde klank vanaf de beklemtoonde klinker tot het eind (tijd ↔ meid, hand ↔ kant)
//  - bijna:     zelfde klinkers, medeklinkers die op elkaar lijken (liefde ↔ lieve, liefje)
//  - lang:      meerlettergrepig: ook de klinker(s) vóór de klemtoon klinken hetzelfde (verliefde ↔ verdiepte)
//  - combinaties: voor een zinsdeel: twee woorden die samen rijmen ("laat los" ↔ "kaal bos")

// ---- Klanken ----
const VOWEL_RE = /(ɛɪ|ʌʊ|œy|ɑu|ɔu|ɑi|ɔi|ui|aːi|oːi|eːu|iu|yu|[aeiouyɑɛɪɔʏəøœʌɵɐ]ː?)/y;
const STRESS = new Set(['ˈ', 'ˌ']);

/** IPA-string → klanken: [{ p: 'oː', v: true, s: 1|2|0 }, ...] (s = klemtoon op deze klinker) */
export function tokenize(ipa) {
  const s = String(ipa).replace(/‍/g, '').replace(/[ʲ̃.]/g, '');
  const out = [];
  let stress = 0;
  for (let i = 0; i < s.length;) {
    const ch = s[i];
    if (STRESS.has(ch)) { stress = ch === 'ˈ' ? 1 : 2; i++; continue; }
    VOWEL_RE.lastIndex = i;
    const m = VOWEL_RE.exec(s);
    if (m) {
      out.push({ p: m[1], v: true, s: stress });
      stress = 0;
      i += m[1].length;
    } else {
      let p = ch;
      if (s[i + 1] === 'ː') { p += 'ː'; i++; }
      out.push({ p, v: false, s: 0 });
      i++;
    }
  }
  return out;
}

const isWeak = (t) => t.p === 'ə';

/**
 * Index van de klinker waar het rijm begint: de laatste beklemtoonde klinker (hoofd- of bijklemtoon).
 * Bij samenstellingen ligt de hoofdklemtoon vooraan (mˈɪdərnˌɑxt), maar in een songtekst rijmt het laatste deel:
 * daarom telt de laatste klemtoon, ook als dat een bijklemtoon is (middernacht → "ɑ x t").
 */
export function stressIndex(tokens) {
  let idx = -1;
  for (let i = tokens.length - 1; i >= 0; i--) if (tokens[i].v && tokens[i].s > 0) { idx = i; break; }
  if (idx < 0) for (let i = tokens.length - 1; i >= 0; i--) if (tokens[i].v && !isWeak(tokens[i])) { idx = i; break; }
  if (idx < 0) for (let i = tokens.length - 1; i >= 0; i--) if (tokens[i].v) { idx = i; break; }
  return idx;
}

/** Perfect-rijmsleutel: klanken vanaf de beklemtoonde klinker ("tijd" → "ɛɪ t"). */
export function rhymeKey(tokens) {
  const i = stressIndex(tokens);
  return i < 0 ? '' : tokens.slice(i).map((t) => t.p).join(' ');
}

/** Klinkers vanaf de klemtoon ("liefde" → "i ə"): basis voor bijna-rijmen (assonantie). */
export function vowelKey(tokens) {
  const i = stressIndex(tokens);
  return i < 0 ? '' : tokens.slice(i).filter((t) => t.v).map((t) => t.p).join(' ');
}

/** Lang rijm: de volle klinker vóór de klemtoon + de klinkers erna ("verliefde" → null, "geloven" → null, "paradijs" → "aː ɛɪ"). */
export function multiKey(tokens) {
  const i = stressIndex(tokens);
  if (i < 0) return null;
  let j = i - 1;
  while (j >= 0 && !tokens[j].v) j--;
  if (j < 0 || isWeak(tokens[j])) return null;
  return [tokens[j].p, ...tokens.slice(i).filter((t) => t.v).map((t) => t.p)].join(' ');
}

// Snelle weg voor het inlezen van 350.000 woorden: alleen het stuk vanaf de laatste klemtoon wordt opgeknipt.
// Geeft dezelfde sleutels als rhymeKey/vowelKey/multiKey op de volledige klanken.
const VOWELS_G = /(ɛɪ|ʌʊ|œy|ɑu|ɔu|ɑi|ɔi|ui|aːi|oːi|eːu|iu|yu|[aeiouyɑɛɪɔʏəøœʌɵɐ]ː?)/g;
function fastKeys(ipa) {
  const s = ipa.indexOf('\u200d') >= 0 ? ipa.replace(/\u200d/g, '') : ipa;
  const cut = Math.max(s.lastIndexOf('ˈ'), s.lastIndexOf('ˌ'));
  if (cut < 0) {
    const t = tokenize(s);
    return { key: rhymeKey(t), vkey: vowelKey(t), mkey: multiKey(t) };
  }
  const tail = tokenize(s.slice(cut));
  if (!tail.length || !tail[0].v) { // klemteken niet direct voor een klinker: volledige weg
    const t = tokenize(s);
    return { key: rhymeKey(t), vkey: vowelKey(t), mkey: multiKey(t) };
  }
  const vowels = tail.filter((x) => x.v).map((x) => x.p);
  const before = s.slice(0, cut).replace(/[ˈˌ]/g, '').match(VOWELS_G);
  const prev = before ? before[before.length - 1] : null;
  return {
    key: tail.map((x) => x.p).join(' '),
    vkey: vowels.join(' '),
    mkey: prev && prev !== 'ə' ? [prev, ...vowels].join(' ') : null,
  };
}

// ---- Medeklinkers: hoe dicht liggen ze bij elkaar? (0 = gelijk, 1 = totaal anders) ----
const CLASS = {
  p: 'stop', b: 'stop', t: 'stop', d: 'stop', k: 'stop', g: 'stop', ʔ: 'stop',
  f: 'fric', v: 'fric', s: 'fric', z: 'fric', x: 'fric', ɣ: 'fric', h: 'fric', ʃ: 'fric', ʒ: 'fric', ɦ: 'fric',
  m: 'nasal', n: 'nasal', ŋ: 'nasal', ɲ: 'nasal',
  l: 'liquid', r: 'liquid', ɾ: 'liquid', ʀ: 'liquid', ʁ: 'liquid',
  j: 'glide', ʋ: 'glide', w: 'glide', ʍ: 'glide',
};
const PAIRS = new Set(['p b', 't d', 'k g', 'f v', 's z', 'x ɣ', 'ʃ ʒ', 'm n', 'n ŋ', 'l r', 'r ɾ', 'ʋ w', 'x h', 's ʃ', 'k x', 'p f', 't s']);
function consonantCost(a, b) {
  if (a === b) return 0;
  if (PAIRS.has(`${a} ${b}`) || PAIRS.has(`${b} ${a}`)) return 0.3;
  if (CLASS[a] && CLASS[a] === CLASS[b]) return 0.55;
  return 1;
}
/** Afstand tussen twee medeklinkergroepjes (kleine edit distance met bovenstaande kosten). */
function clusterCost(a, b) {
  const n = a.length; const m = b.length;
  if (!n && !m) return 0;
  const d = Array.from({ length: n + 1 }, (_, i) => [i * 0.7]);
  for (let j = 1; j <= m; j++) d[0][j] = j * 0.7;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 0.7, d[i][j - 1] + 0.7, d[i - 1][j - 1] + consonantCost(a[i - 1], b[j - 1]));
    }
  }
  return d[n][m];
}
/** Splits de staart in [medeklinkers, klinker, medeklinkers, klinker, ..., medeklinkers]. */
function clusters(tail) {
  const out = [[]];
  for (const t of tail) {
    if (t.v) out.push(t.p, []);
    else out[out.length - 1].push(t.p);
  }
  return out.filter((_, i) => i > 0 || out[0].length); // begin-medeklinkers voor de klemtoon tellen niet
}
/** Hoe goed klinken twee staarten met dezelfde klinkers samen? Lager = beter. */
function tailCost(a, b) {
  const ca = clusters(a); const cb = clusters(b);
  let cost = 0;
  const len = Math.max(ca.length, cb.length);
  for (let i = 0; i < len; i++) {
    const x = ca[i]; const y = cb[i];
    if (typeof x === 'string' || typeof y === 'string') { if (x !== y) cost += 1; continue; }
    // Het laatste groepje (het eind van het woord) weegt zwaarder: daar hoor je het rijm het meest
    cost += clusterCost(x || [], y || []) * (i === len - 1 ? 1.3 : 0.8);
  }
  return cost;
}

// ---- De woordenlijst ----
/**
 * Leest de woordenlijst (na uitpakken) en bouwt de indexen. Twee formaten:
 *  - voorbewerkt (public/data/nl-rijm.txt.gz, gemaakt door scripts/build-nl-index.mjs): sleutels staan er al in,
 *    de woorden staan op gangbaarheid. Inlezen is dan alleen nog regels splitsen (snel, ook op telefoons).
 *  - ruw: woord<TAB>uitspraak<TAB>lettergrepen<TAB>frequentie per regel (tests, scripts); sleutels worden berekend.
 */
export function buildNlIndex(text) {
  return text.startsWith('@K') ? readPrepared(text) : buildFromRaw(text);
}

function emptyIndex() {
  return { words: [], byWord: new Map(), byKey: new Map(), byVowels: new Map(), byMulti: new Map() };
}

function buildFromRaw(text) {
  const idx = emptyIndex();
  const pool = new Map();
  const intern = (k) => { if (k == null) return null; const hit = pool.get(k); if (hit !== undefined) return hit; pool.set(k, k); return k; };
  const add = (map, k, i) => { if (!k) return; let l = map.get(k); if (!l) map.set(k, (l = [])); l.push(i); };
  for (const line of text.split('\n')) {
    if (!line || line[0] === '#') continue;
    const [w, ipa, syl, f, alt, lang] = line.split('\t');
    const k = fastKeys(ipa);
    const i = idx.words.length;
    const entry = { w, ipa, syl: +syl || tokenize(ipa).filter((t) => t.v).length || 1, f: +f || 0, lang: lang === 'en' ? 'en' : 'nl', key: intern(k.key), vkey: intern(k.vkey), mkey: intern(k.mkey) };
    if (alt) {
      const a = fastKeys(alt);
      Object.assign(entry, { alt, akey: intern(a.key), avkey: intern(a.vkey), amkey: intern(a.mkey) });
    }
    idx.words.push(entry);
    idx.byWord.set(w, i);
    add(idx.byKey, entry.key, i);
    add(idx.byVowels, entry.vkey, i);
    add(idx.byMulti, entry.mkey, i);
    // Tweede uitspraak (Engelse woorden): ook onder die klank vindbaar
    if (entry.akey && entry.akey !== entry.key) add(idx.byKey, entry.akey, i);
    if (entry.avkey && entry.avkey !== entry.vkey) add(idx.byVowels, entry.avkey, i);
    if (entry.amkey && entry.amkey !== entry.mkey) add(idx.byMulti, entry.amkey, i);
  }
  const byFreq = (a, b) => idx.words[b].f - idx.words[a].f;
  for (const m of [idx.byKey, idx.byVowels, idx.byMulti]) for (const l of m.values()) l.sort(byFreq);
  return idx;
}

/** Schrijft een index weg in het voorbewerkte formaat (gebruikt door scripts/build-nl-index.mjs). */
export function serializeNlIndex(idx) {
  const order = idx.words.map((_, i) => i).sort((a, b) => idx.words[b].f - idx.words[a].f || (idx.words[a].w < idx.words[b].w ? -1 : 1));
  const ids = (m) => new Map([...m.keys()].map((k, i) => [k, i]));
  const K = ids(idx.byKey); const V = ids(idx.byVowels); const M = ids(idx.byMulti);
  const out = [`@K ${K.size}`, ...K.keys(), `@V ${V.size}`, ...V.keys(), `@M ${M.size}`, ...M.keys(), '@W'];
  const id = (map, k) => (k ? map.get(k) : '');
  for (const i of order) {
    const e = idx.words[i];
    const cols = [e.w, e.ipa, e.syl, e.f, id(K, e.key), id(V, e.vkey), id(M, e.mkey), e.lang === 'en' ? 'en' : ''];
    if (e.alt) cols.push(e.alt, id(K, e.akey), id(V, e.avkey), id(M, e.amkey));
    out.push(cols.join('\t'));
  }
  return out.join('\n') + '\n';
}

function readPrepared(text) {
  const idx = emptyIndex();
  const lines = text.split('\n');
  let p = 0;
  const section = () => {
    const n = +lines[p].split(' ')[1];
    const keys = lines.slice(p + 1, p + 1 + n);
    p += n + 1;
    return keys;
  };
  const K = section(); const V = section(); const M = section();
  const gK = K.map(() => []); const gV = V.map(() => []); const gM = M.map(() => []);
  p++; // @W
  for (; p < lines.length; p++) {
    const line = lines[p];
    if (!line) continue;
    const c = line.split('\t');
    const i = idx.words.length;
    const n = (x) => (x === undefined || x === '' ? -1 : +x);
    const k = n(c[4]); const v = n(c[5]); const m = n(c[6]);
    const entry = { w: c[0], ipa: c[1], syl: +c[2] || 1, f: +c[3] || 0, lang: c[7] === 'en' ? 'en' : 'nl', key: k < 0 ? '' : K[k], vkey: v < 0 ? '' : V[v], mkey: m < 0 ? null : M[m] };
    idx.words.push(entry);
    idx.byWord.set(c[0], i);
    if (k >= 0) gK[k].push(i);
    if (v >= 0) gV[v].push(i);
    if (m >= 0) gM[m].push(i);
    if (c[8]) { // tweede uitspraak (in de andere taal)
      const ak = n(c[9]); const av = n(c[10]); const am = n(c[11]);
      Object.assign(entry, { alt: c[8], akey: ak < 0 ? '' : K[ak], avkey: av < 0 ? '' : V[av], amkey: am < 0 ? null : M[am] });
      if (ak >= 0 && ak !== k) gK[ak].push(i);
      if (av >= 0 && av !== v) gV[av].push(i);
      if (am >= 0 && am !== m) gM[am].push(i);
    }
  }
  // De woorden staan al op gangbaarheid, dus de groepen ook
  K.forEach((key, n) => idx.byKey.set(key, gK[n]));
  V.forEach((key, n) => idx.byVowels.set(key, gV[n]));
  M.forEach((key, n) => idx.byMulti.set(key, gM[n]));
  return idx;
}

/** Uitspraak van een woord dat niet in de lijst staat: leen de klank van het langste bekende woord-einde. */
function guessTokens(index, word) {
  for (let cut = 1; cut < word.length - 1; cut++) {
    const i = index.byWord.get(word.slice(cut));
    if (i !== undefined && word.length - cut >= 3) return tokenize(index.words[i].ipa);
  }
  return null;
}

/** Klanken van een woord of zinsdeel (woorden worden aan elkaar geplakt; alleen de laatste klemtoon telt). */
export function tokensFor(index, text) {
  const parts = String(text).toLowerCase().trim().split(/\s+/).filter(Boolean);
  const all = [];
  for (let n = 0; n < parts.length; n++) {
    const w = parts[n].replace(/[^\p{L}'-]/gu, '');
    const i = index.byWord.get(w);
    const t = i !== undefined ? tokenize(index.words[i].ipa) : guessTokens(index, w);
    if (!t) return null;
    // Klemtoon van eerdere woorden telt als bijklemtoon, zodat het rijm bij het laatste woord begint
    all.push(...(n < parts.length - 1 ? t.map((x) => (x.s === 1 ? { ...x, s: 2 } : x)) : t));
  }
  return all.length ? all : null;
}

// Korte functiewoorden: horen niet in een rijm-combinatie ("maar bos")
const STOP = new Set('de het een en of maar want dus dat die dit deze wat wie waar hoe als dan toen nu al aan op in uit bij met van voor naar om tot door over onder na te er hier daar ja nee niet geen wel ook nog zo zou zal kan moet mag wil is was ben bent zijn ik jij je hij zij ze wij we jullie mij me mijn jouw zijn haar ons onze hun hen ga gaan gaat doe doen heb hebt heeft had'.split(' '));

// score 0 = komt (bijna) nooit voor: valt weg met "Verberg obscure woorden"
// Typisch Engelse woorden die in de woordenlijst kunnen ontbreken (voor de taal van een regel)
const EN_HINTS = new Set("the i i'm im my you you're your it it's and with what that this on of to for got gonna wanna ain't don't can't we're they they're he's she's".split(' '));

/**
 * Welke taal spreekt deze regel? Telt de andere woorden: Nederlands of Engels volgens de woordenlijst.
 * Woorden die in beide talen gewoon zijn (rap, team) tellen niet mee. Geeft 'en', 'nl' of null (geen idee).
 */
export function contextLanguage(index, context, word) {
  if (!context) return null;
  let en = 0; let nl = 0;
  for (const raw of String(context).toLowerCase().match(/[\p{L}']+/gu) || []) {
    if (raw === word) continue;
    if (EN_HINTS.has(raw)) { en++; continue; }
    const i = index.byWord.get(raw);
    if (i === undefined) continue;
    const e = index.words[i];
    if (e.alt) continue;
    if (e.lang === 'en') en++; else nl++;
  }
  if (en === nl) return null;
  return en > nl ? 'en' : 'nl';
}

// Grove woorden en scheldwoorden: niet weg (rappers gebruiken ze), wel achteraan, zodat een Sinterklaasgedicht
// of een liedje voor kinderen niet begint met "tieten" of "schijter".
const COARSE_START = /^(kut|kanker|tering|tyfus|neuk|geneuk|lul|tiet|schijt|kloot|hoer|pijpbek|sperma|fuck|shit|bitch|nigga|neger|mongool|flikker|kontgat|reet|aars)/;
const COARSE_ANY = /(schijter|bijter|neuker|hoeren|kutje|lulletje)$/;
const COARSE_SAFE = new Set(['hoera', 'reet', 'reeds', 'aarsel']); // lijken grof, zijn het niet (reet = gescheurd, ook)
export function isCoarse(word) {
  const w = String(word).toLowerCase();
  if (COARSE_SAFE.has(w) || w.startsWith('hoera') || w.startsWith('aarzel')) return false;
  return COARSE_START.test(w) || COARSE_ANY.test(w);
}
/** Grove woorden naar achteren, de rest in dezelfde volgorde. */
const coarseLast = (list) => {
  const ok = []; const rest = [];
  for (const r of list) (isCoarse(r.word) ? rest : ok).push(r);
  return rest.length ? ok.concat(rest) : list;
};

const toResult = (e, type, score) => ({ word: e.w, numSyllables: e.syl, score: e.f > 0 ? Math.round(score) : 0, freq: e.f, type });
const sameFamily = (a, b) => a === b || a.endsWith(b) || b.endsWith(a);

/**
 * Alle soorten rijmen voor een woord of zinsdeel.
 * @returns {{ known: boolean, perfect: [], near: [], multi: [], combos: [] }}
 */
export function findNlRhymes(index, text, { perfectMax = 150, nearMax = 60, multiMax = 40, comboMax = 12, custom = [], context = '' } = {}) {
  const query = String(text).toLowerCase().trim();
  const isPhrase = /\s/.test(query);
  const tokens = tokensFor(index, query);
  const empty = { known: false, perfect: [], near: [], multi: [], combos: [] };
  if (!tokens) return empty;
  const lastWord = query.split(/\s+/).pop();
  const known = isPhrase || index.byWord.has(query);
  // Woorden met twee uitspraken (drive: Engels "drijf" én Nederlands "drieve"; rap: Nederlands én Engels): rijm op allebei.
  // De taal van de regel waar het woord in staat bepaalt welke uitspraak eerst komt.
  const qi = isPhrase ? undefined : index.byWord.get(query);
  const qe = qi !== undefined ? index.words[qi] : null;
  let variants = [tokens];
  let langs = [qe ? qe.lang : 'nl'];
  if (qe && qe.alt) {
    variants.push(tokenize(qe.alt));
    langs.push(qe.lang === 'en' ? 'nl' : 'en');
    // Alleen bij woorden die in beide talen gewoon zijn (rap, team) mag de regel de volgorde omdraaien.
    // Duidelijk Engelse woorden (drive) blijven Engels eerst, ook in een Nederlandse zin.
    const pref = qe.lang === 'nl' ? contextLanguage(index, context, query) : null;
    if (pref && langs[1] === pref) { variants = [variants[1], variants[0]]; langs = [langs[1], langs[0]]; }
  }
  const keys = variants.map(rhymeKey);
  const key = keys[0];
  const isPerfectOf = (e) => keys.includes(e.key) || (e.akey && keys.includes(e.akey));
  const seen = new Set([query, lastWord]);
  const take = (e) => { if (seen.has(e.w)) return false; seen.add(e.w); return true; };

  // 1. Perfect: zelfde klank vanaf de klemtoon. Geen samenstellingen met hetzelfde woord (nacht ↔ middernacht).
  const perfect = [];
  const byLang = [];
  keys.forEach((k, n) => {
    const list = [];
    for (const i of index.byKey.get(k) || []) {
      const e = index.words[i];
      if (sameFamily(e.w, lastWord) || !take(e)) continue;
      list.push(toResult(e, 'perfect', 1000 + Math.log10(1 + e.f) * 100));
      if (list.length >= perfectMax) break;
    }
    const sorted = coarseLast(list);
    perfect.push(...sorted);
    byLang.push({ lang: langs[n], perfect: sorted });
  });
  for (const c of custom) {
    if (keys.includes(c.key) && !seen.has(c.woord)) { seen.add(c.woord); perfect.push({ word: c.woord, numSyllables: c.aantal_lettergrepen || 1, score: 1000, freq: 0, type: 'perfect' }); }
  }

  // 2. Lang rijm: ook de klinker vóór de klemtoon klinkt hetzelfde (meerlettergrepig)
  const multi = [];
  for (const mkey of new Set(variants.map(multiKey).filter(Boolean))) {
    for (const i of index.byMulti.get(mkey) || []) {
      const e = index.words[i];
      if (sameFamily(e.w, lastWord) || !take(e)) continue;
      multi.push(toResult(e, 'multi', 950 + (isPerfectOf(e) ? 50 : 0)));
      if (multi.length >= multiMax) break;
    }
  }

  // 3. Bijna: zelfde klinkers, medeklinkers die erop lijken. Gesorteerd op klank, dan op hoe gangbaar.
  const nearCands = [];
  for (const vt of variants) {
    const vkey = vowelKey(vt);
    const tail = vt.slice(stressIndex(vt));
    for (const i of index.byVowels.get(vkey) || []) {
      const e = index.words[i];
      if (isPerfectOf(e) || seen.has(e.w) || sameFamily(e.w, lastWord)) continue;
      const t = tokenize(e.vkey === vkey || !e.alt ? e.ipa : e.alt);
      const cost = tailCost(tail, t.slice(stressIndex(t)));
      if (cost > 2.2) continue;
      // Klank weegt het zwaarst; gangbaarheid breekt gelijkspel. Woorden die nooit voorkomen zakken iets.
      nearCands.push([cost - Math.log10(1 + e.f) * 0.12 + (e.f ? 0 : 0.35), e]);
      if (nearCands.length > 4000) break;
    }
  }
  nearCands.sort((x, y) => x[0] - y[0]);
  const near = [];
  for (const [c, e] of nearCands) {
    if (!take(e)) continue;
    near.push(toResult(e, 'near', 900 - c * 200));
    if (near.length >= nearMax) break;
  }

  // 4. Combinaties (zinsdeel): een kort woord met dezelfde klinker als het voorlaatste woord + een perfect rijm op het laatste
  const combos = [];
  if (isPhrase) {
    const parts = query.split(/\s+/);
    const firstTokens = tokensFor(index, parts.slice(0, -1).join(' '));
    const firstVowel = firstTokens && [...firstTokens].reverse().find((t) => t.v && !isWeak(t))?.p;
    const lastTokens = tokensFor(index, lastWord);
    if (firstVowel && lastTokens) {
      const lastKey = rhymeKey(lastTokens);
      const ends = (index.byKey.get(lastKey) || []).map((i) => index.words[i]).filter((e) => !sameFamily(e.w, lastWord) && e.syl <= 2 && e.f > 0).slice(0, 8);
      const starts = (index.byVowels.get(firstVowel) || []).map((i) => index.words[i]).filter((e) => e.syl === 1 && e.f > 0 && !STOP.has(e.w) && !parts.includes(e.w)).slice(0, 8);
      const pairs = [];
      for (const a of starts) for (const b of ends) pairs.push([Math.log10(1 + a.f) + Math.log10(1 + b.f), `${a.w} ${b.w}`, a.syl + b.syl]);
      pairs.sort((x, y) => y[0] - x[0]);
      for (const [s, w, syl] of pairs.slice(0, comboMax)) combos.push({ word: w, numSyllables: syl, score: Math.round(s * 100), type: 'combo' });
    }
  }

  // variants: alleen als het woord twee uitspraken heeft (bijv. rap), in de volgorde van de context
  return { known, perfect, near: coarseLast(near), multi: coarseLast(multi), combos, variants: byLang.length > 1 ? byLang : null };
}

/** Rijmsleutel voor een eigen woord (zelf toegevoegd): via de klank van een bekend woord-einde. */
export function keyForCustomWord(index, word) {
  const t = tokensFor(index, word);
  return t ? rhymeKey(t) : null;
}

// ---- Spellingsuggesties ("Bedoel je …?") ----
/** Damerau-Levenshtein met een plafond: stopt zodra de afstand groter wordt dan max. */
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const n = a.length; const m = b.length;
  let prev2 = null;
  let prev = Array.from({ length: m + 1 }, (_, j) => j);
  for (let i = 1; i <= n; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= m; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[m];
}

/**
 * Woorden die lijken op een (verkeerd gespeld) woord: hooguit 2 letters verschil,
 * gangbare woorden eerst. "geoeit" → gooit, groeit, geleid …
 */
export function suggestNl(index, word, max = 6) {
  const w = String(word).toLowerCase().trim();
  if (w.length < 2) return [];
  const limit = w.length <= 4 ? 1 : 2;
  const squash = (x) => x.replace(/(.)\1+/g, '$1');
  const sw = squash(w);
  const found = [];
  for (const e of index.words) {
    if (e.w === w || Math.abs(e.w.length - w.length) > limit) continue;
    const d = editDistance(w, e.w, limit);
    if (d > limit) continue;
    // Afstand telt het zwaarst. Een vergeten dubbele letter (onmidelijk → onmiddellijk) is bijna geen fout.
    // Zelfde eerste letter en gangbare woorden wegen mee.
    const dd = squash(e.w) === sw ? Math.min(d, 0.6) : d;
    const score = dd * 10 - Math.log10(1 + e.f) * 2.2 - (e.w[0] === w[0] ? 2 : 0);
    found.push([score, e]);
  }
  found.sort((a, b) => a[0] - b[0]);
  return found.slice(0, max).map(([, e]) => ({ word: e.w, numSyllables: e.syl, score: Math.round(1000 - e.f), type: 'spelling' }));
}
