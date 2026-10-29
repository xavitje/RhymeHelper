export const SITE = {
  name: 'Rhyme Helper',
  url: 'https://rhymehelper.store',
  tagline: 'Find the rhyme. Keep the flow.',
  description: 'The writing app for lyrics, with rhymes, syllables and your beat in one place. Free for Windows and Mac.',
  contactEmail: 'support@rhymehelper.store',
};

export const APP_CONFIG = {
  WINDOWS_DOWNLOAD_URL: '/downloads/windows',
  /** Apple Silicon (M1 en nieuwer). Intel-Macs: MAC_INTEL_DOWNLOAD_URL. */
  MAC_DOWNLOAD_URL: '/downloads/mac',
  /** De webversie (PWA): werkt in elke browser, ook op telefoons. */
  WEB_APP_URL: 'https://app.rhymehelper.store',
  MAC_INTEL_DOWNLOAD_URL: '/downloads/mac?arch=x64',
  LEMON_SQUEEZY_CHECKOUT_URL: 'https://checkout.rhymehelper.store/checkout/buy/85bfb619-30c6-4b30-89c9-14830c1ce986?embed=1',
  CLOUD_SYNC_CHECKOUT_URL: 'https://checkout.rhymehelper.store/checkout/buy/be44a7ad-1f20-47a7-a50d-142100e26651',
  CLOUD_SYNC_PRICE: '€2.99',
};

/**
 * Prijs van Pro. Alleen hier aanpassen; de hele site volgt.
 *
 * - REGULAR / LAUNCH: de prijzen zoals ze op de site staan.
 * - LAUNCH_ENDS: eerste dag van de normale prijs (YYYY-MM-DD, Nederlandse tijd). Tot die dag geldt LAUNCH.
 *   Leeg ('') = geen actie, de site toont alleen REGULAR.
 * - LAUNCH_DISCOUNT_CODE: optioneel. Een Lemon Squeezy-kortingscode die tijdens de actie automatisch in de checkout
 *   wordt ingevuld (zet de productprijs in Lemon Squeezy dan op REGULAR en geef de code dezelfde einddatum).
 *   Leeg = de checkout rekent wat in Lemon Squeezy als prijs staat; pas die prijs dan zelf aan op LAUNCH_ENDS.
 *
 * Pagina's met een prijs worden elk uur opnieuw opgebouwd (`revalidate`), dus na de einddatum wisselt de site vanzelf.
 */
export const PRO_PRICING = {
  REGULAR: '€19.99',
  LAUNCH: '€9.99',
  LAUNCH_ENDS: '2027-01-01',
  LAUNCH_DISCOUNT_CODE: '',
};

/** Seconden tussen herbouwen van pagina's met een prijs. */
export const PRICE_REVALIDATE = 3600;

export type ProPrice = {
  /** Wat Pro nu kost. */
  price: string;
  /** Normale prijs (voor doorgestreept tonen tijdens de actie). */
  regular: string;
  /** Loopt de launch-actie nog? */
  isLaunch: boolean;
  /** Laatste dag van de actie, bijv. "31 December" / "31 december". Leeg als er geen actie is. */
  lastDayEn: string;
  lastDayNl: string;
  /** Checkout-link voor Pro, met de kortingscode als die is ingesteld en de actie loopt. */
  checkoutUrl: string;
};

export function proPrice(now: Date = new Date()): ProPrice {
  const { REGULAR, LAUNCH, LAUNCH_ENDS, LAUNCH_DISCOUNT_CODE } = PRO_PRICING;
  // Middernacht in Nederland (CET in de winter; voor een zomerdatum telt het 1 uur later, wat niet uitmaakt).
  const end = LAUNCH_ENDS ? new Date(`${LAUNCH_ENDS}T00:00:00+01:00`) : null;
  const isLaunch = !!end && !Number.isNaN(end.getTime()) && now < end;
  const lastDay = end ? new Date(end.getTime() - 12 * 3600 * 1000) : null;
  const fmt = (locale: string) =>
    lastDay ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', timeZone: 'Europe/Amsterdam' }).format(lastDay) : '';
  let checkoutUrl = APP_CONFIG.LEMON_SQUEEZY_CHECKOUT_URL;
  if (isLaunch && LAUNCH_DISCOUNT_CODE) {
    checkoutUrl += `${checkoutUrl.includes('?') ? '&' : '?'}checkout[discount_code]=${encodeURIComponent(LAUNCH_DISCOUNT_CODE)}`;
  }
  return {
    price: isLaunch ? LAUNCH : REGULAR,
    regular: REGULAR,
    isLaunch,
    lastDayEn: isLaunch ? fmt('en-GB') : '',
    lastDayNl: isLaunch ? fmt('nl-NL') : '',
    checkoutUrl,
  };
}

/** Prijs in Nederlandse notatie: €9.99 → €9,99. */
export const nlPrice = (p: string) => p.replace('.', ',');

/**
 * Bedrijfsgegevens (verplicht op de website, art. 3:15d BW). Vul in zoals ingeschreven bij de KvK.
 * Lege velden worden niet getoond.
 */
export const BUSINESS = {
  legalName: 'Rafi el Idrissi',
  tradeName: 'Rhyme Helper',
  kvk: '',
  vat: '', // btw-identificatienummer, bijv. NL000000000B01
  address: '', // vestigingsadres zoals bij de KvK, bijv. 'Straat 1, 1234 AB Plaats'
};
