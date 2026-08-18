import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold tracking-wider text-foreground">
          Ryme<span className="text-primary">Helper</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Studio</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/resources" className="hover:text-foreground transition-colors">Docs</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/dashboard" className="text-sm font-mono text-primary hover:text-primary/80 transition-colors hidden md:block">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              Login
            </Link>
          )}
          <Link to="/pricing" className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-md text-sm font-mono hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Buy Pro
          </Link>
        </div>
      </div>
    </nav>
  );
}
