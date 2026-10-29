import { APP_CONFIG, proPrice } from '../config';
import type { Lang } from '../i18n/routes';
import { fmtPrice } from '../i18n/ui';

export type FaqId =
  | 'free' | 'oneTime' | 'languages' | 'offline' | 'licenseKey' | 'devices' | 'cloudSync'
  | 'conflicts' | 'cloudOffline' | 'stopCloud' | 'restore' | 'smartscreen' | 'mac' | 'web';
export type FaqItem = { id?: FaqId; question: string; answer: string };

/** FAQ in beide talen. Functie, zodat de prijs na de launch-einddatum klopt. Homepage toont de eerste vijf. */
export function getFaqs(lang: Lang = 'en'): FaqItem[] {
  const pro = fmtPrice(lang, proPrice().price);
  const cloud = fmtPrice(lang, APP_CONFIG.CLOUD_SYNC_PRICE);
  if (lang === 'nl') {
    return [
      { id: 'free', question: 'Is Rhyme Helper echt gratis?', answer: 'Ja. De gratis versie heeft de volledige editor, perfecte rijmen, lettergrepen per regel, notities, autosave en versiegeschiedenis. Geen proefperiode, geen tijdslimiet. Pro voegt de uitgebreide rijmfuncties en Studio toe.' },
      { id: 'oneTime', question: 'Is Pro een eenmalige aankoop of een abonnement?', answer: `Eenmalig. Je betaalt één keer ${pro} en Pro is van jou, inclusief updates. Het enige abonnement is Cloud Sync (${cloud} per maand), en dat is optioneel.` },
      { id: 'languages', question: 'Welke talen ondersteunt het?', answer: 'Engels en Nederlands. De app zelf, de rijmen en het tellen van lettergrepen werken in beide talen.' },
      { id: 'offline', question: 'Werkt het offline?', answer: 'Schrijven, opslaan en lettergrepen tellen werken zonder internet, en je liedjes staan op je eigen computer. Een paar rijmfuncties, zoals bijna-rijmen en AI-suggesties, hebben wel verbinding nodig.' },
      { id: 'licenseKey', question: 'Hoe krijg ik mijn licentiesleutel?', answer: 'Je krijgt hem direct na je aankoop per mail. Je vindt hem ook in je account op deze website. Kies in de app Upgraden naar Pro en dan “Ik heb al een licentiesleutel”.' },
      { id: 'devices', question: 'Kan ik Pro op meer dan één computer gebruiken?', answer: 'Ja, je kunt je licentie op maximaal twee apparaten activeren, bijvoorbeeld een studiocomputer en een laptop.' },
      { id: 'cloudSync', question: 'Wat is Cloud Sync?', answer: `Een optioneel abonnement van ${cloud} per maand voor een cloudbibliotheek: je liedjes staan op elke computer waarop je inlogt, en wijzigingen worden binnen enkele seconden gesynchroniseerd. Begin een lied op je studio-pc en schrijf verder op je laptop. Je hebt er een gratis account voor nodig. Het werkt met Free en Pro.` },
      { id: 'conflicts', question: 'Wat gebeurt er als ik hetzelfde lied op twee computers bewerk?', answer: 'Rhyme Helper overschrijft je werk nooit ongevraagd. Is een lied op twee plekken veranderd voordat het kon synchroniseren, dan zie je beide versies naast elkaar. Houd er één, of houd ze allebei: jouw versie wordt dan als kopie bewaard.' },
      { id: 'cloudOffline', question: 'Kan ik zonder internet schrijven als ik Cloud Sync gebruik?', answer: 'Ja. Schrijf gewoon door. Je wijzigingen worden op je computer bewaard en geüpload zodra je weer online bent, ook als je de app tussendoor herstart.' },
      { id: 'stopCloud', question: 'Wat gebeurt er met mijn liedjes als ik stop met Cloud Sync?', answer: 'Er wordt niets verwijderd. Je liedjes blijven op je computers en je kunt ze gewoon gebruiken. Je cloudbibliotheek blijft beschikbaar om op een nieuwe computer te downloaden, maar nieuwe wijzigingen worden pas weer geüpload als je opnieuw abonneert.' },
      { id: 'restore', question: 'Ik heb per ongeluk een lied verwijderd. Kan ik het terugkrijgen?', answer: 'Met Cloud Sync wel. Verwijderde liedjes blijven 30 dagen in Onlangs verwijderd. Klik in de app op de Cloud-knop in de bovenbalk en kies Onlangs verwijderd om ze terug te zetten.' },
      { id: 'smartscreen', question: 'Windows toont een blauwe SmartScreen-melding. Is dat veilig?', answer: 'Ja. Rhyme Helper is nieuw en ons code-signing-certificaat wordt nog verwerkt, dus Windows herkent de installer nog niet. Klik op “Meer informatie” en dan op “Toch uitvoeren” om te installeren.' },
      { id: 'mac', question: 'Is er een Mac-versie?', answer: 'Ja. Rhyme Helper werkt op macOS 12 en nieuwer, op Macs met Apple Silicon (M1 en nieuwer) en met een Intel-chip. Open deze site op je Mac en klik op de downloadknop. Open het .dmg-bestand en sleep Rhyme Helper naar Apps. De Mac-versie is door Apple gecontroleerd, dus hij opent zonder waarschuwing, en hij werkt zichzelf bij.' },
      { id: 'web', question: 'Werkt het in mijn browser of op mijn telefoon?', answer: 'Ja. Open app.rhymehelper.store in elke browser, ook op je telefoon of tablet. Je kunt hem daar als app op je beginscherm zetten en hij werkt ook offline. Met hetzelfde account heb je Pro overal, en met Cloud Sync staan je liedjes op al je apparaten.' },
    ];
  }
  return [
    { id: 'free', question: 'Is Rhyme Helper really free?', answer: 'Yes. The free version has the full editor, perfect rhymes, syllable counts, notes, autosave and version history. No trial, no time limit. Pro adds the deeper rhyme tools and studio workflow.' },
    { id: 'oneTime', question: 'Is Pro a one-time purchase or a subscription?', answer: `A one-time purchase. Pay ${pro} once and Pro is yours, including updates. The only subscription is Cloud Sync (${cloud} a month), and that is optional.` },
    { id: 'languages', question: 'Which languages does it support?', answer: 'English and Dutch. The app itself, the rhymes and the syllable counts work in both languages.' },
    { id: 'offline', question: 'Does it work offline?', answer: 'Writing, saving and syllable counts work without an internet connection. Your songs are saved on your own computer. Some rhyme features, like near rhymes and AI suggestions, need a connection.' },
    { id: 'licenseKey', question: 'How do I get my license key?', answer: 'You get it by email right after your purchase. You can also find it in your account on this website. In the app, choose Upgrade to Pro, then "I already have a license key".' },
    { id: 'devices', question: 'Can I use Pro on more than one computer?', answer: 'Yes, you can activate your license on up to two devices, for example a studio desktop and a laptop.' },
    { id: 'cloudSync', question: 'What is Cloud Sync?', answer: `An optional subscription of ${cloud} a month that gives you a cloud library: your songs are on every computer where you log in, and changes sync within seconds. Start a song on your studio PC and keep writing on your laptop. You need a free account for it. It works with Free and Pro.` },
    { id: 'conflicts', question: 'What happens if I edit the same song on two computers?', answer: 'Rhyme Helper never overwrites your work silently. If a song changed in two places before it could sync, the app shows both versions side by side. Keep one, or keep both: your version is then saved as a copy.' },
    { id: 'cloudOffline', question: 'Can I write without an internet connection when I use Cloud Sync?', answer: 'Yes. Keep writing as usual. Your changes are saved on your computer and uploaded as soon as you are back online, also after you restart the app.' },
    { id: 'stopCloud', question: 'What happens to my songs if I stop Cloud Sync?', answer: 'Nothing is deleted. Your songs stay on your computers and you can keep using them in the app. Your cloud library stays available to download on a new computer, but new changes are no longer uploaded until you subscribe again.' },
    { id: 'restore', question: 'I deleted a song by accident. Can I get it back?', answer: 'With Cloud Sync, yes. Deleted songs stay in Recently deleted for 30 days. In the app, click the Cloud button in the top bar and choose Recently deleted to restore them.' },
    { id: 'smartscreen', question: 'Windows shows a blue SmartScreen warning. Is that safe?', answer: 'Yes. Rhyme Helper is new and our code-signing certificate is still being processed, so Windows does not recognise the installer yet. Click "More info" and then "Run anyway" to install.' },
    { id: 'mac', question: 'Is there a Mac version?', answer: 'Yes. Rhyme Helper runs on macOS 12 and newer, on Macs with Apple Silicon (M1 and newer) and with an Intel chip. Open this site on your Mac and click the download button. Open the .dmg file and drag Rhyme Helper to Applications. The Mac version is checked by Apple, so it opens without a warning, and it updates itself.' },
    { id: 'web', question: 'Does it work in my browser or on my phone?', answer: 'Yes. Open app.rhymehelper.store in any browser, also on your phone or tablet. You can add it to your home screen as an app and it works offline too. With the same account you have Pro everywhere, and with Cloud Sync your songs are on all your devices.' },
  ];
}
