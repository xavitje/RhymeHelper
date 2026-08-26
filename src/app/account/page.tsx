"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Cloud, Sparkles, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { sanitize } from '../../lib/sanitize';

export default function Account() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Email Form State
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState({ type: '', text: '' });

  // Password Form State
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Delete Account State
  const [deleteLoading, setDeleteLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        // Fetch fresh user metadata from Supabase DB to get real-time webhook updates
        const { data: userData } = await supabase.auth.getUser();
        setUser(userData?.user || session.user);
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      setEmailMessage({ type: 'success', text: 'Verification link sent to both old and new email addresses.' });
      setNewEmail('');
    } catch (err: any) {
      setEmailMessage({ type: 'error', text: err.message || 'Failed to update email.' });
    } finally {
      setEmailLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordMessage({ type: 'success', text: 'Password updated successfully.' });
      setNewPassword('');
    } catch (err: any) {
      setPasswordMessage({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you absolutely sure you want to delete your account? This will permanently erase all your data and cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;
      
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err: any) {
      alert('Failed to delete account: ' + err.message);
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-[80vh] flex items-center justify-center font-mono">Loading...</div>;
  }

  const isCloudSyncActive = !!user?.user_metadata?.cloud_sync_active;
  const isPro = !!user?.user_metadata?.is_pro || !!user?.user_metadata?.license_key;
  const customerPortalUrl = user?.user_metadata?.customer_portal_url;

  return (
    <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
      <div className="flex items-center gap-4 mb-12 border-b border-border/50 pb-6">
        <div className="p-3 bg-primary/10 text-primary rounded-xl">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display uppercase tracking-wide">Account <span className="text-primary">Settings</span></h1>
          <p className="text-muted-foreground font-mono text-sm mt-2">Manage your profile and subscriptions</p>
        </div>
      </div>

      <div className="space-y-8">

        {/* Subscriptions & Products Section */}
        <motion.div
          className="bg-muted/5 border border-border p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-display uppercase tracking-wide">Your Subscriptions & Access</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Cloud Sync Status */}
            <div className="bg-background border border-border p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                    <Cloud className="w-4 h-4 text-primary" /> Cloud Sync
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${isCloudSyncActive ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20' : 'bg-muted text-muted-foreground border-border'}`}>
                    {isCloudSyncActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {isCloudSyncActive 
                    ? 'Your lyrics auto-sync across all your devices in real-time.' 
                    : 'Subscribe to back up and sync your lyrics across devices.'}
                </p>
              </div>

              {isCloudSyncActive ? (
                customerPortalUrl ? (
                  <a
                    href={customerPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 bg-muted text-foreground border border-border font-mono text-xs rounded-md hover:bg-muted/80 transition-colors"
                  >
                    Manage Subscription <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-muted-foreground">Active Subscription</span>
                )
              ) : (
                <a
                  href={`https://checkout.rhymehelper.store/checkout/buy/be44a7ad-1f20-47a7-a50d-142100e26651?checkout[custom][user_id]=${user.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 bg-primary text-white font-mono text-xs rounded-md hover:bg-primary/90 transition-colors"
                >
                  Subscribe to Cloud Sync
                </a>
              )}
            </div>

            {/* Pro Version Status */}
            <div className="bg-background border border-border p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Pro Features
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${isPro ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20' : 'bg-muted text-muted-foreground border-border'}`}>
                    {isPro ? 'Unlocked' : 'Free Version'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {isPro 
                    ? 'All Pro features, audio tools, and rhyme structures are unlocked.' 
                    : 'Upgrade to unlock advanced rhyming engines and export tools.'}
                </p>
              </div>

              {!isPro && (
                <a
                  href={`https://checkout.rhymehelper.store/checkout/buy/85bfb619-30c6-4b30-89c9-14830c1ce986?checkout[custom][user_id]=${user.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 bg-amber-500 text-black font-mono text-xs font-semibold rounded-md hover:bg-amber-400 transition-colors"
                >
                  Upgrade to Pro
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Email Section */}
        <motion.div
          className="bg-muted/5 border border-border p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-display uppercase tracking-wide">Email Address</h2>
          </div>

          <p className="text-sm font-sans text-muted-foreground mb-4">Current Email: <span className="text-foreground font-mono">{user?.email}</span></p>

          {emailMessage.text && (
            <div className={`p-3 rounded-md mb-6 font-mono text-xs flex items-start gap-2 ${emailMessage.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'}`}>
              {emailMessage.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
              {emailMessage.text}
            </div>
          )}

          <form onSubmit={handleUpdateEmail} className="flex gap-2">
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(sanitize(e.target.value))}
              placeholder="New email address"
              className="flex-1 bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-mono text-sm"
            />
            <button
              type="submit"
              disabled={emailLoading}
              className="px-6 py-2 border border-border text-foreground font-mono text-sm rounded-md hover:bg-muted transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {emailLoading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        </motion.div>

        {/* Password Section */}
        <motion.div
          className="bg-muted/5 border border-border p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-display uppercase tracking-wide">Password</h2>
          </div>

          {passwordMessage.text && (
            <div className={`p-3 rounded-md mb-6 font-mono text-xs flex items-start gap-2 ${passwordMessage.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'}`}>
              {passwordMessage.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
              {passwordMessage.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="flex gap-2">
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(sanitize(e.target.value))}
              placeholder="New password (min 6 chars)"
              className="flex-1 bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-mono text-sm"
            />
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-6 py-2 border border-border text-foreground font-mono text-sm rounded-md hover:bg-muted transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          className="border border-red-500/20 bg-red-500/5 p-8 rounded-xl mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-display uppercase tracking-wide text-red-400">Danger Zone</h2>
          </div>
          
          <p className="text-sm font-sans text-muted-foreground mb-6">
            Permanently delete your account and remove all associated data. In accordance with our Privacy Policy and GDPR requirements, your data will be securely erased. This action cannot be undone.
          </p>
          
          <button
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
            className="px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/20 font-mono text-sm rounded-md hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
          >
            {deleteLoading ? 'Deleting...' : 'Delete Account'}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
