import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
import { sanitize } from '../lib/sanitize';

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

  const handleRemoveLicense = async () => {
    if (!confirm('Are you sure you want to unlink your license key from this account?')) return;

    try {
      const { error } = await supabase.auth.updateUser({
        data: { license_key: null }
      });
      if (error) throw error;

      setUser({
        ...user,
        user_metadata: {
          ...user?.user_metadata,
          license_key: null
        }
      });
    } catch (err: any) {
      alert('Failed to remove license: ' + err.message);
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
      navigate('/login');
    } catch (err: any) {
      alert('Failed to delete account: ' + err.message);
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-[80vh] flex items-center justify-center font-mono">Loading...</div>;
  }

  const hasLicense = !!user?.user_metadata?.license_key;

  return (
    <div className="pt-24 pb-16 max-w-3xl mx-auto px-6">
      <div className="flex items-center gap-4 mb-12 border-b border-border/50 pb-6">
        <div className="p-3 bg-primary/10 text-primary rounded-xl">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display uppercase tracking-wide">Account <span className="text-primary">Settings</span></h1>
          <p className="text-muted-foreground font-mono text-sm mt-2">Manage your profile and security</p>
        </div>
      </div>

      <div className="space-y-8">

        {/* Email Section */}
        <motion.div
          className="bg-muted/5 border border-border p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
          transition={{ delay: 0.1 }}
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

        {/* License Details Section */}
        <motion.div
          className="bg-muted/5 border border-border p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Key className={`w-5 h-5 ${hasLicense ? 'text-[#22c55e]' : 'text-muted-foreground'}`} />
              <h2 className="text-xl font-display uppercase tracking-wide">License Details</h2>
            </div>
            {hasLicense && (
              <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-xs font-mono border border-[#22c55e]/20">Active</span>
            )}
          </div>

          {hasLicense ? (
            <div>
              <p className="text-sm font-sans text-muted-foreground mb-2">Linked License Key:</p>
              <code className="block bg-background border border-border p-3 rounded-md text-sm text-foreground mb-6 break-all">
                {user.user_metadata.license_key}
              </code>
              <button
                onClick={handleRemoveLicense}
                className="text-sm font-mono text-red-400 hover:text-red-300 transition-colors"
              >
                Unlink License Key
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm font-sans text-muted-foreground mb-4">No license key is currently linked to this account.</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 font-mono text-sm rounded-md hover:bg-primary hover:text-white transition-colors"
              >
                Activate License in Dashboard
              </button>
            </div>
          )}
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
