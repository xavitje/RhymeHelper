"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { AuthCard, GoogleLogo } from '../components/auth/AuthCard';
import { Alert, Button, Field, Input } from '../components/ui';
import { cn } from '../lib/cn';

type Mode = 'signin' | 'signup' | 'forgot';
import { useLang } from '../i18n/useLang';
import { href } from '../i18n/routes';

const T = {
  en: {
    modes: {
      signin: { title: 'Welcome back', sub: 'Log in to see your license and downloads.', submit: 'Log in', busy: 'Logging in…' },
      signup: { title: 'Create your account', sub: 'You need an account for Pro and Cloud Sync. Writing in the app works without one.', submit: 'Create account', busy: 'Creating account…' },
      forgot: { title: 'Reset your password', sub: 'We’ll email you a link to choose a new password.', submit: 'Send reset link', busy: 'Sending…' },
    } as Record<Mode, { title: string; sub: string; submit: string; busy: string }>,
    resetSent: 'Check your email for a link to reset your password.',
    confirm: 'Almost there. Check your email to confirm your account.',
    generic: 'Something went wrong. Please try again.',
    back: 'Back to log in', newHere: 'New to Rhyme Helper?', haveAccount: 'Already have an account?',
    create: 'Create an account', login: 'Log in', google: 'Continue with Google', or: 'or',
    email: 'Email', password: 'Password', min: 'At least 6 characters.', forgot: 'Forgot password?', placeholder: 'you@example.com',
  },
  nl: {
    modes: {
      signin: { title: 'Welkom terug', sub: 'Log in om je licentie en downloads te zien.', submit: 'Inloggen', busy: 'Inloggen…' },
      signup: { title: 'Maak je account', sub: 'Je hebt een account nodig voor Pro en Cloud Sync. Schrijven in de app kan ook zonder.', submit: 'Account maken', busy: 'Account maken…' },
      forgot: { title: 'Wachtwoord vergeten', sub: 'We mailen je een link om een nieuw wachtwoord te kiezen.', submit: 'Stuur de link', busy: 'Versturen…' },
    } as Record<Mode, { title: string; sub: string; submit: string; busy: string }>,
    resetSent: 'Check je mail voor een link om je wachtwoord te herstellen.',
    confirm: 'Bijna klaar. Check je mail om je account te bevestigen.',
    generic: 'Er ging iets mis. Probeer het opnieuw.',
    back: 'Terug naar inloggen', newHere: 'Nieuw bij Rhyme Helper?', haveAccount: 'Heb je al een account?',
    create: 'Maak een account', login: 'Inloggen', google: 'Doorgaan met Google', or: 'of',
    email: 'E-mail', password: 'Wachtwoord', min: 'Minimaal 6 tekens.', forgot: 'Wachtwoord vergeten?', placeholder: 'jij@voorbeeld.nl',
  },
} as const;

export function LoginView() {
  const router = useRouter();
  const lang = useLang();
  const L = T[lang];
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace(href(lang, 'dashboard'));
    });
  }, [router, lang]);

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
        const { error } = await supabase.auth.resetPasswordForEmail(mail, { redirectTo: `${window.location.origin}${href(lang, 'resetPassword')}` });
        if (error) throw error;
        setMessage({ tone: 'success', text: L.resetSent });
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email: mail, password });
        if (error) throw error;
        setMessage({ tone: 'success', text: L.confirm });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: mail, password });
        if (error) throw error;
        router.push(href(lang, 'dashboard'));
      }
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : L.generic });
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

  const t = L.modes[mode];

  return (
    <AuthCard
      title={t.title}
      sub={t.sub}
      footer={
        mode === 'forgot' ? (
          <button type="button" onClick={() => switchMode('signin')} className="inline-flex items-center gap-1.5 rounded-sm font-medium text-text hover:underline">
            <ArrowLeft aria-hidden strokeWidth={1.75} className="size-3.5" /> {L.back}
          </button>
        ) : (
          <>
            {mode === 'signin' ? L.newHere : L.haveAccount}{' '}
            <button type="button" onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')} className="rounded-sm font-medium text-text hover:underline">
              {mode === 'signin' ? L.create : L.login}
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
            <GoogleLogo /> {L.google}
          </button>
          <div className="my-5 flex items-center gap-3 text-xs text-text-muted">
            <span className="h-px flex-1 bg-border" /> {L.or} <span className="h-px flex-1 bg-border" />
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4" noValidate={false}>
        <Field label={L.email}>
          {(id) => <Input id={id} icon={Mail} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={L.placeholder} />}
        </Field>
        {mode !== 'forgot' && (
          <Field label={L.password} hint={mode === 'signup' ? L.min : undefined}>
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
            {L.forgot}
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
