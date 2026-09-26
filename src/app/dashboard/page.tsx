"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Cloud, Copy, Download, Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useSessionUser } from '../../lib/useSessionUser';
import { APP_CONFIG } from '../../config';
import { AccountHeader, AccountSkeleton } from '../../components/account/AccountHeader';
import { Alert, Badge, Button, ButtonLink, Card, Field, Input } from '../../components/ui';

function mask(key: string) {
  const tail = key.slice(-4);
  return `${'•'.repeat(Math.max(4, Math.min(16, key.length - 4)))}${tail}`;
}

export default function Dashboard() {
  const { user, setUser, loading } = useSessionUser();
  const [licenseInput, setLicenseInput] = useState('');
  const [activating, setActivating] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);
  const [reveal, setReveal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (loading || !user) return <AccountSkeleton />;

  const licenseKey: string | undefined = user.user_metadata?.license_key;
  const hasLicense = !!licenseKey;
  const cloudActive = !!user.user_metadata?.cloud_sync_active;

  // Koppelt een sleutel aan dit account. We valideren (niet activeren) bij Lemon Squeezy,
  // zodat de website geen van de twee apparaat-activaties opgebruikt.
  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = licenseInput.trim();
    if (!key) return;
    setActivating(true);
    setMessage(null);
    try {
      const res = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ license_key: key }),
      });
      const data = await res.json();
      if (!data.valid) throw new Error(data.error || 'This license key is not valid.');
      const owner = data.meta?.customer_email?.toLowerCase();
      if (owner && owner !== user.email?.toLowerCase()) {
        throw new Error('This license key belongs to a different email address. Log in with the email you used to buy Pro.');
      }
      const { data: updated, error } = await supabase.auth.updateUser({ data: { license_key: key } });
      if (error) throw error;
      if (updated?.user) setUser(updated.user);
      setLicenseInput('');
      setMessage({ tone: 'success', text: 'Pro is linked to your account. Log in to the app with the same account to use it.' });
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : 'Could not check this license key.' });
    } finally {
      setActivating(false);
    }
  };

  const copyKey = async () => {
    if (!licenseKey) return;
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setReveal(true);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <AccountHeader title="Your dashboard" email={user.email} />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Licentie */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <KeyRound aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> Pro license
            </h2>
            {hasLicense ? <Badge tone="success">Active</Badge> : <Badge>Free</Badge>}
          </div>

          {hasLicense ? (
            <>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                Pro is linked to this account. In the app, log in with the same account or paste this key under Upgrade to Pro.
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-md border border-border-strong bg-raised px-3 py-2">
                <code className="min-w-0 flex-1 truncate font-mono text-sm text-text" aria-label="License key">
                  {reveal ? licenseKey : mask(licenseKey!)}
                </code>
                <button type="button" onClick={() => setReveal((r) => !r)} aria-label={reveal ? 'Hide key' : 'Show key'} className="rounded-sm p-1 text-text-muted hover:text-text">
                  {reveal ? <EyeOff aria-hidden strokeWidth={1.75} className="size-4" /> : <Eye aria-hidden strokeWidth={1.75} className="size-4" />}
                </button>
                <button type="button" onClick={copyKey} aria-label="Copy key" className="rounded-sm p-1 text-text-muted hover:text-text">
                  {copied ? <Check aria-hidden strokeWidth={1.75} className="size-4 text-success" /> : <Copy aria-hidden strokeWidth={1.75} className="size-4" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-text-muted" aria-live="polite">{copied ? 'Copied to clipboard.' : 'Keep this key private.'}</p>
            </>
          ) : (
            <>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                Bought Pro? Paste the license key from your email to link it to this account.
              </p>
              <form onSubmit={handleActivate} className="mt-5 grid gap-3">
                <Field label="License key">
                  {(id) => (
                    <Input id={id} mono required value={licenseInput} onChange={(e) => setLicenseInput(e.target.value)} placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" autoComplete="off" spellCheck={false} />
                  )}
                </Field>
                {message && <Alert tone={message.tone}>{message.text}</Alert>}
                <Button type="submit" variant="secondary" disabled={activating}>{activating ? 'Checking…' : 'Link license'}</Button>
              </form>
              <p className="mt-5 text-sm text-text-muted">
                No key yet? <Link href="/pricing" className="font-medium text-text underline decoration-text-faint underline-offset-4 hover:decoration-text">Get Pro for {APP_CONFIG.SALE_PRICE}</Link>
              </p>
            </>
          )}
          {hasLicense && message?.tone === 'success' && <Alert tone="success" className="mt-4">{message.text}</Alert>}
        </Card>

        {/* Download */}
        <Card className="flex flex-col">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold">
            <Download aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> Download
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
            The latest version of Rhyme Helper for Windows 10 and 11. The app updates itself after that.
          </p>
          <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} size="lg" icon={Download} className="mt-5">Download for Windows</ButtonLink>
          <p className="mt-3 text-sm text-text-muted">macOS: not yet available.</p>
          <p className="mt-auto pt-5 text-xs leading-relaxed text-text-muted">
            Windows may show a SmartScreen warning the first time. Click More info, then Run anyway.
          </p>
        </Card>
      </div>

      {/* Onderste rij */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="flex items-start gap-4">
          <Cloud aria-hidden strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-text-muted" />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">Cloud Sync</h2>
              {cloudActive ? <Badge tone="success">On</Badge> : <Badge>Off</Badge>}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              {cloudActive ? 'Your songs are backed up and in sync on every computer.' : `Back up your songs and sync them across computers for ${APP_CONFIG.CLOUD_SYNC_PRICE} a month.`}
            </p>
            <Link href="/account" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-text hover:underline">
              {cloudActive ? 'Manage' : 'Set up'} <ArrowRight aria-hidden strokeWidth={1.75} className="size-3.5" />
            </Link>
          </div>
        </Card>
        {!hasLicense && (
          <Card className="flex items-start gap-4">
            <Sparkles aria-hidden strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-iris-text" />
            <div className="flex-1">
              <h2 className="font-semibold">What you get with Pro</h2>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">Near rhymes, AI suggestions, multi-syllable search, Studio, tabs and split screen. One-time {APP_CONFIG.SALE_PRICE}.</p>
              <Link href="/pricing" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-text hover:underline">
                Compare plans <ArrowRight aria-hidden strokeWidth={1.75} className="size-3.5" />
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
