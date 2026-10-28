import type { Metadata } from 'next';
import { DocHeader, Prose } from '../../components/docs/DocPage';
import { Container } from '../../components/ui';
import { LEGAL_UPDATED } from '../../content/legal';
import { alternates } from '../../i18n/routes';
import { BUSINESS } from '../../config';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Rhyme Helper collects, uses and protects your personal data.',
  alternates: alternates('privacy', 'en'),
};

export default function PrivacyPolicy() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <DocHeader lang="en" crumb="Privacy policy" title="Privacy policy" lead={<span className="text-sm">Last updated: {LEGAL_UPDATED}</span>} />
      <Prose>
        <h2>1. Who is responsible</h2>
        <p>
          Rhyme Helper is run by {BUSINESS.legalName}, an independent business in the Netherlands, trading as {BUSINESS.tradeName}
          {BUSINESS.kvk && <> (Chamber of Commerce no. {BUSINESS.kvk})</>}{BUSINESS.address && <>, {BUSINESS.address}</>}. He is responsible (“controller”) for
          the personal data described here (“we”, “us”). For privacy questions or requests, email{' '}
          <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
        </p>

        <h2>2. Data we collect</h2>
        <p>We collect and process the following categories of personal data:</p>
        <ul>
          <li><strong>Contact data:</strong> your email address when you register an account or make a purchase.</li>
          <li><strong>License data:</strong> license keys generated and linked to your account upon purchase.</li>
          <li><strong>Payment data:</strong> handled by Lemon Squeezy when you buy Pro or subscribe to Cloud Sync. We receive your email, what you bought and your subscription status, never your full card details.</li>
          <li><strong>Song data (Cloud Sync only):</strong> if you subscribe to Cloud Sync, the songs in your cloud library (titles, lyrics, tempo and key) are stored on our servers so they can be synced to your other computers. With each change we also store when it was made and the name of the computer it was made on (for example “Studio-PC”), so the app can show where a song was last edited. Without Cloud Sync, your songs stay on your own computer and we never receive them.</li>
          <li><strong>Usage data (only with your consent):</strong> how you use our website, such as the pages you visit, the site you came from, your browser and device type, and an approximate location, collected with Google Analytics. See section 7.</li>
          <li><strong>Download counts:</strong> when you download the app we count the download together with the channel in the link (for example <code>?ref=ig</code>), the website you came from and your country. We do not store your IP address and set no cookies for this.</li>
          <li id="download-link"><strong>Download link by email:</strong> if you ask us to email you the download link (for example on your phone), we store your email address, your language, the type of device (phone, Mac, other), the channel in the link and, if you tick it, that you want to hear about the Mac version. We use this only to send that one email and, if you asked, one email when the Mac version is ready.</li>
          <li><strong>Words you look up (app):</strong> when you look up rhymes, near rhymes or synonyms, the app sends that word or short phrase to Datamuse, a free word database in the United States. As with any internet request, Datamuse sees your IP address. For AI rhymes (Pro), the word goes through our server to OpenAI, which receives only the word. We never send your lyrics.</li>
          <li><strong>Downloads and updates:</strong> the installer and app updates are downloaded from GitHub, which receives your IP address as with any download.</li>
          <li><strong>App usage (only with your consent):</strong> if you turn on Share anonymous usage in the app, it sends once a day a random installation ID, the app version, the app language and whether Pro is active. This is not linked to your account and never includes your lyrics. You can turn it off at any time in Settings → Account.</li>
        </ul>

        <h2>3. How we use data, and on what legal grounds</h2>
        <p>We process your personal data for specific purposes under the following legal bases defined by the GDPR:</p>
        <ul>
          <li><strong>Contractual necessity:</strong> processing your email and license key to deliver the software, authenticate your Pro access and provide customer support, and storing and syncing your songs when you subscribe to Cloud Sync.</li>
          <li><strong>Consent:</strong> using Google Analytics on our website to understand how visitors find and use it. You can withdraw your consent at any time.</li>
          <li><strong>Consent:</strong> the anonymous daily usage signal from the app, if you turn it on.</li>
          <li><strong>Your request:</strong> sending you the download link you asked for, and the one Mac email if you ticked that box.</li>
          <li><strong>Legitimate interest:</strong> counting downloads per channel, so we know which places help people find Rhyme Helper. We keep this to the minimum described above.</li>
          <li><strong>Legal obligation:</strong> retaining necessary transaction records to comply with tax and accounting laws.</li>
        </ul>

        <h2>4. Sharing and transfers</h2>
        <p>We do not sell your personal data. We share data only with trusted third-party processors necessary to provide our services:</p>
        <ul>
          <li><strong>Lemon Squeezy:</strong> acts as our Merchant of Record. They process your payments and handle billing information. Data sent to Lemon Squeezy is subject to their privacy policy. If you allow it in the cookie message, Lemon Squeezy&apos;s referral tracking also runs on our website. See section 7.</li>
          <li><strong>Supabase:</strong> provides our backend database and authentication infrastructure. Account data, and your synced songs if you use Cloud Sync, are stored on their servers in the EU (Ireland).</li>
          <li><strong>Vercel:</strong> hosts our website.</li>
          <li><strong>Zoho (Zoho Mail):</strong> sends the download-link email from our mail server in the EU.</li>
          <li><strong>Google (Google Analytics):</strong> measures website visits, only if you allow it.</li>
          <li><strong>Datamuse:</strong> provides the rhyme and synonym lists in the app. Receives the word you look up and your IP address.</li>
          <li><strong>OpenAI:</strong> generates AI rhymes (Pro) through our server. Receives only the word you look up, never your lyrics or account details.</li>
          <li><strong>GitHub:</strong> hosts the installer and app updates.</li>
        </ul>
        <p>
          Some of these processors may transfer data outside the European Economic Area (EEA). When this happens, we make sure they rely on
          approved transfer mechanisms, such as Standard Contractual Clauses (SCCs) or Data Privacy Frameworks.
        </p>

        <h2>5. How long we keep data</h2>
        <p>We store your data only for as long as necessary to fulfil the purposes above:</p>
        <ul>
          <li><strong>Account data (email, license):</strong> kept for the lifetime of your account, so you keep access to the software you bought. If you ask us to delete your account, this data is removed within 30 days.</li>
          <li><strong>Synced songs (Cloud Sync):</strong> kept for as long as you have an account, so you can get them back on a new computer, also after your subscription ends. A song you delete goes to Recently deleted and is removed for good after 30 days, or right away if you choose Delete forever. When you delete your account, your synced songs are deleted within 30 days.</li>
          <li><strong>Transaction records:</strong> kept for up to 7 years, as required by tax regulations.</li>
          <li><strong>Analytics data, download counts and app usage signals:</strong> deleted after 14 months.</li>
          <li><strong>Download-link requests:</strong> deleted after 30 days. If you asked to hear about the Mac version, we keep your address until we have sent that email, or until you ask us to delete it.</li>
        </ul>

        <h2>6. Your rights under the GDPR</h2>
        <p>
          You have the right to access, correct or erase your personal data. You may also object to processing or ask for data portability.
          To use any of these rights, contact us at <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
          You can also delete your account yourself under Account settings.
        </p>
        <p>
          If you think we handle your data incorrectly, please tell us first. You also have the right to file a complaint with the Dutch Data Protection Authority
          (<a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener">Autoriteit Persoonsgegevens</a>).
        </p>

        <h2 id="analytics">7. Analytics and cookies</h2>
        <p>
          Our website uses Google Analytics 4 only after you click Allow in the cookie message. Google Analytics then places cookies
          (starting with <code>_ga</code>) to recognise returning visitors and measures which pages are visited. Google does not store full IP addresses
          in Google Analytics 4. We use this data only to improve our website and do not combine it with your account.
        </p>
        <p>
          If you choose No thanks, Google Analytics is not loaded and no analytics cookies are set. You can change your choice at any time with
          Cookie settings at the bottom of every page; if you withdraw consent, we stop measuring and remove the analytics cookies.
          Analytics data is kept for 14 months.
        </p>
        <p>
          <strong>Referral tracking (affiliates).</strong> Some creators recommend Rhyme Helper with a referral link (a link with <code>?aff=</code>). If you click Allow,
          we also load Lemon Squeezy&apos;s referral script. When you arrive through such a link, it places a cookie (<code>ls_aff_ref</code>) and uses technical
          details of your browser to recognise the visit, so that the creator gets credit if you buy Pro later. It does not tell us who you are. If you choose No thanks
          or withdraw your consent, the script is not loaded and we remove the cookie.
        </p>
        <p>
          We also use strictly necessary storage in your browser, for example to keep you logged in and to remember your cookie choice. This does not need consent.
        </p>

        <h2 id="age">8. Age</h2>
        <p>
          Rhyme Helper is meant for people aged 16 and over. Are you younger than 16? Then you need permission from a parent or guardian to create an account,
          buy Pro or Cloud Sync, or turn on anonymous usage sharing in the app. If we learn that we hold data of someone under 16 without that permission,
          we delete it. Writing in the app without an account is fine at any age; your songs then stay on your own computer.
        </p>
      </Prose>
    </Container>
  );
}
