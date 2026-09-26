"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { AuthCard, GoogleLogo } from '../../components/auth/AuthCard';
import { Alert, Button, Field, Input } from '../../components/ui';
import { cn } from '../../lib/cn';

type Mode = 'signin' | 'signup' | 'forgot';

const TITLES: Record<Mode, { title: string; sub: string; submit: string; busy: string }> = {
  signin: { title: 'Welcome back', sub: 'Log in to see your license and downloads.', submit: 'Log in', busy: 'Logging in…' },
  signup: { title: 'Create your account', sub: 'You need an account for Pro and Cloud Sync. Writing in the app works without one.', submit: 'Create account', busy: 'Creating account…' },
  forgot: { title: 'Reset your password', sub: 'We’ll email you a link to choose a new password.', submit: 'Send reset link', busy: 'Sending…' },
};

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/dashboard');
    });
  }, [router]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const mail = email.trim();
    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(mail, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMessage({ tone: 'success', text: 'Check your email for a link to reset your password.' });
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email: mail, password });
        if (error) throw error;
        setMessage({ tone: 'success', text: 'Almost there. Check your email to confirm your account.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: mail, password });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setMessage({ tone: 'error', text: error.message });
      setLoading(false);
    }
  };

  const t = TITLES[mode];

  return (
    <AuthCard
      title={t.title}
      sub={t.sub}
      footer={
        mode === 'forgot' ? (
          <button type="button" onClick={() => switchMode('signin')} className="inline-flex items-center gap-1.5 rounded-sm font-medium text-text hover:underline">
            <ArrowLeft aria-hidden strokeWidth={1.75} className="size-3.5" /> Back to log in
          </button>
        ) : (
          <>
            {mode === 'signin' ? 'New to Rhyme Helper?' : 'Already have an account?'}{' '}
            <button type="button" onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')} className="rounded-sm font-medium text-text hover:underline">
              {mode === 'signin' ? 'Create an account' : 'Log in'}
            </button>
          </>
        )
      }
    >
      {mode !== 'forgot' && (
        <>
          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-[10px] border border-border-strong bg-bg text-sm font-medium text-text transition-colors hover:bg-raised disabled:opacity-60"
          >
            <GoogleLogo /> Continue with Google
          </button>
          <div className="my-5 flex items-center gap-3 text-xs text-text-faint">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4" noValidate={false}>
        <Field label="Email">
          {(id) => <Input id={id} icon={Mail} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />}
        </Field>
        {mode !== 'forgot' && (
          <Field label="Password" hint={mode === 'signup' ? 'At least 6 characters.' : undefined}>
            {(id) => (
              <Input
                id={id}
                icon={Lock}
                type="password"
                required
                minLength={6}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </Field>
        )}
        {mode === 'signin' && (
          <button type="button" onClick={() => switchMode('forgot')} className="-mt-2 justify-self-end rounded-sm text-xs text-text-muted hover:text-text">
            Forgot password?
          </button>
        )}

        {message && <Alert tone={message.tone}>{message.text}</Alert>}

        <Button type="submit" size="lg" fullWidth disabled={loading} className={cn(mode === 'signin' && '-mt-1')}>
          {loading ? t.busy : t.submit}
        </Button>
      </form>
    </AuthCard>
  );
}
