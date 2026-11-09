export type NlEntry = { w: string; ipa: string; syl: number; f: number; lang: 'nl' | 'en'; key: string; alt?: string };
export type NlIndex = { words: NlEntry[]; byWord: Map<string, number> };
export type NlResult = { word: string; numSyllables: number; score: number; freq: number; type: string };
export function buildNlIndex(text: string): NlIndex;
export function findNlRhymes(index: NlIndex, text: string, opts?: Record<string, unknown>): {
  known: boolean; perfect: NlResult[]; near: NlResult[]; multi: NlResult[]; combos: NlResult[];
};
export function isCoarse(word: string): boolean;
