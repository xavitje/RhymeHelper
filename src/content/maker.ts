import type { Lang } from '../i18n/routes';

/**
 * Het maker-blok op de homepage. Pas de tekst gerust aan; houd hem kort en eerlijk.
 * Foto: zet een vierkant bestand (bijv. 400×400) in /public/maker.jpg en vul `photo` in ('/maker.jpg').
 * Zonder foto toont de site een avatar met je initialen.
 */
export const MAKER = {
  name: 'Rafi el Idrissi',
  initials: 'RI',
  photo: '' as string, // bijv. '/maker.jpg'
  email: 'rafi@rhymehelper.store',
};

export const MAKER_COPY: Record<Lang, { eyebrow: string; title: string; accent: string; story: string[]; role: string; cta: string }> = {
  en: {
    eyebrow: 'Who builds this',
    title: 'Made by one maker,',
    accent: 'not a company.',
    story: [
      'I’m Rafi, an independent developer from the Netherlands. Writing lyrics always meant juggling a rhyme site, a syllable counter, notes and a beat in different tabs, so I built the one window I wanted.',
      'Rhyme Helper is built and supported by me alone. I read every email and build what writers ask for.',
    ],
    role: 'Maker of Rhyme Helper',
    cta: 'Mail me directly',
  },
  nl: {
    eyebrow: 'Wie dit maakt',
    title: 'Gemaakt door één maker,',
    accent: 'geen bedrijf.',
    story: [
      'Ik ben Rafi, een onafhankelijke ontwikkelaar uit Nederland. Songteksten schrijven betekende altijd schakelen tussen een rijmsite, een lettergreepteller, notities en een beat in losse tabbladen. Dus bouwde ik het ene venster dat ik zelf wilde.',
      'Rhyme Helper wordt door mij alleen gebouwd en ondersteund. Ik lees elke mail en bouw wat schrijvers vragen.',
    ],
    role: 'Maker van Rhyme Helper',
    cta: 'Mail me direct',
  },
};
