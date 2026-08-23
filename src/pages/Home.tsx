import { motion } from 'framer-motion';
import { Download, Zap, PenTool, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

const FAQS = [
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>RymeHelper | The Distraction-Free Writer's Notepad</title>
        <meta name="description" content="A specialized writing environment built specifically for rappers, lyricists, and poets. Write without noise, map complex rhyme schemes." />
      </Helmet>

      <div className="pt-24 pb-16">
        {/* Hero Section (CTA Above the Fold) */}
        <section className="relative max-w-7xl mx-auto px-6 pt-12 lg:pt-24 pb-20 flex flex-col items-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tight text-foreground leading-[0.9]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Never Break <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Your Flow.</span>
          </motion.h1>

          <motion.p
            className="mt-8 text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A specialized, distraction-free writing environment built specifically for rappers, lyricists, and poets.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/pricing" className="group relative px-8 py-4 bg-primary text-white font-mono text-lg rounded-md hover:bg-primary/90 transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Get RymeHelper
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
            <a href="#features" className="px-8 py-4 border border-border text-foreground font-mono text-lg rounded-md hover:bg-muted hover:border-muted-foreground transition-all flex items-center gap-3">
              Explore Features
            </a>
          </motion.div>
          <div className="mt-8 text-sm text-muted-foreground font-sans">
            Available for Windows and macOS. <Link to="/pricing" className="text-primary hover:underline">View Pricing options.</Link>
          </div>
        </section>

        {/* Interface Showcase */}
        <section className="relative w-full max-w-[1400px] mx-auto px-6 mb-32 z-10">
          <motion.div
            className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-[#121212] p-2 aspect-[16/9] flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            {/* Main Editor Area */}
            <div className="w-full h-full border border-border/30 rounded-lg overflow-hidden flex bg-[#161616] relative shadow-inner">
              <div className="flex-1 p-6 md:p-12 text-muted-foreground font-sans text-lg md:text-2xl leading-relaxed">
                <div className="flex items-center gap-6 mb-6">
                  <span className="font-mono text-sm text-border">1</span>
                  <p>Lock into the studio and never break your flow,</p>
                  <span className="ml-auto font-mono text-sm bg-muted/30 px-3 py-1 rounded-full text-primary/70 hidden sm:block">13</span>
                </div>
                <div className="flex items-center gap-6 mb-6 relative">
                  <span className="font-mono text-sm text-border">5</span>
                  <p>The sharpest writer's notepad that the booth has ever <span className="bg-primary text-white px-1">seen.</span></p>
                  <span className="ml-auto font-mono text-sm bg-muted/30 px-3 py-1 rounded-full text-primary/70 hidden sm:block">15</span>
                </div>
              </div>

              {/* Sidebar Rhyme Dictionary */}
              <div className="w-[300px] border-l border-border/30 bg-[#121212] p-6 hidden md:block">
                <div className="text-xl font-sans mb-6 text-foreground">Words for "seen"</div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="border border-[#22c55e] text-[#22c55e] rounded-full px-3 py-1 text-sm">keen</span>
                  <span className="border border-[#22c55e] text-[#22c55e] rounded-full px-3 py-1 text-sm">mean</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Marquee Strip */}
        <div className="w-full bg-primary/5 border-y border-primary/20 py-4 overflow-hidden mb-32 flex whitespace-nowrap">
          <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-12 text-primary font-mono text-xl tracking-widest uppercase opacity-80">
            <span>Bars</span> <span>•</span> <span>Flow</span> <span>•</span> <span>Syllables</span> <span>•</span> <span>Multi-rhymes</span> <span>•</span>
            <span>Bars</span> <span>•</span> <span>Flow</span> <span>•</span> <span>Syllables</span> <span>•</span> <span>Multi-rhymes</span> <span>•</span>
          </div>
        </div>

        {/* Features */}
        <section id="features" className="max-w-7xl mx-auto px-6 mb-32 scroll-mt-24">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-foreground">The Studio <span className="text-primary">Setup</span></h2>
            <p className="mt-6 text-xl text-muted-foreground font-sans max-w-2xl">Everything you need to map out complex schemes and reorganize your bars.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/10 border border-border p-8 md:p-12 group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display uppercase tracking-wide mb-4 text-foreground">Rich Text Editor</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                A meticulously designed writing canvas that stays out of your way. Highlight multisyllabic rhymes, structure your verses, and keep your focus purely on the flow.
              </p>
            </div>

            <div className="bg-muted/10 border border-border p-8 md:p-12 group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display uppercase tracking-wide mb-4 text-foreground">Instant Rhyme Popup</h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                Never leave the editor to find a word. Highlight any word and instantly see perfect matches, slant rhymes, and assonance right at your cursor.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-foreground mb-4">Trusted in the <span className="text-primary">Booth</span></h2>
            <p className="text-muted-foreground font-sans">Hear from artists who leveled up their pen game.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "MC Vertex", title: "Independent Artist", quote: "I used to have 15 browser tabs open for rhyming dictionaries. RymeHelper keeps me in the zone. My writing speed doubled." },
              { name: "Sarah J", title: "Spoken Word Poet", quote: "The syllable counter is a game changer for pacing. I can visually map out my entire stanza before I even speak it." },
              { name: "K-Flow", title: "Producer / Writer", quote: "Writing hooks for other artists is so much faster now. It suggests slant rhymes I wouldn't have thought of." }
            ].map((study, i) => (
              <div key={i} className="bg-muted/5 border border-border p-8 rounded-xl flex flex-col justify-between">
                <p className="font-sans text-muted-foreground italic mb-8">"{study.quote}"</p>
                <div>
                  <p className="font-mono text-foreground">{study.name}</p>
                  <p className="text-xs text-primary uppercase tracking-widest">{study.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-3xl mx-auto px-6 mb-32">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-foreground mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
          </div>

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
          
          <div className="mt-8 text-center">
            <Link to="/faq" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono font-medium">
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-6 mb-20 text-center bg-primary/10 border border-primary/20 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-foreground mb-6">Ready to elevate your craft?</h2>
          <p className="text-lg text-muted-foreground font-sans mb-10 max-w-xl mx-auto">Join the writers who have already switched to a professional, distraction-free environment.</p>
          <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-mono text-lg rounded-md hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Get Pro Access <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </>
  );
}
