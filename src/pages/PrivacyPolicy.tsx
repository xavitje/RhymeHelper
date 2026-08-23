import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | RymeHelper</title>
        <meta name="description" content="Privacy Policy and GDPR compliance information for RymeHelper." />
      </Helmet>
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />

        <h1 className="text-4xl font-display uppercase tracking-wide mb-8 mt-6">Privacy <span className="text-primary">Policy</span></h1>

        <div className="prose prose-invert max-w-none font-sans text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">1. Identity Details</h2>
          <p>
            RymeHelper ("we", "us", or "our") operates the rhymehelper.store website and the RymeHelper desktop application. 
            For any privacy-related inquiries, data requests, or concerns, you can contact our Data Protection Officer (DPO) at:
            <br /><strong>Email:</strong> support@rhymehelper.store
          </p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">2. Data Types Collected</h2>
          <p>
            We collect and process the following categories of personal data:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contact Data:</strong> Your email address when you register an account or make a purchase.</li>
            <li><strong>License Data:</strong> License keys generated and linked to your account upon purchase.</li>
            <li><strong>Usage Data:</strong> Basic application interaction metrics (IP address, browser type) collected via Google Analytics on our website.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">3. Data Uses & Legal Grounds</h2>
          <p>
            We process your personal data for specific purposes under the following legal bases defined by the GDPR:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contractual Necessity:</strong> Processing your email and license key to deliver the software, authenticate your Pro access, and provide customer support.</li>
            <li><strong>Legitimate Interests:</strong> Using anonymous analytics data to understand website traffic and improve our marketing.</li>
            <li><strong>Legal Obligation:</strong> Retaining necessary transaction records to comply with tax and accounting laws.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">4. Sharing and Transfers</h2>
          <p>
            We do not sell your personal data. We share data only with trusted third-party processors necessary to provide our services:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Lemon Squeezy:</strong> Acts as our Merchant of Record. They process your payments and handle billing information. Data sent to Lemon Squeezy is subject to their privacy policy.</li>
            <li><strong>Supabase:</strong> Provides our backend database and authentication infrastructure. Account data is stored securely on their servers.</li>
            <li><strong>Vercel / Netlify:</strong> Hosts our website infrastructure.</li>
          </ul>
          <p>
            Some of these third-party processors may transfer data outside of the European Economic Area (EEA). When this occurs, we ensure they rely on approved data transfer mechanisms, such as Standard Contractual Clauses (SCCs) or Data Privacy Frameworks.
          </p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">5. Retention Limits</h2>
          <p>
            We store your data only for as long as necessary to fulfill the purposes outlined above:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account Data (Email, License):</strong> Retained for the lifetime of your account to ensure continued access to your purchased software. If you request account deletion, this data is removed within 30 days.</li>
            <li><strong>Transaction Records:</strong> Retained for up to 7 years as required by international tax regulations.</li>
            <li><strong>Analytics Data:</strong> Automatically anonymized or deleted after 14-26 months depending on platform settings.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">6. Your GDPR Rights</h2>
          <p>
            Under the GDPR, you have the right to access, rectify, or erase your personal data. You may also object to processing or request data portability. To exercise any of these rights, please contact us at support@rhymehelper.store.
          </p>
        </div>
      </div>
    </>
  );
}
