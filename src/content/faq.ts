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
    answer: `An optional subscription of ${APP_CONFIG.CLOUD_SYNC_PRICE} a month that backs up your songs and keeps them in sync on every computer you write on. You need a free account for it. It works with Free and Pro.`,
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
