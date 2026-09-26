/** Wat zit in Free en Pro. Bron: de app-code (fase 5–6) + besluit Studio = Pro (26 sep 2026). */

export const FREE_HIGHLIGHTS = [
  'Full editor with formatting',
  'Perfect rhymes',
  'Syllable counts per line',
  'Idea board and notes',
  'Autosave and version history',
  'Print and export to PDF',
];

export const PRO_HIGHLIGHTS = [
  'Near rhymes and sounds-like',
  'Synonyms and saved words',
  'AI rhyme suggestions',
  'Multi-syllable phrase search',
  'Studio: play your beat while you write',
  'Tabs, split screen and cloud sync',
];

export type CompareRow = { feature: string; free: boolean; pro: boolean; note?: string };
export type CompareGroup = { title: string; rows: CompareRow[] };

export const COMPARISON: CompareGroup[] = [
  {
    title: 'Writing',
    rows: [
      { feature: 'Rich text editor with formatting and colours', free: true, pro: true },
      { feature: 'Syllable count per line, average per section', free: true, pro: true },
      { feature: 'Rhyme scheme in colour', free: true, pro: true },
      { feature: 'Idea board and song notes', free: true, pro: true },
      { feature: 'Autosave and version history', free: true, pro: true },
      { feature: 'Focus mode and command palette', free: true, pro: true },
      { feature: 'Print and export to PDF', free: true, pro: true },
      { feature: 'English and Dutch', free: true, pro: true },
    ],
  },
  {
    title: 'Rhymes',
    rows: [
      { feature: 'Perfect rhymes, grouped by syllables', free: true, pro: true },
      { feature: 'Near rhymes and sounds-like', free: false, pro: true },
      { feature: 'Synonyms and saved words', free: false, pro: true },
      { feature: 'AI rhyme suggestions', free: false, pro: true },
      { feature: 'Multi-syllable phrase search', free: false, pro: true },
    ],
  },
  {
    title: 'Studio',
    rows: [
      { feature: 'Beat player with waveform', free: false, pro: true },
      { feature: 'Loop and timestamps, export synced lyrics (.lrc)', free: false, pro: true },
      { feature: 'Save your lyrics into the MP3', free: false, pro: true },
    ],
  },
  {
    title: 'Workspace',
    rows: [
      { feature: 'Several songs open in tabs', free: false, pro: true },
      { feature: 'Split screen, two songs side by side', free: false, pro: true },
      { feature: 'Cloud sync across devices', free: false, pro: true },
    ],
  },
];
