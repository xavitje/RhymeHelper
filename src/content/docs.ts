import type { Lang } from '../i18n/routes';

/**
 * Handleiding voor /resources. Gebaseerd op de handleiding in de app (src/components/help/guide.js, EN),
 * aangevuld en gecorrigeerd (Studio = Pro, Cloud Sync = los abonnement).
 * Sneltoetsen schrijf je als {Ctrl+K}; die worden als toetsen getoond.
 */
export type DocItem = [term: string, text: string, pro?: boolean];
export type DocSection = { id: string; title: string; intro?: string; items: DocItem[] };

const DOCS_EN: DocSection[] = [
  {
    id: 'start',
    title: 'Getting started',
    intro: 'Rhyme Helper is a writing app for lyrics. Your songs save automatically on your computer about a second after you type. You don’t need an account to write.',
    items: [
      ['Install', 'Windows 10 or 11: download the installer and run it. Windows may show a SmartScreen warning the first time: click More info, then Run anyway. Mac (macOS 12 or newer): open the .dmg file and drag Rhyme Helper to Applications. The app updates itself after that.'],
      ['New song', 'Press {Ctrl+N} or click New Song in the sidebar. Name it by typing in the big title above your lyrics.'],
      ['Sections', 'Type a line like [Verse 1], [Chorus] or [Bridge]. It becomes a label, and the lines below it are grouped, with their own syllable average.'],
      ['BPM and key', 'Use the small chips above the title to note the tempo and key of the beat. Don’t know the tempo? Tap along with Tap.'],
    ],
  },
  {
    id: 'writing',
    title: 'Writing and flow',
    items: [
      ['Syllable meter', 'Every line shows its syllable count on the right. A line that is much longer or shorter than the rest of its section turns orange.'],
      ['Does the line fit the bar?', 'With a BPM set, the syllable count turns green (fits), orange (tight) or red (too packed). In the BPM menu you set whether a line lasts 1 or 2 bars.'],
      ['Metronome', 'With a BPM set, Metronome plays a simple kick-snare at that tempo, so you can write in time without a beat.'],
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
      ['Open songs', 'The sidebar shows the songs you have open. Right-click a song for more options. Sort by name or BPM with the arrows next to the count. Your songs are always saved in the app.'],
      ['Song library', 'See every song you ever wrote in the sidebar, search them by title or lyrics, and open any of them again with one click.', true],
      ['Autosave and history', 'Every change is saved on your computer. Edit → Version history takes you back to an earlier save.'],
      ['Export', 'File → Export makes a PDF (with line numbers and syllables if you like), a text file or Markdown. {Ctrl+O} opens a .txt, .md or .lrc file. In the desktop app, {Ctrl+S} keeps a song you opened from a file up to date in that file.'],
      ['Print', '{Ctrl+P} prints a clean lyric sheet with line numbers.'],
      ['Share', 'The share icon in the top bar creates a read-only link anyone can open in a browser, without an account. Or send your lyrics through your computer’s or phone’s share menu. You need a free account to create a link.'],
      ['Tabs and split screen', 'Open several songs as tabs, and drag a tab to the right to see two songs side by side.', true],
      ['Colours and styles', 'Change the theme and accent under Settings → Appearance. Blue, Lime and Coral accents and the Midnight, Onyx and Paper styles come with Pro.', true],
    ],
  },
  {
    id: 'studio',
    title: 'Studio and focus mode',
    items: [
      ['Studio', 'Click the headphones in the top bar and drop in a beat. Play and pause with {Ctrl+Space} while you keep typing.', true],
      ['Loop and timestamps', 'Open the player to loop, set the volume and add a timestamp to the current line. Export the result as a synced .lrc file, or save your lyrics into the MP3.', true],
      ['Tempo and loops', 'Studio measures the BPM of your beat and fills it in if your song has none yet. In the extra options you can loop 4 or 8 bars from where you are.', true],
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
      ['Cloud Sync', 'An optional subscription that gives you a cloud library: your songs on every device you log in on, in the desktop app and in the browser. Set it up in the app or under Account settings on this website.'],
      ['Cloud library', 'Every song in the sidebar shows where it comes from: a device icon for songs you made on this device, a cloud for songs made on another one. Hover it to see which device made it and when it was last changed. New songs are added automatically. Songs you already had can be added from the Cloud button in the top bar. Name your devices under Settings → Account.'],
      ['Writing together', 'In Share, start Write together and send the invite link. Anyone with a free account can join: you see each other type, live. Only the person who starts it needs Cloud Sync. Stopping keeps the lyrics as a normal song for everyone.'],
      ['Syncing and conflicts', 'Changes sync within seconds, also while a song is open on another computer. Offline changes are uploaded when you are back online. If a song changed in two places, you choose which version to keep, or keep both.'],
      ['Recently deleted', 'Deleted cloud songs stay in Recently deleted for 30 days. Open it from the Cloud button in the top bar to restore a song or delete it for good.'],
    ],
  },
];

type ShortcutGroup = { group: string; items: [label: string, keys: string][] };

const SHORTCUTS_EN: ShortcutGroup[] = [
  {
    group: 'Songs',
    items: [
      ['New song', 'Ctrl+N'],
      ['Open a file', 'Ctrl+O'],
      ['Save', 'Ctrl+S'],
      ['Save as (desktop app)', 'Ctrl+Shift+S'],
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

const DOCS_NL: DocSection[] = [
  {
    id: 'start',
    title: 'Aan de slag',
    intro: 'Rhyme Helper is een schrijfapp voor songteksten. Je songs worden ongeveer een seconde nadat je typt automatisch op je computer opgeslagen. Je hebt geen account nodig om te schrijven.',
    items: [
      ['Installeren', 'Windows 10 of 11: download de installer en start hem. Windows laat de eerste keer misschien een SmartScreen-melding zien: klik op Meer informatie en dan op Toch uitvoeren. Mac (macOS 12 of nieuwer): open het .dmg-bestand en sleep Rhyme Helper naar Apps. Daarna werkt de app zichzelf bij.'],
      ['Nieuw lied', 'Druk op {Ctrl+N} of klik in de zijbalk op Nieuw lied. Geef het een naam door de grote titel boven je tekst in te typen.'],
      ['Secties', 'Typ een regel als [Couplet 1], [Refrein] of [Bridge]. Die wordt een label, en de regels eronder worden gegroepeerd met een eigen gemiddelde aantal lettergrepen.'],
      ['BPM en toonsoort', 'Noteer met de kleine labels boven de titel het tempo en de toonsoort van de beat. Weet je het tempo niet? Tik mee met Tik.'],
    ],
  },
  {
    id: 'writing',
    title: 'Schrijven en flow',
    items: [
      ['Lettergreepmeter', 'Achter elke regel staat rechts het aantal lettergrepen. Een regel die veel langer of korter is dan de rest van de sectie wordt oranje.'],
      ['Past de regel in de maat?', 'Met een BPM kleurt het aantal lettergrepen groen (past), oranje (krap) of rood (te vol). In het BPM-menu stel je in of een regel 1 of 2 maten duurt.'],
      ['Metronoom', 'Met een BPM speelt Metronoom een simpele kick-snare op dat tempo, zodat je ook zonder beat op de maat schrijft.'],
      ['Rijmkleuren', 'Zet Rijmschema kleuren aan onder Instellingen → Editor. Regeleinden die rijmen krijgen dezelfde kleur.'],
      ['Opmaak', 'Selecteer tekst voor het zwevende menu: vet, cursief, kleuren, links ({Ctrl+L}) en meer. Het menu Opmaak bovenin heeft dezelfde opties.'],
      ['Regels verplaatsen', '{Alt+↑} en {Alt+↓} verplaatsen de huidige regel omhoog of omlaag.'],
      ['Zoeken en vervangen', '{Ctrl+F} zoekt in het lied dat je open hebt, en kan woorden vervangen.'],
    ],
  },
  {
    id: 'rhymes',
    title: 'Rijmen vinden',
    items: [
      ['Snelle rijmen', 'Selecteer een woord en de rijmen verschijnen er direct boven. Klik op een rijm om het woord te vervangen, of houd {Ctrl} ingedrukt en klik om het achter het woord te zetten.'],
      ['Rijmpaneel', 'Klik op Meer of druk op {Alt+D}. Zoek elk woord op, filter op lettergrepen en wissel tussen Rijmen, Bijna-rijmen, Synoniemen en Notities. Woorden die al in je lied staan, zijn doorgestreept.'],
      ['Overal zoeken', 'Druk op {Ctrl+K} en typ “rhyme gold”. Kies een rijm met de pijltjestoetsen en druk op Enter om het bij je cursor in te voegen.'],
      ['Bijna-rijmen en synoniemen', 'Woorden die bijna rijmen, hetzelfde klinken of hetzelfde betekenen.', true],
      ['Rijmen op zinsdelen', 'Selecteer meerdere woorden om meerlettergrepige rijmen voor het hele zinsdeel te vinden.', true],
      ['AI-rijmen', 'Suggesties die passen bij de betekenis van je regel, en rijmen voor andere talen dan Engels en Nederlands.', true],
      ['Talen', 'Engels en Nederlands zitten erin: de app, de rijmen en het tellen van lettergrepen.'],
    ],
  },
  {
    id: 'songs',
    title: 'Liedjes en bestanden',
    items: [
      ['Open liedjes', 'De zijbalk toont de liedjes die je open hebt. Klik met rechts op een lied voor meer opties. Sorteer op naam of BPM met de pijltjes naast het aantal. Je liedjes worden altijd in de app bewaard.'],
      ['Liedbibliotheek', 'Zie elk lied dat je ooit schreef in de zijbalk, zoek op titel of tekst, en open elk lied weer met één klik.', true],
      ['Autosave en geschiedenis', 'Elke wijziging wordt op je computer opgeslagen. Bewerken → Versiegeschiedenis brengt je terug naar een eerdere versie.'],
      ['Exporteren', 'Bestand → Exporteren maakt een pdf (met regelnummers en lettergrepen als je wilt), een tekstbestand of Markdown. {Ctrl+O} opent een .txt-, .md- of .lrc-bestand. In de desktop-app houdt {Ctrl+S} een lied dat je uit een bestand opende bij in dat bestand.'],
      ['Printen', '{Ctrl+P} print een nette tekst met regelnummers.'],
      ['Delen', 'Het deel-icoon in de bovenbalk maakt een alleen-lezen link die iedereen in de browser kan openen, zonder account. Of stuur je tekst via het deelmenu van je computer of telefoon. Voor een link heb je een gratis account nodig.'],
      ['Tabbladen en gesplitst scherm', 'Open meerdere liedjes als tabbladen, en sleep een tabblad naar rechts om twee liedjes naast elkaar te zien.', true],
      ['Kleuren en stijlen', 'Verander het thema en de accentkleur onder Instellingen → Weergave. De accenten Blue, Lime en Coral en de stijlen Midnight, Onyx en Paper horen bij Pro.', true],
    ],
  },
  {
    id: 'studio',
    title: 'Studio en focusmodus',
    items: [
      ['Studio', 'Klik op de koptelefoon in de bovenbalk en sleep een beat erin. Afspelen en pauzeren met {Ctrl+Space} terwijl je doortypt.', true],
      ['Loop en tijdstempels', 'Open de speler om te loopen, het volume in te stellen en een tijdstempel aan de huidige regel te geven. Exporteer het resultaat als gesynchroniseerd .lrc-bestand, of sla je tekst op in de MP3.', true],
      ['Tempo en lussen', 'Studio meet de BPM van je beat en vult die in als je lied er nog geen heeft. Bij de extra opties kun je 4 of 8 maten lussen vanaf waar je bent.', true],
      ['Automatisch scrollen', 'De teleprompter in de onderbalk scrolt je tekst terwijl je opneemt. Stel de snelheid in met de schuifregelaar.'],
      ['Focusmodus', '{F11} verbergt alles behalve je tekst. Druk nog een keer om terug te gaan.'],
    ],
  },
  {
    id: 'account',
    title: 'Account, Pro en Cloud Sync',
    items: [
      ['Account', 'Een account is gratis. Je hebt het nodig om Pro te koppelen en voor Cloud Sync. Log in vanuit de app of op deze website.'],
      ['Pro activeren', 'Na je aankoop krijg je een licentiesleutel per mail. Kies in de app Upgraden naar Pro, dan “Ik heb al een licentiesleutel”, en plak hem. Of koppel hem in je dashboard op deze website en log in de app in met hetzelfde account.'],
      ['Apparaten', 'Eén Pro-licentie werkt op maximaal twee computers.'],
      ['Cloud Sync', 'Een optioneel abonnement voor een cloudbibliotheek: je liedjes op elk apparaat waarop je inlogt, in de desktop-app en in de browser. Zet het aan in de app of onder Account op deze website.'],
      ['Cloudbibliotheek', 'Elk lied in de zijbalk laat zien waar het vandaan komt: een apparaat-icoon voor liedjes die je op dit apparaat maakte, een wolk voor liedjes van een ander apparaat. Ga erop staan om te zien welk apparaat het maakte en wanneer het voor het laatst is gewijzigd. Nieuwe liedjes worden vanzelf toegevoegd. Liedjes die je al had, voeg je toe via de Cloud-knop in de bovenbalk. Geef je apparaten een naam onder Instellingen → Account.'],
      ['Samen schrijven', 'Start bij Delen “Samen schrijven” en stuur de uitnodigingslink. Iedereen met een gratis account kan meedoen: jullie zien elkaar live typen. Alleen wie het start heeft Cloud Sync nodig. Stop je, dan blijft de tekst voor iedereen een gewoon lied.'],
      ['Synchroniseren en conflicten', 'Wijzigingen worden binnen enkele seconden gesynchroniseerd, ook als een lied op een andere computer openstaat. Offline wijzigingen gaan omhoog zodra je weer online bent. Is een lied op twee plekken veranderd, dan kies je welke versie je houdt, of je houdt ze allebei.'],
      ['Onlangs verwijderd', 'Verwijderde cloudliedjes blijven 30 dagen in Onlangs verwijderd. Open die lijst via de Cloud-knop in de bovenbalk om een lied terug te zetten of definitief te verwijderen.'],
    ],
  },
];

const SHORTCUTS_NL: ShortcutGroup[] = [
  {
    group: 'Liedjes',
    items: [
      ['Nieuw lied', 'Ctrl+N'],
      ['Bestand openen', 'Ctrl+O'],
      ['Opslaan', 'Ctrl+S'],
      ['Opslaan als (desktop-app)', 'Ctrl+Shift+S'],
      ['Printen', 'Ctrl+P'],
      ['Tabblad sluiten', 'Ctrl+W'],
      ['Gesloten tabblad heropenen', 'Ctrl+Shift+T'],
    ],
  },
  {
    group: 'Schrijven',
    items: [
      ['Ongedaan maken / opnieuw', 'Ctrl+Z / Ctrl+Y'],
      ['Vet, cursief, onderstrepen', 'Ctrl+B / Ctrl+I / Ctrl+U'],
      ['Link invoegen', 'Ctrl+L'],
      ['Zoeken en vervangen', 'Ctrl+F'],
      ['Regel omhoog / omlaag', 'Alt+↑ / Alt+↓'],
    ],
  },
  {
    group: 'App',
    items: [
      ['Overal zoeken', 'Ctrl+K'],
      ['Rijmpaneel', 'Alt+D'],
      ['Zijbalk', 'Ctrl+\\'],
      ['Beat afspelen / pauzeren', 'Ctrl+Space'],
      ['Focusmodus', 'F11'],
      ['In- / uitzoomen', 'Ctrl+= / Ctrl+-'],
      ['Instellingen', 'Ctrl+,'],
    ],
  },
];

export const DOCS: Record<Lang, DocSection[]> = { en: DOCS_EN, nl: DOCS_NL };
export const SHORTCUTS: Record<Lang, ShortcutGroup[]> = { en: SHORTCUTS_EN, nl: SHORTCUTS_NL };
