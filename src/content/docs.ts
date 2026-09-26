/**
 * Handleiding voor /resources. Gebaseerd op de handleiding in de app (src/components/help/guide.js, EN),
 * aangevuld en gecorrigeerd (Studio = Pro, Cloud Sync = los abonnement).
 * Sneltoetsen schrijf je als {Ctrl+K}; die worden als toetsen getoond.
 */
export type DocItem = [term: string, text: string, pro?: boolean];
export type DocSection = { id: string; title: string; intro?: string; items: DocItem[] };

export const DOCS: DocSection[] = [
  {
    id: 'start',
    title: 'Getting started',
    intro: 'Rhyme Helper is a writing app for lyrics. Your songs save automatically on your computer about a second after you type. You don’t need an account to write.',
    items: [
      ['Install', 'Download the installer for Windows 10 or 11 and run it. Windows may show a SmartScreen warning the first time: click More info, then Run anyway. The app updates itself after that.'],
      ['New song', 'Press {Ctrl+N} or click New Song in the sidebar. Name it by typing in the big title above your lyrics.'],
      ['Sections', 'Type a line like [Verse 1], [Chorus] or [Bridge]. It becomes a label, and the lines below it are grouped, with their own syllable average.'],
      ['BPM and key', 'Use the small chips above the title to note the tempo and key of the beat.'],
    ],
  },
  {
    id: 'writing',
    title: 'Writing and flow',
    items: [
      ['Syllable meter', 'Every line shows its syllable count on the right. A line that is much longer or shorter than the rest of its section turns orange.'],
      ['Rhyme colours', 'Turn on Color rhyme scheme in Settings → Editor. Line endings that rhyme get the same colour.'],
      ['Formatting', 'Select text to get the floating menu: bold, italic, colours, links ({Ctrl+L}) and more. The Format menu at the top has the same options.'],
      ['Move lines', '{Alt+↑} and {Alt+↓} move the current line up or down.'],
      ['Find and replace', '{Ctrl+F} searches the song you have open, and can replace words.'],
    ],
  },
  {
    id: 'rhymes',
    title: 'Finding rhymes',
    items: [
      ['Quick rhymes', 'Select a word and rhymes appear right above it. Click one to replace the word, or hold {Ctrl} and click to add it after the word.'],
      ['Rhyme panel', 'Click More or press {Alt+D}. Search any word, filter by syllables, and switch between Rhymes, Near rhymes, Synonyms and Notes. Words already in your song are crossed out.'],
      ['Search everything', 'Press {Ctrl+K} and type “rhyme gold”. Pick a rhyme with the arrow keys and press Enter to insert it at your cursor.'],
      ['Near rhymes and synonyms', 'Words that almost rhyme, sound alike or mean the same thing.', true],
      ['Phrase rhymes', 'Select several words to find multi-syllable rhymes for the whole phrase.', true],
      ['AI rhymes', 'Suggestions that fit the meaning of your line, and rhymes for languages other than English and Dutch.', true],
      ['Languages', 'English and Dutch are built in: the app, the rhymes and the syllable counts.'],
    ],
  },
  {
    id: 'songs',
    title: 'Songs and files',
    items: [
      ['Library', 'The sidebar lists your songs. Search by title or lyrics, and right-click a song for more options.'],
      ['Autosave and history', 'Every change is saved on your computer. Edit → Version history takes you back to an earlier save.'],
      ['Save a copy', '{Ctrl+S} saves the song as a file. {Ctrl+O} opens a .txt, .md or .lrc file.'],
      ['Print and PDF', '{Ctrl+P} prints a clean lyric sheet with line numbers. Choose Save as PDF in the print window for a PDF.'],
      ['Tabs and split screen', 'Open several songs as tabs, and drag a tab to the right to see two songs side by side.', true],
    ],
  },
  {
    id: 'studio',
    title: 'Studio and focus mode',
    items: [
      ['Studio', 'Click the headphones in the top bar and drop in a beat. Play and pause with {Ctrl+Space} while you keep typing.', true],
      ['Loop and timestamps', 'Open the player to loop, set the volume and add a timestamp to the current line. Export the result as a synced .lrc file, or save your lyrics into the MP3.', true],
      ['Auto Scroll', 'The teleprompter in the bottom bar scrolls your lyrics while you record. Set the speed with the slider.'],
      ['Focus mode', '{F11} hides everything except your lyrics. Press it again to come back.'],
    ],
  },
  {
    id: 'account',
    title: 'Account, Pro and Cloud Sync',
    items: [
      ['Account', 'An account is free. You need one to link Pro and for Cloud Sync. Log in from the app or on this website.'],
      ['Activate Pro', 'After your purchase you get a license key by email. In the app, choose Upgrade to Pro, then “I already have a license key”, and paste it. Or link it in your dashboard on this website and log in to the app with the same account.'],
      ['Devices', 'One Pro license works on up to two computers.'],
      ['Cloud Sync', 'An optional subscription that backs up your songs and keeps them in sync on every computer you log in on. Set it up in the app or under Account settings on this website.'],
    ],
  },
];

export const SHORTCUTS: { group: string; items: [label: string, keys: string][] }[] = [
  {
    group: 'Songs',
    items: [
      ['New song', 'Ctrl+N'],
      ['Open a file', 'Ctrl+O'],
      ['Save a copy', 'Ctrl+S'],
      ['Save as', 'Ctrl+Shift+S'],
      ['Print', 'Ctrl+P'],
      ['Close tab', 'Ctrl+W'],
      ['Reopen closed tab', 'Ctrl+Shift+T'],
    ],
  },
  {
    group: 'Writing',
    items: [
      ['Undo / redo', 'Ctrl+Z / Ctrl+Y'],
      ['Bold, italic, underline', 'Ctrl+B / Ctrl+I / Ctrl+U'],
      ['Insert link', 'Ctrl+L'],
      ['Find and replace', 'Ctrl+F'],
      ['Move line up / down', 'Alt+↑ / Alt+↓'],
    ],
  },
  {
    group: 'App',
    items: [
      ['Search everything', 'Ctrl+K'],
      ['Rhyme panel', 'Alt+D'],
      ['Sidebar', 'Ctrl+\\'],
      ['Play / pause beat', 'Ctrl+Space'],
      ['Focus mode', 'F11'],
      ['Zoom in / out', 'Ctrl+= / Ctrl+-'],
      ['Settings', 'Ctrl+,'],
    ],
  },
];
