"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { AuthCard } from '../../components/auth/AuthCard';
import { Alert, Button, Field, Input } from '../../components/ui';

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage({ tone: 'error', text: 'The passwords don’t match.' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage({ tone: 'success', text: 'Your password is updated. Taking you to your dashboard…' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Choose a new password" sub="Use at least 6 characters. You’ll use it in the app and on this website.">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Field label="New password">
          {(id) => <Input id={id} icon={Lock} type="password" required minLength={6} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />}
        </Field>
        <Field label="Repeat new password">
          {(id) => <Input id={id} icon={Lock} type="password" required minLength={6} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />}
        </Field>
        {message && <Alert tone={message.tone}>{message.text}</Alert>}
        <Button type="submit" size="lg" fullWidth disabled={loading}>{loading ? 'Saving…' : 'Save new password'}</Button>
      </form>
    </AuthCard>
  );
}
