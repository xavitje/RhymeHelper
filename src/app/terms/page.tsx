import type { Metadata } from 'next';
import { DocHeader, Prose } from '../../components/docs/DocPage';
import { Container } from '../../components/ui';
import { LEGAL_UPDATED } from '../../content/legal';

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms for using Rhyme Helper and Rhyme Helper Pro.',
  alternates: { canonical: '/terms' },
};

export default function TermsOfService() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <DocHeader crumb="Terms of service" title="Terms of service" lead={<span className="text-sm">Last updated: {LEGAL_UPDATED}</span>} />
      <Prose>
        <p>
          Please read these Terms of Service (“Terms”) carefully before using the Rhyme Helper application (the “Service”) operated by
          Rhyme Helper (“us”, “we” or “our”). These Terms comply with the consumer protection laws of the European Union.
        </p>

        <h2>1. License grant</h2>
        <p>
          By purchasing Rhyme Helper Pro, you are granted a revocable, non-exclusive, non-transferable, limited license to download, install and
          use the application strictly in accordance with these Terms. A single license key permits activation on up to two (2) devices owned by you.
        </p>

        <h2>2. EU consumer rights and right of withdrawal</h2>
        <p>
          If you are a consumer residing in the European Union, you have the right to withdraw from this contract within 14 days without giving any reason.
          However, by downloading and activating Rhyme Helper Pro with your license key, you explicitly consent to the immediate performance of the contract
          and acknowledge that you lose your right of withdrawal once the digital content is accessed.
        </p>

        <h2>3. Cloud Sync subscription</h2>
        <p>
          Cloud Sync is an optional subscription that backs up your songs and keeps them in sync on the computers where you log in.
          It is sold separately from Pro and works with both the free version and Pro. You need an account to use it.
        </p>
        <ul>
          <li><strong>Price and renewal:</strong> the subscription costs the monthly price shown at checkout and renews automatically every month until you cancel. Payments are handled by Lemon Squeezy, our Merchant of Record.</li>
          <li><strong>Cancelling:</strong> you can cancel at any time via Manage subscription in your account. Cloud Sync keeps working until the end of the period you paid for; we do not refund partial months unless the law requires it.</li>
          <li><strong>Right of withdrawal:</strong> if you are a consumer in the European Union, you may withdraw from the subscription within 14 days of subscribing. If you asked us to start Cloud Sync right away, you may be charged for the part of the service already provided.</li>
          <li><strong>Your songs:</strong> the lyrics you sync remain yours. We store and copy them only to provide Cloud Sync, and we do not use them for anything else. Keep your own copies of important work; Cloud Sync is a convenience, not a guarantee against every possible data loss.</li>
          <li><strong>When Cloud Sync ends:</strong> your songs stay on the computers where they were synced, and you can keep using them in the app.</li>
          <li><strong>Changes in price:</strong> if we change the price, we will tell you at least 30 days in advance, and you can cancel before the new price applies.</li>
        </ul>

        <h2>4. Restrictions</h2>
        <p>You agree not to, and will not permit others to:</p>
        <ul>
          <li>License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the application.</li>
          <li>Modify, make derivative works of, disassemble, decrypt, reverse compile or reverse engineer any part of the application.</li>
          <li>Remove, alter or obscure any proprietary notice (including any notice of copyright or trademark) of Rhyme Helper.</li>
        </ul>

        <h2>5. Intellectual property</h2>
        <p>
          The application, including without limitation all copyrights, patents, trademarks, trade secrets and other intellectual property rights,
          is and shall remain the sole and exclusive property of Rhyme Helper. The lyrics you write are yours.
        </p>

        <h2>6. Disclaimer of warranties</h2>
        <p>
          The application is provided “as is” and “as available”, with all faults and defects, without warranty of any kind. Under EU law, you are
          entitled to statutory warranty rights if the digital product is defective or not as described; those rights are not affected by this clause.
        </p>

        <h2>7. Changes to these Terms</h2>
        <p>
          We may modify or replace these Terms at any time. If a change is material, we will give at least 30 days’ notice before the new terms take effect.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about these Terms, your license or your subscription? Email <a href="mailto:support@rhymehelper.store">support@rhymehelper.store</a>.
        </p>
      </Prose>
    </Container>
  );
}
