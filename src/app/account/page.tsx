"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud, ExternalLink, Lock, Mail, Sparkles, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useSessionUser } from '../../lib/useSessionUser';
import { APP_CONFIG } from '../../config';
import { AccountHeader, AccountSkeleton } from '../../components/account/AccountHeader';
import { Alert, Badge, Button, ButtonLink, Card, Field, Input } from '../../components/ui';

type Msg = { tone: 'error' | 'success'; text: string } | null;
const errText = (err: unknown, fallback: string) => (err instanceof Error ? err.message : fallback);

function Section({ icon: Icon, title, children }: { icon: typeof Mail; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <h2 className="flex items-center gap-2.5 text-lg font-semibold">
        <Icon aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> {title}
      </h2>
      <div className="mt-4">{children}</div>
    </Card>
  );
}

export default function Account() {
  const router = useRouter();
  const { user, loading } = useSessionUser();

  const [newEmail, setNewEmail] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailMsg, setEmailMsg] = useState<Msg>(null);

  const [newPassword, setNewPassword] = useState('');
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<Msg>(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<Msg>(null);

  if (loading || !user) return <AccountSkeleton />;

  const isPro = !!user.user_metadata?.is_pro || !!user.user_metadata?.license_key;
  const cloudActive = !!user.user_metadata?.cloud_sync_active;
  const portalUrl: string | undefined = user.user_metadata?.customer_portal_url;
  const withUser = (url: string) => `${url}${url.includes('?') ? '&' : '?'}checkout[custom][user_id]=${user.id}`;

  const updateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailBusy(true);
    setEmailMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail.trim() });
      if (error) throw error;
      setEmailMsg({ tone: 'success', text: 'Check both your old and new inbox. Click the link in each to confirm the change.' });
      setNewEmail('');
    } catch (err) {
      setEmailMsg({ tone: 'error', text: errText(err, 'Could not change your email.') });
    } finally {
      setEmailBusy(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordBusy(true);
    setPasswordMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordMsg({ tone: 'success', text: 'Your password is updated.' });
      setNewPassword('');
    } catch (err) {
      setPasswordMsg({ tone: 'error', text: errText(err, 'Could not change your password.') });
    } finally {
      setPasswordBusy(false);
    }
  };

  const deleteAccount = async () => {
    setDeleteBusy(true);
    setDeleteMsg(null);
    try {
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;
      await supabase.auth.signOut();
      router.push('/');
    } catch (err) {
      setDeleteMsg({ tone: 'error', text: errText(err, 'Could not delete your account.') });
      setDeleteBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <AccountHeader title="Account settings" email={user.email} />

      {/* Abonnementen en toegang */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <Sparkles aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> Rhyme Helper Pro
            </h2>
            {isPro ? <Badge tone="success">Active</Badge> : <Badge>Free</Badge>}
          </div>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">
            {isPro
              ? 'All Pro features are unlocked: advanced rhymes, AI suggestions, Studio, tabs and split screen.'
              : `Near rhymes, AI suggestions, multi-syllable search, Studio, tabs and split screen. One-time ${APP_CONFIG.SALE_PRICE}.`}
          </p>
          {!isPro && (
            <ButtonLink href={withUser(APP_CONFIG.LEMON_SQUEEZY_CHECKOUT_URL)} external target="_blank" rel="noopener noreferrer" iconRight={ExternalLink} className="mt-5">
              Get Pro for {APP_CONFIG.SALE_PRICE}
            </ButtonLink>
          )}
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <Cloud aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> Cloud Sync
            </h2>
            {cloudActive ? <Badge tone="success">On</Badge> : <Badge>Off</Badge>}
          </div>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">
            {cloudActive
              ? 'Your songs are backed up and in sync on every computer you log in on.'
              : `Automatic backups and your songs on every computer. ${APP_CONFIG.CLOUD_SYNC_PRICE} a month, cancel any time.`}
          </p>
          {cloudActive ? (
            portalUrl ? (
              <ButtonLink href={portalUrl} external target="_blank" rel="noopener noreferrer" variant="secondary" iconRight={ExternalLink} className="mt-5">
                Manage subscription
              </ButtonLink>
            ) : (
              <p className="mt-5 text-sm text-text-muted">Your subscription is active.</p>
            )
          ) : (
            <ButtonLink href={withUser(APP_CONFIG.CLOUD_SYNC_CHECKOUT_URL)} external target="_blank" rel="noopener noreferrer" variant="secondary" iconRight={ExternalLink} className="mt-5">
              Subscribe to Cloud Sync
            </ButtonLink>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6">
        <Section icon={Mail} title="Email address">
          <p className="text-sm text-text-muted">Current: <span className="text-text">{user.email}</span></p>
          <form onSubmit={updateEmail} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <Field label="New email" className="flex-1">
              {(id) => <Input id={id} type="email" required autoComplete="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />}
            </Field>
            <Button type="submit" variant="secondary" disabled={emailBusy}>{emailBusy ? 'Saving…' : 'Change email'}</Button>
          </form>
          {emailMsg && <Alert tone={emailMsg.tone} className="mt-4">{emailMsg.text}</Alert>}
        </Section>

        <Section icon={Lock} title="Password">
          <form onSubmit={updatePassword} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Field label="New password" hint="At least 6 characters." className="flex-1">
              {(id) => <Input id={id} type="password" required minLength={6} autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />}
            </Field>
            <Button type="submit" variant="secondary" disabled={passwordBusy} className="sm:mb-[22px]">{passwordBusy ? 'Saving…' : 'Change password'}</Button>
          </form>
          {passwordMsg && <Alert tone={passwordMsg.tone} className="mt-4">{passwordMsg.text}</Alert>}
        </Section>

        <Card className="border-danger/25">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold">
            <Trash2 aria-hidden strokeWidth={1.75} className="size-5 text-danger" /> Delete account
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
            This permanently deletes your account and the data linked to it, in line with our privacy policy and the GDPR. Songs saved on your computer stay there. This cannot be undone.
          </p>
          {!confirmDelete ? (
            <Button variant="secondary" onClick={() => setConfirmDelete(true)} className="mt-5 text-danger">Delete my account</Button>
          ) : (
            <div className="mt-5 rounded-md border border-danger/30 bg-danger/10 p-4">
              <p className="text-sm font-medium text-text">Are you sure? Your account and the license link on it will be removed.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={deleteAccount} disabled={deleteBusy} className="bg-danger text-bg hover:bg-danger/90">
                  {deleteBusy ? 'Deleting…' : 'Yes, delete my account'}
                </Button>
                <Button variant="ghost" onClick={() => setConfirmDelete(false)} disabled={deleteBusy}>Cancel</Button>
              </div>
            </div>
          )}
          {deleteMsg && <Alert tone={deleteMsg.tone} className="mt-4">{deleteMsg.text}</Alert>}
        </Card>
      </div>
    </div>
  );
}
