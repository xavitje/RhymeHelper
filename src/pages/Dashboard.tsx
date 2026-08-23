import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Key, Download, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '../config';
import { sanitize } from '../lib/sanitize';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [licenseInput, setLicenseInput] = useState('');
  const [activating, setActivating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkSession();
  }, [navigate]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseInput.trim()) return;
    
    setActivating(true);
    setMessage({ type: '', text: '' });

    try {
      // Direct call to Lemon Squeezy to validate/activate the license
      const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/activate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          license_key: licenseInput.trim(),
          instance_name: 'RymeHelper Web Portal'
        })
      });

      const data = await response.json();

      // Ensure the logged-in user actually owns this license
      if (data.meta?.customer_email && data.meta.customer_email.toLowerCase() !== user?.email?.toLowerCase()) {
        throw new Error('This license key belongs to a different email address.');
      }

      if (data.activated || (data.error && data.error.includes('already activated'))) {
        // Save the valid license key to the user's Supabase metadata
        // The desktop app reads it from session.user.user_metadata.license_key
        const { error } = await supabase.auth.updateUser({
          data: { license_key: licenseInput.trim() }
        });
        
        if (error) throw error;
        
        // Update local state
        setUser({
          ...user,
          user_metadata: {
            ...user?.user_metadata,
            license_key: licenseInput.trim()
          }
        });
        setMessage({ type: 'success', text: 'License activated successfully!' });
      } else {
        throw new Error(data.error || 'Invalid license key.');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to activate license.' });
    } finally {
      setActivating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-[80vh] flex items-center justify-center font-mono">Loading...</div>;
  }

  const hasLicense = !!user?.user_metadata?.license_key;

  return (
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-4xl font-display uppercase tracking-wide">Studio <span className="text-primary">Dashboard</span></h1>
          <p className="text-muted-foreground font-mono text-sm mt-2">{user?.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-mono border border-border text-foreground hover:bg-muted rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className={`grid grid-cols-1 ${hasLicense ? '' : 'md:grid-cols-2'} gap-8`}>
        {/* License Section - Only visible if they don't have a license */}
        {!hasLicense && (
          <motion.div 
            className="bg-muted/5 border border-border p-8 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <Key className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-display uppercase tracking-wide">Pro License</h2>
            </div>

            <div>
              <p className="text-muted-foreground font-sans text-sm mb-6">
                Enter your Lemon Squeezy license key to unlock Pro features on the desktop app.
              </p>
              
              {message.text && (
                <div className={`p-3 rounded-md mb-6 font-mono text-xs flex items-start gap-2 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'}`}>
                  {message.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  {message.text}
                </div>
              )}

              <form onSubmit={handleActivate} className="flex gap-2">
                <input 
                  type="text" 
                  required
                  value={licenseInput}
                  onChange={(e) => setLicenseInput(sanitize(e.target.value))}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="flex-1 bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                />
                <button 
                  type="submit"
                  disabled={activating}
                  className="px-6 py-2 bg-primary text-white font-mono text-sm rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {activating ? 'Validating...' : 'Activate'}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Downloads Section */}
        <motion.div 
          className="bg-muted/5 border border-border p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-display uppercase tracking-wide">Downloads</h2>
          </div>

          <p className="text-muted-foreground font-sans text-sm mb-6">
            Download the desktop application for your operating system.
          </p>

          <div className="space-y-3">
            <button disabled className="w-full flex items-center justify-between p-4 border border-border/30 bg-muted/10 rounded-md text-muted-foreground opacity-60 cursor-not-allowed group">
              <span className="font-mono">Mac (Apple Silicon)</span>
              <span className="text-xs uppercase tracking-widest border border-border px-2 py-0.5 rounded">Coming Soon</span>
            </button>
            <button disabled className="w-full flex items-center justify-between p-4 border border-border/30 bg-muted/10 rounded-md text-muted-foreground opacity-60 cursor-not-allowed group">
              <span className="font-mono">Mac (Intel)</span>
              <span className="text-xs uppercase tracking-widest border border-border px-2 py-0.5 rounded">Coming Soon</span>
            </button>
            <a href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} download className="w-full flex items-center justify-between p-4 border border-border rounded-md hover:border-foreground transition-colors group">
              <span className="font-mono text-foreground group-hover:text-primary transition-colors">Windows (x64)</span>
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
