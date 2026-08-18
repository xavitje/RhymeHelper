import { motion } from 'framer-motion';
import { Download, Zap, BookOpen, Layers, Keyboard, PenTool } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
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
          <a href="https://github.com/xavitje/RhymeHelper/releases/download/v1.0.0/RymeHelper-Setup-1.0.0.exe" download className="group relative px-8 py-4 bg-primary text-white font-mono text-lg rounded-md hover:bg-primary/90 transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <span className="relative z-10 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Free
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          <a href="https://checkout.rhymehelper.store/checkout/buy/4d484294-7957-4748-846f-f9bf3cf00252?embed=1" className="lemonsqueezy-button px-8 py-4 border border-border text-foreground font-mono text-lg rounded-md hover:bg-muted hover:border-muted-foreground transition-all flex items-center gap-3">
            Buy Pro — $19.99
          </a>
        </motion.div>
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
           {/* Mockup representing the screenshot provided by user */}
           <div className="w-full h-full border border-border/30 rounded-lg overflow-hidden flex bg-[#161616] relative shadow-inner">
             {/* Main Editor Area */}
             <div className="flex-1 p-12 text-muted-foreground font-sans text-lg md:text-2xl leading-relaxed">
               <div className="flex items-center gap-6 mb-6">
                 <span className="font-mono text-sm text-border">1</span>
                 <p>Lock into the studio and never break your flow,</p>
                 <span className="ml-auto font-mono text-sm bg-muted/30 px-3 py-1 rounded-full text-primary/70">13</span>
               </div>
               <div className="flex items-center gap-6 mb-6">
                 <span className="font-mono text-sm text-border">2</span>
                 <p>Rhyme Helper counts the syllables and tracks the words you know.</p>
                 <span className="ml-auto font-mono text-sm bg-muted/30 px-3 py-1 rounded-full text-primary/70">14</span>
               </div>
               <div className="flex items-center gap-6 mb-6">
                 <span className="font-mono text-sm text-border">3</span>
                 <p>From slant rhymes to the perfect match,</p>
                 <span className="ml-auto font-mono text-sm bg-muted/30 px-3 py-1 rounded-full text-primary/70">8</span>
               </div>
               <div className="flex items-center gap-6 mb-6">
                 <span className="font-mono text-sm text-border">4</span>
                 <p>it brings them to your screen,</p>
                 <span className="ml-auto font-mono text-sm bg-muted/30 px-3 py-1 rounded-full text-primary/70">6</span>
               </div>
               <div className="flex items-center gap-6 mb-6 relative">
                 <span className="font-mono text-sm text-border">5</span>
                 <p>The sharpest writer's notepad that the booth has ever <span className="bg-primary text-white px-1">seen.</span></p>
                 <span className="ml-auto font-mono text-sm bg-muted/30 px-3 py-1 rounded-full text-primary/70">15</span>
               </div>
             </div>
             
             {/* Sidebar Rhyme Dictionary */}
             <div className="w-[300px] border-l border-border/30 bg-[#121212] p-6 hidden md:block">
                <div className="text-xl font-sans mb-6">Words for "seen"</div>
                <div className="flex border-b border-border/50 mb-6">
                  <div className="border-b-2 border-primary pb-2 px-4 text-primary"><Zap className="w-4 h-4" /></div>
                  <div className="pb-2 px-4 text-muted-foreground"><BookOpen className="w-4 h-4" /></div>
                </div>
                <div className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Perfect Rhymes</div>
                <div className="text-xs font-mono text-muted-foreground mb-3">1 Syllable</div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="border border-[#22c55e] text-[#22c55e] rounded-full px-3 py-1 text-sm">keen</span>
                  <span className="border border-[#22c55e] text-[#22c55e] rounded-full px-3 py-1 text-sm">mean</span>
                  <span className="border border-[#22c55e] text-[#22c55e] rounded-full px-3 py-1 text-sm">lean</span>
                  <span className="border border-border text-muted-foreground rounded-full px-3 py-1 text-sm">preen</span>
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-3">2 Syllables</div>
                <div className="flex flex-wrap gap-2">
                  <span className="border border-[#22c55e] text-[#22c55e] rounded-full px-3 py-1 text-sm">obscene</span>
                  <span className="border border-border text-muted-foreground rounded-full px-3 py-1 text-sm">routine</span>
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
          <span>Bars</span> <span>•</span> <span>Flow</span> <span>•</span> <span>Syllables</span> <span>•</span> <span>Multi-rhymes</span> <span>•</span>
          <span>Bars</span> <span>•</span> <span>Flow</span> <span>•</span> <span>Syllables</span> <span>•</span> <span>Multi-rhymes</span> <span>•</span>
        </div>
      </div>

      {/* Features (The Studio Setup) */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-foreground">The Studio <span className="text-primary">Setup</span></h2>
          <p className="mt-6 text-xl text-muted-foreground font-sans max-w-2xl">Everything you need to map out complex schemes and reorganize your bars.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-muted/10 border border-border p-8 md:p-12 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display uppercase tracking-wide mb-4">Rich Text Editor</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              A meticulously designed writing canvas that stays out of your way. Highlight multisyllabic rhymes, structure your verses, and keep your focus purely on the flow.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-muted/10 border border-border p-8 md:p-12 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display uppercase tracking-wide mb-4">Instant Rhyme Popup</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Never leave the editor to find a word. Highlight any word and instantly see perfect matches, slant rhymes, and assonance right at your cursor.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-muted/10 border border-border p-8 md:p-12 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display uppercase tracking-wide mb-4">Multi-Word Search</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Elevate your pen game with multi-word queries. Find phrases that match the exact vowel structure of your punchline to build complex rhyme schemes.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-muted/10 border border-border p-8 md:p-12 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <Keyboard className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display uppercase tracking-wide mb-4">Live Syllable Counter</h3>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Keep your cadence locked in. Real-time syllable metrics displayed directly in the margin so your rhythm is visually confirmed as you write.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32 border-t border-border/40 pt-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6">The Process</h2>
          <p className="text-xl text-muted-foreground font-mono">Write &rarr; Select &rarr; Rhyme &rarr; Explore &rarr; Insert &rarr; Keep Writing</p>
        </div>
      </section>
    </div>
  );
}
