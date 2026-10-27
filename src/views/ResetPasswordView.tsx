"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { AuthCard } from '../components/auth/AuthCard';
import { Alert, Button, Field, Input } from '../components/ui';
import { useLang } from '../i18n/useLang';
import { href } from '../i18n/routes';

const T = {
  en: { mismatch: 'The passwords don’t match.', done: 'Your password is updated. Taking you to your dashboard…', generic: 'Something went wrong. Please try again.',
    title: 'Choose a new password', sub: 'Use at least 6 characters. You’ll use it in the app and on this website.', pw: 'New password', repeat: 'Repeat new password', saving: 'Saving…', save: 'Save new password' },
  nl: { mismatch: 'De wachtwoorden zijn niet hetzelfde.', done: 'Je wachtwoord is aangepast. We sturen je door naar je dashboard…', generic: 'Er ging iets mis. Probeer het opnieuw.',
    title: 'Kies een nieuw wachtwoord', sub: 'Gebruik minimaal 6 tekens. Je gebruikt het in de app en op deze website.', pw: 'Nieuw wachtwoord', repeat: 'Herhaal je nieuwe wachtwoord', saving: 'Opslaan…', save: 'Nieuw wachtwoord opslaan' },
} as const;

export function ResetPasswordView() {
  const router = useRouter();
  const lang = useLang();
  const t = T[lang];
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage({ tone: 'error', text: t.mismatch });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage({ tone: 'success', text: t.done });
      setTimeout(() => router.push(href(lang, 'dashboard')), 2000);
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : t.generic });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title={t.title} sub={t.sub}>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Field label={t.pw}>
          {(id) => <Input id={id} icon={Lock} type="password" required minLength={6} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />}
        </Field>
        <Field label={t.repeat}>
          {(id) => <Input id={id} icon={Lock} type="password" required minLength={6} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />}
        </Field>
        {message && <Alert tone={message.tone}>{message.text}</Alert>}
        <Button type="submit" size="lg" fullWidth disabled={loading}>{loading ? t.saving : t.save}</Button>
      </form>
    </AuthCard>
  );
}
