import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';
import { APP_CONFIG } from '../config';

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
              <span>Standard Text Editor</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span>Basic Dictionary</span>
            </li>
            <li className="flex items-start gap-3 opacity-50">
              <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <span className="line-through">Instant Rhyme Popups</span>
            </li>
            <li className="flex items-start gap-3 opacity-50">
              <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <span className="line-through">Multisyllabic Search</span>
            </li>
            <li className="flex items-start gap-3 opacity-50">
              <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <span className="line-through">Cloud Project Sync</span>
            </li>
          </ul>
          
          <a href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} download className="w-full block text-center py-4 border border-border text-foreground font-mono text-lg rounded-md hover:bg-muted hover:border-muted-foreground transition-all">
            Download Free
          </a>
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
            <div className="text-4xl font-mono text-foreground mb-4">
              {APP_CONFIG.SALE_PRICE ? (
                <>
                  {APP_CONFIG.SALE_PRICE}
                  <span className="text-lg text-muted-foreground line-through ml-2">{APP_CONFIG.PRICE}</span>
                  <span className="text-xs text-primary font-sans block mt-1 uppercase tracking-wider">Launch Deal</span>
                </>
              ) : (
                APP_CONFIG.PRICE
              )}
            </div>
            <p className="text-muted-foreground font-sans">For professional lyricists building complex schemes.</p>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1 font-sans text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground font-medium">Everything in Free, plus:</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0 fill-yellow-400/20" />
              <span className="text-foreground"><strong>Instant Rhyme Popups:</strong> See rhymes while you type without opening a browser.</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0 fill-yellow-400/20" />
              <span className="text-foreground"><strong>Multisyllabic Search:</strong> Find complex rhymes for entire sentences, not just single words.</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0 fill-yellow-400/20" />
              <span className="text-foreground"><strong>Advanced Filters:</strong> Filter by syllables, assonance, and slant rhymes.</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">Lifetime Access & Updates</span>
            </li>
          </ul>
          
          <a href={APP_CONFIG.LEMON_SQUEEZY_CHECKOUT_URL} className="lemonsqueezy-button w-full py-4 bg-primary text-white font-mono text-lg rounded-md hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] text-center flex items-center justify-center">
            Buy Pro License
          </a>
        </motion.div>
      </div>
    </div>
  );
}
