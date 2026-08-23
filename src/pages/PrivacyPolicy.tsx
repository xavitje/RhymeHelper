import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | RymeHelper</title>
        <meta name="description" content="Privacy Policy and terms for using RymeHelper." />
      </Helmet>
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />
        
        <h1 className="text-4xl font-display uppercase tracking-wide mb-8 mt-6">Privacy <span className="text-primary">Policy</span></h1>
        
        <div className="prose prose-invert max-w-none font-sans text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you use RymeHelper, we collect the email address you provide during registration and the license key generated upon purchase. We do not store or process your payment information directly; all payments are handled securely through Lemon Squeezy.
          </p>
          
          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use your email address to send you your license key, provide customer support, and communicate important updates about the software. Your license key is used solely to authenticate your access to the Pro features of the desktop application.
          </p>
          
          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information. Your account data is securely stored using Supabase, which provides robust encryption and security protocols.
          </p>
          
          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">4. Third-Party Services</h2>
          <p>
            We use Lemon Squeezy as our merchant of record for processing payments and issuing licenses. We use Supabase for database and authentication services. Please refer to their respective privacy policies for more information on how they handle your data.
          </p>
          
          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@rhymehelper.store.
          </p>
        </div>
      </div>
    </>
  );
}
