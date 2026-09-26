import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FAQS } from '../../content/faq';
import { SITE } from '../../config';
import { DocHeader } from '../../components/docs/DocPage';
import { FaqList } from '../../components/home/FaqList';
import { ButtonLink, Container } from '../../components/ui';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about Rhyme Helper: price, Pro, license keys, languages, offline use, Cloud Sync and installing on Windows.',
  alternates: { canonical: '/faq' },
};

// Gestructureerde data voor zoekmachines (FAQPage).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

export default function Faq() {
  return (
    <Container narrow className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <DocHeader
        crumb="FAQ"
        title={<>Questions, <span className="text-text-muted">answered.</span></>}
        lead={<>The short answers. For how-tos, see the <Link href="/resources" className="text-text underline-offset-4 hover:underline">docs</Link>.</>}
      />
      <FaqList items={FAQS} className="mt-10" />
      <div className="mt-10 flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Didn’t find your answer?</h2>
          <p className="mt-1 text-[15px] text-text-muted">Mail us and we’ll get back to you.</p>
        </div>
        <ButtonLink href={`mailto:${SITE.contactEmail}`} variant="secondary" icon={Mail}>Email us</ButtonLink>
      </div>
    </Container>
  );
}
