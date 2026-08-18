import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight mb-6">Upgrade Your <span className="text-primary">Flow</span></h1>
        <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto">Get the full studio experience and never search for a rhyme again.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <motion.div 
          className="border border-border bg-muted/5 p-10 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-display uppercase tracking-wide mb-2">Basic</h2>
            <div className="text-4xl font-mono text-foreground mb-4">Free</div>
            <p className="text-muted-foreground font-sans">For the occasional writer getting their ideas down.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1 font-sans text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span>Distraction-free rich text editor</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span>Basic syllable counting</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span>Standard dictionary access</span>
            </li>
          </ul>
          
          <button className="w-full py-4 border border-border text-foreground font-mono text-lg rounded-md hover:bg-muted hover:border-muted-foreground transition-all">
            Download Free
          </button>
        </motion.div>

        {/* Pro Tier */}
        <motion.div 
          className="border border-primary bg-primary/5 p-10 flex flex-col relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-mono px-3 py-1 tracking-widest uppercase rounded-bl-lg">
            Pro
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-display uppercase tracking-wide mb-2 text-primary">Pro</h2>
            <div className="text-4xl font-mono text-foreground mb-4">$19.99<span className="text-xl text-muted-foreground ml-2">/ lifetime</span></div>
            <p className="text-muted-foreground font-sans">For professional lyricists building complex schemes.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1 font-sans text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">Everything in Basic</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">Instant Rhyme Popup & Live Dictionary</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">Multi-word exact rhyme search</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">Advanced assonance & slant rhyme filters</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">Lifetime updates</span>
            </li>
          </ul>
          
          <a href="https://checkout.rhymehelper.store/checkout/buy/4d484294-7957-4748-846f-f9bf3cf00252?embed=1" className="lemonsqueezy-button w-full py-4 bg-primary text-white font-mono text-lg rounded-md hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-center flex items-center justify-center">
            Buy Pro License
          </a>
        </motion.div>
      </div>
    </div>
  );
}
