import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Resources & Docs | RymeHelper</title>
        <meta name="description" content="Documentation, keyboard shortcuts, and FAQ for RymeHelper." />
      </Helmet>
      
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Resources' }]} />

        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wide mb-4 mt-6">
          Studio <span className="text-primary">Resources</span>
        </h1>
        <p className="text-muted-foreground font-sans text-lg mb-12">
          Everything you need to master the RymeHelper environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Docs Section */}
          <div className="bg-muted/5 border border-border p-8 rounded-xl hover:border-primary/50 transition-colors">
            <h2 className="text-2xl font-display uppercase tracking-wide mb-4">Documentation</h2>
            <p className="text-muted-foreground font-sans mb-6">
              Learn how to set up your workspace, manage your files, and utilize the built-in rhyming dictionary to its full potential.
            </p>
            <ul className="space-y-3 font-mono text-sm">
              <li><a href="#" className="text-primary hover:underline">→ Getting Started Guide</a></li>
              <li><a href="#" className="text-primary hover:underline">→ Multi-Syllable Highlighting</a></li>
              <li><a href="#" className="text-primary hover:underline">→ Using the Rhyme Sidebar</a></li>
            </ul>
          </div>

          {/* Shortcuts Section */}
          <div className="bg-muted/5 border border-border p-8 rounded-xl hover:border-primary/50 transition-colors">
            <h2 className="text-2xl font-display uppercase tracking-wide mb-4">Keyboard Shortcuts</h2>
            <p className="text-muted-foreground font-sans mb-6">
              Never take your hands off the keyboard. Master these shortcuts to speed up your writing process.
            </p>
            <ul className="space-y-3 font-sans text-sm">
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Find Perfect Rhyme</span>
                <span className="font-mono bg-muted px-2 py-1 rounded text-foreground text-xs">Ctrl + R</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Toggle Syllable Counter</span>
                <span className="font-mono bg-muted px-2 py-1 rounded text-foreground text-xs">Ctrl + S</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-muted-foreground">Focus Editor</span>
                <span className="font-mono bg-muted px-2 py-1 rounded text-foreground text-xs">Esc</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Support CTA */}
        <div className="bg-primary/10 border border-primary/20 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-display uppercase tracking-wide mb-4">Need More Help?</h2>
          <p className="text-muted-foreground font-sans mb-6 max-w-lg mx-auto">
            Can't find what you're looking for? Our support team is here to help you get the most out of RymeHelper.
          </p>
          <a href="mailto:support@rhymehelper.store" className="inline-block px-6 py-3 bg-primary text-white font-mono rounded-md hover:bg-primary/90 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </>
  );
}
