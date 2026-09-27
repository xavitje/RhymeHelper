import { APP_CONFIG } from '../config';

export type FaqItem = { question: string; answer: string };

/** Gedeelde FAQ-tekst (homepage toont de eerste vijf, /faq alles). */
export const FAQS: FaqItem[] = [
  {
    question: 'Is Rhyme Helper really free?',
    answer: 'Yes. The free version has the full editor, perfect rhymes, syllable counts, notes, autosave and version history. No trial, no time limit. Pro adds the deeper rhyme tools and studio workflow.',
  },
  {
    question: 'Is Pro a one-time purchase or a subscription?',
    answer: `A one-time purchase. Pay ${APP_CONFIG.SALE_PRICE} once and Pro is yours, including updates. The only subscription is Cloud Sync (${APP_CONFIG.CLOUD_SYNC_PRICE} a month), and that is optional.`,
  },
  {
    question: 'Which languages does it support?',
    answer: 'English and Dutch. The app itself, the rhymes and the syllable counts work in both languages.',
  },
  {
    question: 'Does it work offline?',
    answer: 'Writing, saving and syllable counts work without an internet connection. Your songs are saved on your own computer. Some rhyme features, like near rhymes and AI suggestions, need a connection.',
  },
  {
    question: 'How do I get my license key?',
    answer: 'You get it by email right after your purchase. You can also find it in your account on this website. In the app, choose Upgrade to Pro, then "I already have a license key".',
  },
  {
    question: 'Can I use Pro on more than one computer?',
    answer: 'Yes, you can activate your license on up to two devices, for example a studio desktop and a laptop.',
  },
  {
    question: 'What is Cloud Sync?',
    answer: `An optional subscription of ${APP_CONFIG.CLOUD_SYNC_PRICE} a month that gives you a cloud library: your songs are on every computer where you log in, and changes sync within seconds. Start a song on your studio PC and keep writing on your laptop. You need a free account for it. It works with Free and Pro.`,
  },
  {
    question: 'What happens if I edit the same song on two computers?',
    answer: 'Rhyme Helper never overwrites your work silently. If a song changed in two places before it could sync, the app shows both versions side by side. Keep one, or keep both: your version is then saved as a copy.',
  },
  {
    question: 'Can I write without an internet connection when I use Cloud Sync?',
    answer: 'Yes. Keep writing as usual. Your changes are saved on your computer and uploaded as soon as you are back online, also after you restart the app.',
  },
  {
    question: 'What happens to my songs if I stop Cloud Sync?',
    answer: 'Nothing is deleted. Your songs stay on your computers and you can keep using them in the app. Your cloud library stays available to download on a new computer, but new changes are no longer uploaded until you subscribe again.',
  },
  {
    question: 'I deleted a song by accident. Can I get it back?',
    answer: 'With Cloud Sync, yes. Deleted songs stay in Recently deleted for 30 days. In the app, click the Cloud button in the top bar and choose Recently deleted to restore them.',
  },
  {
    question: 'Windows shows a blue SmartScreen warning. Is that safe?',
    answer: 'Yes. Rhyme Helper is new and our code-signing certificate is still being processed, so Windows does not recognise the installer yet. Click "More info" and then "Run anyway" to install.',
  },
  {
    question: 'Is there a Mac version?',
    answer: 'Not yet. Rhyme Helper runs on Windows 10 and 11. Leave your email via the contact link if you want to hear when a Mac version is ready.',
  },
];
