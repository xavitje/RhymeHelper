import type { Metadata } from 'next';
import { DocHeader, Prose } from '../../components/docs/DocPage';
import { Container } from '../../components/ui';
import { LEGAL_UPDATED } from '../../content/legal';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Rhyme Helper collects, uses and protects your personal data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicy() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <DocHeader crumb="Privacy policy" title="Privacy policy" lead={<span className="text-sm">Last updated: {LEGAL_UPDATED}</span>} />
      <Prose>
        <h2>1. Identity details</h2>
        <p>
          Rhyme Helper (“we”, “us” or “our”) operates the rhymehelper.store website and the Rhyme Helper desktop application.
          For any privacy-related questions, data requests or concerns, you can contact our Data Protection Officer (DPO) at{' '}
          <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
        </p>

        <h2>2. Data we collect</h2>
        <p>We collect and process the following categories of personal data:</p>
        <ul>
          <li><strong>Contact data:</strong> your email address when you register an account or make a purchase.</li>
          <li><strong>License data:</strong> license keys generated and linked to your account upon purchase.</li>
          <li><strong>Payment data:</strong> handled by Lemon Squeezy when you buy Pro or subscribe to Cloud Sync. We receive your email, what you bought and your subscription status, never your full card details.</li>
          <li><strong>Song data (Cloud Sync only):</strong> if you subscribe to Cloud Sync, the songs you sync (such as titles and lyrics) are stored on our servers so they can be backed up and synced to your other computers. Without Cloud Sync, your songs stay on your own computer and we never receive them.</li>
          <li><strong>Usage data (only with your consent):</strong> how you use our website, such as the pages you visit, the site you came from, your browser and device type, and an approximate location, collected with Google Analytics. See section 7.</li>
        </ul>

        <h2>3. How we use data, and on what legal grounds</h2>
        <p>We process your personal data for specific purposes under the following legal bases defined by the GDPR:</p>
        <ul>
          <li><strong>Contractual necessity:</strong> processing your email and license key to deliver the software, authenticate your Pro access and provide customer support, and storing and syncing your songs when you subscribe to Cloud Sync.</li>
          <li><strong>Consent:</strong> using Google Analytics on our website to understand how visitors find and use it. You can withdraw your consent at any time.</li>
          <li><strong>Legal obligation:</strong> retaining necessary transaction records to comply with tax and accounting laws.</li>
        </ul>

        <h2>4. Sharing and transfers</h2>
        <p>We do not sell your personal data. We share data only with trusted third-party processors necessary to provide our services:</p>
        <ul>
          <li><strong>Lemon Squeezy:</strong> acts as our Merchant of Record. They process your payments and handle billing information. Data sent to Lemon Squeezy is subject to their privacy policy.</li>
          <li><strong>Supabase:</strong> provides our backend database and authentication infrastructure. Account data, and your synced songs if you use Cloud Sync, are stored securely on their servers.</li>
          <li><strong>Vercel:</strong> hosts our website.</li>
          <li><strong>Google (Google Analytics):</strong> measures website visits, only if you allow it.</li>
        </ul>
        <p>
          Some of these processors may transfer data outside the European Economic Area (EEA). When this happens, we make sure they rely on
          approved transfer mechanisms, such as Standard Contractual Clauses (SCCs) or Data Privacy Frameworks.
        </p>

        <h2>5. How long we keep data</h2>
        <p>We store your data only for as long as necessary to fulfil the purposes above:</p>
        <ul>
          <li><strong>Account data (email, license):</strong> kept for the lifetime of your account, so you keep access to the software you bought. If you ask us to delete your account, this data is removed within 30 days.</li>
          <li><strong>Synced songs (Cloud Sync):</strong> kept for as long as you have an account, so you can get them back on a new computer. When you delete your account, your synced songs are deleted within 30 days.</li>
          <li><strong>Transaction records:</strong> kept for up to 7 years, as required by tax regulations.</li>
          <li><strong>Analytics data:</strong> deleted after 14 months.</li>
        </ul>

        <h2>6. Your rights under the GDPR</h2>
        <p>
          You have the right to access, correct or erase your personal data. You may also object to processing or ask for data portability.
          To use any of these rights, contact us at <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
          You can also delete your account yourself under Account settings.
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
          We also use strictly necessary storage in your browser, for example to keep you logged in and to remember your cookie choice. This does not need consent.
        </p>
      </Prose>
    </Container>
  );
}
