import type { Lang } from '../i18n/routes';

/**
 * Echte quotes van gebruikers (alleen met hun toestemming). Zolang deze lijst leeg is,
 * toont de site geen testimonials-blok. Laat `lang` weg om een quote in beide talen te tonen.
 *
 * Voorbeeld:
 * { quote: 'Ik schrijf mijn coupletten nu in de helft van de tijd.', name: 'Sanne', role: 'Rapper, Utrecht', lang: 'nl' },
 */
export type Testimonial = { quote: string; name: string; role?: string; lang?: Lang; href?: string };

export const TESTIMONIALS: Testimonial[] = [];
