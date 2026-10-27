import type { Metadata } from 'next';
import Link from 'next/link';
import { DocHeader, Prose } from '../../../components/docs/DocPage';
import { Container } from '../../../components/ui';
import { LEGAL_UPDATED_NL } from '../../../content/legal';
import { alternates } from '../../../i18n/routes';

export const metadata: Metadata = {
  title: 'Gebruiksvoorwaarden',
  description: 'De voorwaarden voor het gebruik van Rhyme Helper en Rhyme Helper Pro.',
  alternates: alternates('terms', 'nl'),
};

export default function Voorwaarden() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <DocHeader lang="nl" crumb="Voorwaarden" title="Gebruiksvoorwaarden" lead={<span className="text-sm">Laatst bijgewerkt: {LEGAL_UPDATED_NL}</span>} />
      <Prose>
        <p>
          Lees deze gebruiksvoorwaarden (“Voorwaarden”) goed door voordat je de Rhyme Helper-app (de “Dienst”) gebruikt, die wordt aangeboden door
          Rhyme Helper (“wij” of “ons”). Deze Voorwaarden volgen het consumentenrecht van de Europese Unie.
          Dit is een vertaling van de <Link href="/terms">Engelse voorwaarden</Link>; beide versies hebben dezelfde inhoud.
        </p>

        <h2>1. Licentie</h2>
        <p>
          Als je Rhyme Helper Pro koopt, krijg je een herroepbare, niet-exclusieve, niet-overdraagbare en beperkte licentie om de app te downloaden,
          te installeren en te gebruiken, uitsluitend volgens deze Voorwaarden. Met één licentiesleutel kun je de app activeren op maximaal twee (2) apparaten die van jou zijn.
        </p>

        <h2>2. Consumentenrechten en herroepingsrecht in de EU</h2>
        <p>
          Woon je als consument in de Europese Unie, dan mag je deze overeenkomst binnen 14 dagen zonder opgave van redenen herroepen.
          Door Rhyme Helper Pro met je licentiesleutel te downloaden en te activeren, stem je er echter uitdrukkelijk mee in dat de levering direct begint,
          en erken je dat je je herroepingsrecht verliest zodra je toegang hebt tot de digitale inhoud.
        </p>

        <h2>3. Cloud Sync-abonnement</h2>
        <p>
          Cloud Sync is een optioneel abonnement dat een back-up van je liedjes maakt en ze gelijk houdt op de computers waarop je inlogt.
          Het wordt los van Pro verkocht en werkt met zowel de gratis versie als Pro. Je hebt er een account voor nodig.
        </p>
        <ul>
          <li><strong>Prijs en verlenging:</strong> het abonnement kost de maandprijs die je bij het afrekenen ziet en wordt elke maand automatisch verlengd tot je opzegt. Betalingen lopen via Lemon Squeezy, onze Merchant of Record.</li>
          <li><strong>Opzeggen:</strong> je kunt op elk moment opzeggen via Abonnement beheren in je account. Cloud Sync blijft werken tot het einde van de periode waarvoor je hebt betaald; we betalen geen gedeeltelijke maanden terug, tenzij de wet dat vereist.</li>
          <li><strong>Herroepingsrecht:</strong> ben je consument in de Europese Unie, dan mag je het abonnement binnen 14 dagen na het afsluiten herroepen. Heb je ons gevraagd Cloud Sync meteen te starten, dan kunnen we het deel van de dienst dat al geleverd is in rekening brengen.</li>
          <li><strong>Je liedjes:</strong> de teksten die je synchroniseert blijven van jou. We bewaren en kopiëren ze alleen om Cloud Sync te leveren en gebruiken ze nergens anders voor. Houd zelf kopieën van belangrijk werk; Cloud Sync is een gemak, geen garantie tegen elk denkbaar dataverlies.</li>
          <li><strong>Onlangs verwijderd:</strong> liedjes die je uit je cloudbibliotheek verwijdert, kun je 30 dagen terugzetten. Daarna worden ze definitief verwijderd.</li>
          <li><strong>Als Cloud Sync stopt:</strong> je liedjes blijven op de computers waarop ze gesynchroniseerd zijn en je kunt ze in de app blijven gebruiken. Je cloudbibliotheek blijft te downloaden zolang je een account hebt, maar nieuwe wijzigingen worden niet meer geüpload.</li>
          <li><strong>Prijswijzigingen:</strong> als we de prijs veranderen, laten we je dat minstens 30 dagen van tevoren weten, en kun je opzeggen voordat de nieuwe prijs ingaat.</li>
        </ul>

        <h2>4. Beperkingen</h2>
        <p>Je gaat ermee akkoord dat je het volgende niet doet en anderen niet toestaat:</p>
        <ul>
          <li>De app in licentie geven, verkopen, verhuren, leasen, overdragen, verspreiden, doorsturen, hosten, uitbesteden, openbaar maken of op een andere manier commercieel uitbaten.</li>
          <li>De app aanpassen, er afgeleide werken van maken, of enig deel ervan disassembleren, ontsleutelen, decompileren of reverse-engineeren.</li>
          <li>Een eigendomsvermelding van Rhyme Helper (zoals een vermelding van auteursrecht of merk) verwijderen, wijzigen of onleesbaar maken.</li>
        </ul>

        <h2>5. Intellectueel eigendom</h2>
        <p>
          De app, inclusief maar niet beperkt tot alle auteursrechten, octrooien, merken, bedrijfsgeheimen en andere intellectuele-eigendomsrechten,
          is en blijft het exclusieve eigendom van Rhyme Helper. De teksten die jij schrijft zijn van jou.
        </p>

        <h2>6. Garantie</h2>
        <p>
          De app wordt geleverd “zoals hij is” en “zoals beschikbaar”, met alle fouten en gebreken, zonder enige garantie. Volgens het EU-recht heb je
          wettelijke rechten als het digitale product gebrekkig is of niet overeenkomt met de beschrijving; die rechten worden door dit artikel niet beperkt.
        </p>

        <h2>7. Wijzigingen</h2>
        <p>
          We kunnen deze Voorwaarden op elk moment aanpassen of vervangen. Bij een belangrijke wijziging laten we het minstens 30 dagen van tevoren weten, voordat de nieuwe voorwaarden ingaan.
        </p>

        <h2>8. Contact</h2>
        <p>
          Vragen over deze Voorwaarden, je licentie of je abonnement? Mail naar <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
        </p>
      </Prose>
    </Container>
  );
}
