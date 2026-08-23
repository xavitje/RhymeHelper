import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | RymeHelper</title>
        <meta name="description" content="Terms of Service and End User License Agreement for RymeHelper." />
      </Helmet>
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Terms of Service' }]} />

        <h1 className="text-4xl font-display uppercase tracking-wide mb-8 mt-6">Terms of <span className="text-primary">Service</span></h1>

        <div className="prose prose-invert max-w-none font-sans text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the RymeHelper application (the "Service") operated by RymeHelper ("us", "we", or "our").
            These Terms comply with the consumer protection laws of the European Union.
          </p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">1. License Grant</h2>
          <p>
            By purchasing RymeHelper Pro, you are granted a revocable, non-exclusive, non-transferable, limited license to download, install and use the application strictly in accordance with the terms of this Agreement. A single license key permits activation on up to two (2) devices owned by you.
          </p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">2. EU Consumer Rights & Right of Withdrawal</h2>
          <p>
            If you are a consumer residing in the European Union, you have the right to withdraw from this contract within 14 days without giving any reason. 
            However, by downloading and activating the RymeHelper Pro software via your license key, you explicitly consent to the immediate performance of the contract and acknowledge that you will lose your right of withdrawal once the digital content is accessed.
          </p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">3. Restrictions</h2>
          <p>
            You agree not to, and you will not permit others to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Application.</li>
            <li>Modify, make derivative works of, disassemble, decrypt, reverse compile or reverse engineer any part of the Application.</li>
            <li>Remove, alter or obscure any proprietary notice (including any notice of copyright or trademark) of RymeHelper.</li>
          </ul>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            The Application, including without limitation all copyrights, patents, trademarks, trade secrets and other intellectual property rights are, and shall remain, the sole and exclusive property of RymeHelper.
          </p>
          
          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">5. Disclaimer of Warranties</h2>
          <p>
            The Application is provided to you "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. Under EU law, you are entitled to statutory warranty rights in case the digital product is defective or not as described, which remain unaffected by this clause.
          </p>

          <h2 className="text-2xl font-display uppercase text-foreground mt-8 mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </div>
      </div>
    </>
  );
}
