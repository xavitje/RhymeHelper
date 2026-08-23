import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="RhymeHelper Logo" className="h-8 w-8 object-contain rounded-md" />
            <h3 className="text-xl font-display font-bold tracking-wider text-foreground">
              Ryme<span className="text-primary">Helper</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground font-sans">
            The distraction-free writer's notepad for lyricists, rappers, and poets.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-sm text-foreground mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground font-sans">
            <li><Link to="/#features" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Download</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-sm text-foreground mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground font-sans">
            <li><Link to="/resources" className="hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link to="/resources" className="hover:text-primary transition-colors">Keyboard Shortcuts</Link></li>
            <li><Link to="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-sm text-foreground mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground font-sans">
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
          
          <div className="mt-8 bg-muted/10 p-4 rounded-lg border border-border inline-flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Support Promise</p>
              <p className="text-sm font-sans text-foreground">&lt; 24h Response Time</p>
            </div>
          </div>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-border/40 text-center text-xs font-mono text-muted-foreground">
        &copy; {new Date().getFullYear()} RymeHelper. Built for the booth.
      </div>
    </footer>
  );
}
