import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { sanitize } from '../lib/sanitize';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/dashboard');
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Password reset link sent! Check your email.' });
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Check your email for the confirmation link!' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-md bg-muted/5 border border-border p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-display uppercase tracking-wider mb-6 text-center">
          {isForgotPassword ? 'Reset Password' : (isSignUp ? 'Create Studio Pass' : 'Enter Studio')}
        </h2>

        {message.text && (
          <div className={`p-4 rounded-md mb-6 font-mono text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(sanitize(e.target.value))}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
              placeholder="producer@studio.com"
            />
          </div>
          {!isForgotPassword && (
            <div>
              <label className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(sanitize(e.target.value))}
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                placeholder="••••••••"
              />
            </div>
          )}
          
          {!isForgotPassword && !isSignUp && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-mono text-lg rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(168,85,247,0.2)] mt-6 mb-4"
          >
            {loading ? 'Processing...' : (isForgotPassword ? 'Send Reset Link' : (isSignUp ? 'Sign Up' : 'Login'))}
          </button>

          {!isForgotPassword && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-border/50"></div>
                <span className="px-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-border/50"></div>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
                    if (error) throw error;
                  } catch (err: any) {
                    setMessage({ type: 'error', text: err.message });
                  } finally {
                    setLoading(false);
                  }
                }}
                className="w-full py-4 bg-white text-gray-800 font-sans text-md font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-gray-200 shadow-[0_2px_10px_rgba(255,255,255,0.05)] hover:-translate-y-[1px]"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </>
          )}
        </form>

        <div className="mt-8 text-center text-sm font-sans text-muted-foreground border-t border-border/50 pt-6">
          {isForgotPassword ? (
            <button
              onClick={() => setIsForgotPassword(false)}
              className="text-primary hover:underline focus:outline-none"
            >
              Back to Login
            </button>
          ) : (
            <>
              {isSignUp ? 'Already have access?' : "Don't have a pass yet?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline focus:outline-none"
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
