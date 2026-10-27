/**
 * Wat zit in Free en Pro. Bron: de app-code (fase 5–6) + besluit Studio = Pro (26 sep 2026).
 * Cloud Sync is een los abonnement (app: CloudSyncModal, €2.99/maand), niet onderdeel van Pro.
 */

import type { Lang } from '../i18n/routes';

const FREE_HIGHLIGHTS_EN = [
  'Full editor with formatting',
  'Perfect rhymes',
  'Syllable counts per line',
  'Notes for loose ideas and per song',
  'Autosave and version history',
  'Print and export to PDF',
];

const PRO_HIGHLIGHTS_EN = [
  'Near rhymes and sounds-like',
  'Synonyms and saved words',
  'AI rhyme suggestions',
  'Multi-syllable phrase search',
  'Studio: play your beat while you write',
  'Your full song library, with search',
  'Tabs and split screen',
  'Extra accent colours and styles',
];

export type CompareRow = { feature: string; free: boolean; pro: boolean; note?: string };
export type CompareGroup = { title: string; rows: CompareRow[] };

const COMPARISON_EN: CompareGroup[] = [
  {
    title: 'Writing',
    rows: [
      { feature: 'Rich text editor with formatting and colours', free: true, pro: true },
      { feature: 'Syllable count per line, average per section', free: true, pro: true },
      { feature: 'Rhyme scheme in colour', free: true, pro: true },
      { feature: 'Notes: global ideas and song notes', free: true, pro: true },
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
      { feature: 'Songs you have open, in the sidebar', free: true, pro: true },
      { feature: 'Full song library: every song you wrote, searchable by title and lyrics', free: false, pro: true },
      { feature: 'Several songs open in tabs', free: false, pro: true },
      { feature: 'Split screen, two songs side by side', free: false, pro: true },
    ],
  },
  {
    title: 'Look',
    rows: [
      { feature: 'Dark and light theme with the Iris accent', free: true, pro: true },
      { feature: 'Extra accents (Blue, Lime, Coral) and background styles (Midnight, Onyx, Paper)', free: false, pro: true },
    ],
  },
];

const FREE_HIGHLIGHTS_NL = [
  'Volledige editor met opmaak',
  'Perfecte rijmen',
  'Lettergrepen per regel',
  'Notities voor losse ideeën en per lied',
  'Autosave en versiegeschiedenis',
  'Printen en exporteren naar PDF',
];

const PRO_HIGHLIGHTS_NL = [
  'Bijna-rijmen en klinkt-als',
  'Synoniemen en bewaarde woorden',
  'AI-rijmsuggesties',
  'Meerlettergrepig zoeken op zinsdelen',
  'Studio: je beat afspelen terwijl je schrijft',
  'Je hele liedbibliotheek, doorzoekbaar',
  'Tabbladen en gesplitst scherm',
  'Extra accentkleuren en stijlen',
];

const COMPARISON_NL: CompareGroup[] = [
  {
    title: 'Schrijven',
    rows: [
      { feature: 'Teksteditor met opmaak en kleuren', free: true, pro: true },
      { feature: 'Lettergrepen per regel, gemiddelde per sectie', free: true, pro: true },
      { feature: 'Rijmschema in kleur', free: true, pro: true },
      { feature: 'Notities: losse ideeën en notities per lied', free: true, pro: true },
      { feature: 'Autosave en versiegeschiedenis', free: true, pro: true },
      { feature: 'Focusmodus en opdrachtenpalet', free: true, pro: true },
      { feature: 'Printen en exporteren naar PDF', free: true, pro: true },
      { feature: 'Engels en Nederlands', free: true, pro: true },
    ],
  },
  {
    title: 'Rijmen',
    rows: [
      { feature: 'Perfecte rijmen, gegroepeerd op lettergrepen', free: true, pro: true },
      { feature: 'Bijna-rijmen en klinkt-als', free: false, pro: true },
      { feature: 'Synoniemen en bewaarde woorden', free: false, pro: true },
      { feature: 'AI-rijmsuggesties', free: false, pro: true },
      { feature: 'Meerlettergrepig zoeken op zinsdelen', free: false, pro: true },
    ],
  },
  {
    title: 'Studio',
    rows: [
      { feature: 'Beatspeler met golfvorm', free: false, pro: true },
      { feature: 'Loop en tijdstempels, gesynchroniseerde tekst exporteren (.lrc)', free: false, pro: true },
      { feature: 'Je tekst opslaan in de MP3', free: false, pro: true },
    ],
  },
  {
    title: 'Werkruimte',
    rows: [
      { feature: 'Je open liedjes in de zijbalk', free: true, pro: true },
      { feature: 'Hele liedbibliotheek: elk lied dat je schreef, doorzoekbaar op titel en tekst', free: false, pro: true },
      { feature: 'Meerdere liedjes open in tabbladen', free: false, pro: true },
      { feature: 'Gesplitst scherm, twee liedjes naast elkaar', free: false, pro: true },
    ],
  },
  {
    title: 'Uiterlijk',
    rows: [
      { feature: 'Donker en licht thema met het Iris-accent', free: true, pro: true },
      { feature: 'Extra accenten (Blue, Lime, Coral) en achtergrondstijlen (Midnight, Onyx, Paper)', free: false, pro: true },
    ],
  },
];

export const FREE_HIGHLIGHTS: Record<Lang, string[]> = { en: FREE_HIGHLIGHTS_EN, nl: FREE_HIGHLIGHTS_NL };
export const PRO_HIGHLIGHTS: Record<Lang, string[]> = { en: PRO_HIGHLIGHTS_EN, nl: PRO_HIGHLIGHTS_NL };
export const COMPARISON: Record<Lang, CompareGroup[]> = { en: COMPARISON_EN, nl: COMPARISON_NL };
