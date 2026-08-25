"use client";
import Breadcrumbs from '../../components/Breadcrumbs';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQS = [
  {
    question: "Does RymeHelper work offline?",
    answer: "Yes, the core editor and syllable counter work entirely offline. The advanced multi-word rhyme dictionary requires an internet connection to query our extensive rhyming database."
  },
  {
    question: "Is it a one-time purchase or a subscription?",
    answer: "RymeHelper Pro is a one-time purchase. You get lifetime access to the current version, including all minor updates and bug fixes."
  },
  {
    question: "Can I use it on multiple computers?",
    answer: "Yes, your license allows you to activate RymeHelper Pro on up to two devices (e.g., a studio desktop and a writing laptop)."
  },
  {
    question: "Does it support languages other than English?",
    answer: "Currently, our advanced syllable parsing and rhyme database are optimized specifically for the English language."
  },
  {
    question: "How do I get my license key after purchasing?",
    answer: "Your license key will be emailed to you immediately after purchase. You can also view it by logging into your account on this website."
  }
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      
      <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'FAQ' }]} />

        <h1 className="text-4xl font-display uppercase tracking-wide mb-8 mt-6">Frequently Asked <span className="text-primary">Questions</span></h1>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden bg-muted/5">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-muted/10 transition-colors"
              >
                <span className="font-sans font-medium text-foreground">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 pt-2 text-muted-foreground font-sans text-sm border-t border-border/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-primary/10 border border-primary/20 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-display uppercase tracking-wide mb-4">Still have questions?</h2>
          <p className="text-muted-foreground font-sans mb-6">
            If you couldn't find the answer to your question here, feel free to reach out to our support team.
          </p>
          <a href="mailto:support@rhymehelper.store" className="inline-block px-6 py-3 border border-primary text-primary font-mono rounded-md hover:bg-primary hover:text-white transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </>
  );
}
