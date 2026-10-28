import type { Metadata } from 'next';
import Link from 'next/link';
import { DocHeader, Prose } from '../../../components/docs/DocPage';
import { Container } from '../../../components/ui';
import { LEGAL_UPDATED_NL } from '../../../content/legal';
import { alternates } from '../../../i18n/routes';
import { BUSINESS } from '../../../config';

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description: 'Hoe Rhyme Helper je persoonsgegevens verzamelt, gebruikt en beschermt.',
  alternates: alternates('privacy', 'nl'),
};

export default function Privacyverklaring() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <DocHeader lang="nl" crumb="Privacyverklaring" title="Privacyverklaring" lead={<span className="text-sm">Laatst bijgewerkt: {LEGAL_UPDATED_NL}</span>} />
      <Prose>
        <p>Dit is een vertaling van de <Link href="/privacy">Engelse privacyverklaring</Link>; beide versies hebben dezelfde inhoud.</p>

        <h2>1. Wie is verantwoordelijk</h2>
        <p>
          Rhyme Helper is een onderneming van {BUSINESS.legalName} in Nederland, met de handelsnaam {BUSINESS.tradeName}
          {BUSINESS.kvk && <> (KvK-nummer {BUSINESS.kvk})</>}{BUSINESS.address && <>, {BUSINESS.address}</>}. Hij is verantwoordelijk (“verwerkingsverantwoordelijke”)
          voor de persoonsgegevens in deze verklaring (“wij” of “ons”). Voor vragen of verzoeken over privacy mail je naar{' '}
          <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
        </p>

        <h2>2. Welke gegevens we verzamelen</h2>
        <p>We verzamelen en verwerken de volgende soorten persoonsgegevens:</p>
        <ul>
          <li><strong>Contactgegevens:</strong> je e-mailadres als je een account aanmaakt of iets koopt.</li>
          <li><strong>Licentiegegevens:</strong> de licentiesleutels die bij je aankoop worden aangemaakt en aan je account gekoppeld.</li>
          <li><strong>Betaalgegevens:</strong> verwerkt door Lemon Squeezy als je Pro koopt of Cloud Sync afsluit. Wij krijgen je e-mailadres, wat je kocht en de status van je abonnement, nooit je volledige kaartgegevens.</li>
          <li><strong>Liedgegevens (alleen Cloud Sync):</strong> als je Cloud Sync gebruikt, worden de liedjes in je cloudbibliotheek (titels, teksten, tempo en toonsoort) op onze servers bewaard, zodat ze naar je andere computers kunnen synchroniseren. Bij elke wijziging bewaren we ook wanneer die is gedaan en de naam van de computer waarop dat gebeurde (bijvoorbeeld “Studio-PC”), zodat de app kan laten zien waar een lied het laatst is bewerkt. Zonder Cloud Sync blijven je liedjes op je eigen computer en krijgen wij ze nooit.</li>
          <li><strong>Gebruiksgegevens (alleen met je toestemming):</strong> hoe je onze website gebruikt, zoals de pagina’s die je bezoekt, de site waar je vandaan kwam, je browser en type apparaat en een globale locatie, verzameld met Google Analytics. Zie artikel 7.</li>
          <li><strong>Aantal downloads:</strong> als je de app downloadt, tellen we die download samen met het kanaal in de link (bijvoorbeeld <code>?ref=ig</code>), de website waar je vandaan kwam en je land. We bewaren je IP-adres niet en zetten hiervoor geen cookies.</li>
          <li id="download-link"><strong>Downloadlink per mail:</strong> als je ons vraagt je de downloadlink te mailen (bijvoorbeeld op je telefoon), bewaren we je e-mailadres, je taal, het type apparaat (telefoon, Mac, anders), het kanaal in de link en, als je dat aanvinkt, dat je wilt horen wanneer de Mac-versie er is. We gebruiken dit alleen om die ene mail te sturen en, als je daarom vroeg, één mail wanneer de Mac-versie klaar is.</li>
          <li><strong>Woorden die je opzoekt (app):</strong> als je rijmen, bijna-rijmen of synoniemen opzoekt, stuurt de app dat woord of korte zinsdeel naar Datamuse, een gratis woordendatabase in de Verenigde Staten. Zoals bij elk internetverzoek ziet Datamuse daarbij je IP-adres. Voor AI-rijmen (Pro) gaat het woord via onze server naar OpenAI, dat alleen het woord ontvangt. Je teksten sturen we nooit mee.</li>
          <li><strong>Downloads en updates:</strong> de installer en app-updates worden gedownload van GitHub, dat zoals bij elke download je IP-adres ontvangt.</li>
          <li><strong>App-gebruik (alleen met je toestemming):</strong> als je in de app Anoniem gebruik delen aanzet, stuurt die één keer per dag een willekeurige installatie-ID, de appversie, de taal van de app en of Pro actief is. Dit is niet aan je account gekoppeld en bevat nooit je teksten. Je kunt het altijd uitzetten via Instellingen → Account.</li>
        </ul>

        <h2>3. Waarvoor we gegevens gebruiken, en op welke grondslag</h2>
        <p>We verwerken je persoonsgegevens voor bepaalde doelen, op de volgende grondslagen uit de AVG:</p>
        <ul>
          <li><strong>Uitvoering van de overeenkomst:</strong> je e-mailadres en licentiesleutel gebruiken om de software te leveren, je Pro-toegang te controleren en je te helpen, en je liedjes bewaren en synchroniseren als je Cloud Sync gebruikt.</li>
          <li><strong>Toestemming:</strong> Google Analytics op onze website, om te begrijpen hoe bezoekers de site vinden en gebruiken. Je kunt je toestemming altijd intrekken.</li>
          <li><strong>Toestemming:</strong> het anonieme dagelijkse gebruikssignaal van de app, als je dat aanzet.</li>
          <li><strong>Jouw verzoek:</strong> je de downloadlink sturen waar je om vroeg, en de ene Mac-mail als je dat hebt aangevinkt.</li>
          <li><strong>Gerechtvaardigd belang:</strong> downloads per kanaal tellen, zodat we weten via welke plekken mensen Rhyme Helper vinden. We houden dit bij het minimum dat hierboven staat.</li>
          <li><strong>Wettelijke plicht:</strong> de nodige transactiegegevens bewaren om aan belasting- en boekhoudregels te voldoen.</li>
        </ul>

        <h2>4. Delen en doorgifte</h2>
        <p>We verkopen je persoonsgegevens niet. We delen gegevens alleen met betrouwbare verwerkers die nodig zijn om onze diensten te leveren:</p>
        <ul>
          <li><strong>Lemon Squeezy:</strong> onze Merchant of Record. Zij verwerken je betalingen en factuurgegevens. Gegevens die naar Lemon Squeezy gaan vallen onder hun privacybeleid. Als je dat in de cookiemelding toestaat, draait ook de affiliate-tracking van Lemon Squeezy op onze website. Zie artikel 7.</li>
          <li><strong>Supabase:</strong> levert onze database en inlogsysteem. Accountgegevens, en je gesynchroniseerde liedjes als je Cloud Sync gebruikt, worden bewaard op hun servers in de EU (Ierland).</li>
          <li><strong>Vercel:</strong> host onze website.</li>
          <li><strong>Zoho (Zoho Mail):</strong> verstuurt de mail met de downloadlink vanaf onze mailserver in de EU.</li>
          <li><strong>Google (Google Analytics):</strong> meet websitebezoek, alleen als je dat toestaat.</li>
          <li><strong>Datamuse:</strong> levert de rijm- en synoniemenlijsten in de app. Ontvangt het woord dat je opzoekt en je IP-adres.</li>
          <li><strong>OpenAI:</strong> maakt AI-rijmen (Pro) via onze server. Ontvangt alleen het woord dat je opzoekt, nooit je teksten of accountgegevens.</li>
          <li><strong>GitHub:</strong> host de installer en de app-updates.</li>
        </ul>
        <p>
          Sommige van deze verwerkers kunnen gegevens buiten de Europese Economische Ruimte (EER) doorgeven. Als dat gebeurt, zorgen we dat ze
          goedgekeurde doorgiftemechanismen gebruiken, zoals modelcontractbepalingen (SCC’s) of een Data Privacy Framework.
        </p>

        <h2>5. Hoe lang we gegevens bewaren</h2>
        <p>We bewaren je gegevens alleen zo lang als nodig is voor de doelen hierboven:</p>
        <ul>
          <li><strong>Accountgegevens (e-mail, licentie):</strong> zolang je account bestaat, zodat je toegang houdt tot de software die je kocht. Vraag je ons je account te verwijderen, dan worden deze gegevens binnen 30 dagen verwijderd.</li>
          <li><strong>Gesynchroniseerde liedjes (Cloud Sync):</strong> zolang je een account hebt, zodat je ze op een nieuwe computer terug kunt halen, ook als je abonnement is gestopt. Een lied dat je verwijdert gaat naar Onlangs verwijderd en wordt na 30 dagen definitief verwijderd, of meteen als je Definitief verwijderen kiest. Verwijder je je account, dan worden je gesynchroniseerde liedjes binnen 30 dagen verwijderd.</li>
          <li><strong>Transactiegegevens:</strong> maximaal 7 jaar, zoals de belastingregels vereisen.</li>
          <li><strong>Analysegegevens, downloadtellingen en gebruikssignalen van de app:</strong> verwijderd na 14 maanden.</li>
          <li><strong>Verzoeken om een downloadlink:</strong> verwijderd na 30 dagen. Wilde je horen over de Mac-versie, dan bewaren we je adres tot we die mail hebben gestuurd, of tot je ons vraagt het te verwijderen.</li>
        </ul>

        <h2>6. Je rechten onder de AVG</h2>
        <p>
          Je hebt het recht om je persoonsgegevens in te zien, te laten corrigeren of te laten verwijderen. Je kunt ook bezwaar maken tegen de verwerking of om overdraagbaarheid vragen.
          Wil je een van deze rechten gebruiken, mail dan naar <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
          Je kunt je account ook zelf verwijderen in je accountinstellingen.
        </p>
        <p>
          Denk je dat we niet goed met je gegevens omgaan, laat het ons dan eerst weten. Je hebt ook het recht om een klacht in te dienen bij de
          <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener">Autoriteit Persoonsgegevens</a>.
        </p>

        <h2 id="analytics">7. Statistieken en cookies</h2>
        <p>
          Onze website gebruikt Google Analytics 4 alleen nadat je in de cookiemelding op Toestaan klikt. Google Analytics plaatst dan cookies
          (die beginnen met <code>_ga</code>) om terugkerende bezoekers te herkennen en meet welke pagina’s worden bezocht. Google bewaart in Google Analytics 4 geen volledige IP-adressen.
          We gebruiken deze gegevens alleen om onze website te verbeteren en koppelen ze niet aan je account.
        </p>
        <p>
          Kies je Nee, dank je, dan wordt Google Analytics niet geladen en worden er geen analysecookies gezet. Je kunt je keuze altijd wijzigen via
          Cookie-instellingen onderaan elke pagina; trek je je toestemming in, dan stoppen we met meten en verwijderen we de analysecookies.
          Analysegegevens worden 14 maanden bewaard.
        </p>
        <p>
          <strong>Affiliate-tracking.</strong> Sommige makers raden Rhyme Helper aan met een affiliatelink (een link met <code>?aff=</code>). Als je op Toestaan klikt,
          laden we ook het affiliatescript van Lemon Squeezy. Kom je via zo’n link binnen, dan plaatst het een cookie (<code>ls_aff_ref</code>) en gebruikt het technische
          gegevens van je browser om het bezoek te herkennen, zodat de maker de beloning krijgt als je later Pro koopt. Het vertelt ons niet wie je bent. Kies je Nee, dank je,
          of trek je je toestemming in, dan wordt het script niet geladen en verwijderen we de cookie.
        </p>
        <p>
          We gebruiken ook strikt noodzakelijke opslag in je browser, bijvoorbeeld om je ingelogd te houden en je cookiekeuze te onthouden. Daarvoor is geen toestemming nodig.
        </p>

        <h2 id="leeftijd">8. Leeftijd</h2>
        <p>
          Rhyme Helper is bedoeld voor mensen van 16 jaar en ouder. Ben je jonger dan 16? Dan heb je toestemming van een ouder of voogd nodig om een account
          te maken, Pro of Cloud Sync te kopen of in de app anoniem gebruik delen aan te zetten. Merken we dat we zonder die toestemming gegevens hebben van
          iemand onder de 16, dan verwijderen we die. Schrijven in de app zonder account kan op elke leeftijd; je liedjes blijven dan op je eigen computer.
        </p>
      </Prose>
    </Container>
  );
}
