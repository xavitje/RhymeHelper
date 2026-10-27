import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { getFaqs } from '../content/faq';
import { SITE } from '../config';
import { DocHeader } from '../components/docs/DocPage';
import { FaqList } from '../components/home/FaqList';
import { ButtonLink, Container } from '../components/ui';
import type { Lang } from '../i18n/routes';
import { alternates, href } from '../i18n/routes';

const T = {
  en: {
    metaDesc: 'Answers about Rhyme Helper: price, Pro, license keys, languages, offline use, Cloud Sync and installing on Windows.',
    title: 'Questions,', accent: 'answered.', leadA: 'The short answers. For how-tos, see the', docs: 'docs',
    none: 'Didn’t find your answer?', mail: 'Mail us and we’ll get back to you.', email: 'Email us',
  },
  nl: {
    metaDesc: 'Antwoorden over Rhyme Helper: prijs, Pro, licentiesleutels, talen, offline gebruik, Cloud Sync en installeren op Windows.',
    title: 'Vragen,', accent: 'beantwoord.', leadA: 'De korte antwoorden. Voor uitleg over de app, zie de', docs: 'handleiding',
    none: 'Staat je vraag er niet bij?', mail: 'Mail ons, dan krijg je snel antwoord.', email: 'Mail ons',
  },
} as const;

export function faqMetadata(lang: Lang): Metadata {
  return { title: lang === 'nl' ? 'Veelgestelde vragen' : 'FAQ', description: T[lang].metaDesc, alternates: alternates('faq', lang) };
}

export function FaqView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const faqs = getFaqs(lang);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
  return (
    <Container narrow className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <DocHeader
        lang={lang}
        crumb="FAQ"
        title={<>{t.title} <span className="text-text-muted">{t.accent}</span></>}
        lead={<>{t.leadA} <Link href={href(lang, 'docs')} className="text-text underline decoration-text-faint underline-offset-4 hover:decoration-text">{t.docs}</Link>.</>}
      />
      <FaqList items={faqs} headingLevel={2} className="mt-10" />
      <div className="mt-10 flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t.none}</h2>
          <p className="mt-1 text-[15px] text-text-muted">{t.mail}</p>
        </div>
        <ButtonLink href={`mailto:${SITE.contactEmail}`} variant="secondary" icon={Mail}>{t.email}</ButtonLink>
      </div>
    </Container>
  );
}
