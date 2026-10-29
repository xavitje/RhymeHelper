"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Cloud, Copy, Download, Eye, EyeOff, KeyRound, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useSessionUser } from '../lib/useSessionUser';
import { isPro, hasCloudSync, licenseKey as licenseKeyOf } from '../lib/entitlements';
import { APP_CONFIG, proPrice } from '../config';
import { AccountHeader, AccountSkeleton } from '../components/account/AccountHeader';
import { Alert, Badge, Button, ButtonLink, Card, Field, Input } from '../components/ui';
import { useLang } from '../i18n/useLang';
import { GetAppButton } from '../components/GetAppButton';
import { href } from '../i18n/routes';
import { fmtPrice } from '../i18n/ui';

const T = {
  en: {
    linked: 'Pro is linked to your account. Log in to the app with the same account to use it.', cantCheck: 'Could not check this license key.',
    title: 'Your dashboard', license: 'Pro license', active: 'Active',
    withKey: 'Pro is linked to this account. In the app, log in with the same account or paste this key under Upgrade to Pro.',
    noKey: 'Pro is active on this account. Log in to the app with the same account to use it.',
    keyLabel: 'License key', hide: 'Hide key', show: 'Show key', copy: 'Copy key', copied: 'Copied to clipboard.', private: 'Keep this key private.',
    bought: 'Bought Pro? Paste the license key from your email to link it to this account.', checking: 'Checking…', link: 'Link license',
    noYet: 'No key yet?', getPro: (p: string) => `Get Pro for ${p}`,
    dlBody: 'The latest version of Rhyme Helper for Windows 10 and 11 or macOS 12 and newer. The app updates itself after that.',
    smart: 'Windows may show a SmartScreen warning the first time. Click More info, then Run anyway.',
    on: 'On', off: 'Off', cloudOn: 'Your songs are backed up and in sync on every computer.',
    cloudOff: (p: string) => `Back up your songs and sync them across computers for ${p} a month.`, manage: 'Manage', setup: 'Set up',
    proTitle: 'What you get with Pro', proBody: (p: string) => `Near rhymes, AI suggestions, multi-syllable search, Studio, your full song library, tabs and split screen. One-time ${p}.`,
    compare: 'Compare plans',
  },
  nl: {
    linked: 'Pro is aan je account gekoppeld. Log in de app in met hetzelfde account om het te gebruiken.', cantCheck: 'We konden deze licentiesleutel niet controleren.',
    title: 'Je dashboard', license: 'Pro-licentie', active: 'Actief',
    withKey: 'Pro is aan dit account gekoppeld. Log in de app in met hetzelfde account, of plak deze sleutel bij Upgraden naar Pro.',
    noKey: 'Pro is actief op dit account. Log in de app in met hetzelfde account om het te gebruiken.',
    keyLabel: 'Licentiesleutel', hide: 'Sleutel verbergen', show: 'Sleutel tonen', copy: 'Sleutel kopiëren', copied: 'Gekopieerd.', private: 'Houd deze sleutel voor jezelf.',
    bought: 'Pro gekocht? Plak de licentiesleutel uit je mail om hem aan dit account te koppelen.', checking: 'Controleren…', link: 'Licentie koppelen',
    noYet: 'Nog geen sleutel?', getPro: (p: string) => `Koop Pro voor ${p}`,
    dlBody: 'De nieuwste versie van Rhyme Helper voor Windows 10 en 11 of macOS 12 en nieuwer. Daarna werkt de app zichzelf bij.',
    smart: 'Windows kan de eerste keer een SmartScreen-melding tonen. Klik op Meer informatie en dan op Toch uitvoeren.',
    on: 'Aan', off: 'Uit', cloudOn: 'Je liedjes hebben een back-up en staan gelijk op elke computer.',
    cloudOff: (p: string) => `Maak een back-up van je liedjes en synchroniseer ze tussen computers voor ${p} per maand.`, manage: 'Beheren', setup: 'Instellen',
    proTitle: 'Dit krijg je met Pro', proBody: (p: string) => `Bijna-rijmen, AI-suggesties, meerlettergrepig zoeken, Studio, je hele liedbibliotheek, tabbladen en gesplitst scherm. Eenmalig ${p}.`,
    compare: 'Vergelijk de versies',
  },
} as const;

function mask(key: string) {
  const tail = key.slice(-4);
  return `${'•'.repeat(Math.max(4, Math.min(16, key.length - 4)))}${tail}`;
}

export function DashboardView() {
  const { user, setUser, loading } = useSessionUser();
  const lang = useLang();
  const t = T[lang];
  const pro = fmtPrice(lang, proPrice().price);
  const [licenseInput, setLicenseInput] = useState('');
  const [activating, setActivating] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);
  const [reveal, setReveal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (loading || !user) return <AccountSkeleton />;

  const licenseKey = licenseKeyOf(user);
  const hasLicense = isPro(user);
  const cloudActive = hasCloudSync(user);

  // Koppelt een sleutel aan dit account. We valideren (niet activeren) bij Lemon Squeezy,
  // zodat de website geen van de twee apparaat-activaties opgebruikt.
  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = licenseInput.trim();
    if (!key) return;
    setActivating(true);
    setMessage(null);
    try {
      // De server (Edge Function activate-license) controleert de sleutel bij Lemon Squeezy en zet Pro.
      // Mode "link": alleen valideren, gebruikt geen van de twee apparaatplekken.
      const { error } = await supabase.functions.invoke('activate-license', { body: { license_key: key, mode: 'link' } });
      if (error) {
        let msg = error.message;
        try {
          const body = await (error as { context?: Response }).context?.json();
          if (body?.error) msg = body.error;
        } catch { /* geen JSON */ }
        throw new Error(msg);
      }
      const { data: refreshed } = await supabase.auth.refreshSession();
      if (refreshed?.user) setUser(refreshed.user);
      setLicenseInput('');
      setMessage({ tone: 'success', text: t.linked });
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : t.cantCheck });
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
      <AccountHeader title={t.title} email={user.email} />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Licentie */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <KeyRound aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> {t.license}
            </h2>
            {hasLicense ? <Badge tone="success">{t.active}</Badge> : <Badge>Free</Badge>}
          </div>

          {hasLicense ? (
            <>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                {licenseKey
                  ? t.withKey
                  : t.noKey}
              </p>
              {licenseKey && (<>
              <div className="mt-5 flex items-center gap-2 rounded-md border border-border-strong bg-raised px-3 py-2">
                <code className="min-w-0 flex-1 truncate font-mono text-sm text-text" aria-label={t.keyLabel}>
                  {reveal ? licenseKey : mask(licenseKey!)}
                </code>
                <button type="button" onClick={() => setReveal((r) => !r)} aria-label={reveal ? t.hide : t.show} className="rounded-sm p-1 text-text-muted hover:text-text">
                  {reveal ? <EyeOff aria-hidden strokeWidth={1.75} className="size-4" /> : <Eye aria-hidden strokeWidth={1.75} className="size-4" />}
                </button>
                <button type="button" onClick={copyKey} aria-label={t.copy} className="rounded-sm p-1 text-text-muted hover:text-text">
                  {copied ? <Check aria-hidden strokeWidth={1.75} className="size-4 text-success" /> : <Copy aria-hidden strokeWidth={1.75} className="size-4" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-text-muted" aria-live="polite">{copied ? t.copied : t.private}</p>
              </>)}
            </>
          ) : (
            <>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                {t.bought}
              </p>
              <form onSubmit={handleActivate} className="mt-5 grid gap-3">
                <Field label={t.keyLabel}>
                  {(id) => (
                    <Input id={id} mono required value={licenseInput} onChange={(e) => setLicenseInput(e.target.value)} placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" autoComplete="off" spellCheck={false} />
                  )}
                </Field>
                {message && <Alert tone={message.tone}>{message.text}</Alert>}
                <Button type="submit" variant="secondary" disabled={activating}>{activating ? t.checking : t.link}</Button>
              </form>
              <p className="mt-5 text-sm text-text-muted">
                {t.noYet} <Link href={href(lang, 'pricing')} className="font-medium text-text underline decoration-text-faint underline-offset-4 hover:decoration-text">{t.getPro(pro)}</Link>
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
            {t.dlBody}
          </p>
          <GetAppButton lang={lang} paid size="lg" className="mt-5" />
          <p className="mt-3 text-sm text-text-muted">
            <a href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} className="underline underline-offset-2 hover:text-text">Windows</a>
            {' · '}
            <a href={APP_CONFIG.MAC_DOWNLOAD_URL} className="underline underline-offset-2 hover:text-text">Mac (Apple Silicon)</a>
            {' · '}
            <a href={APP_CONFIG.MAC_INTEL_DOWNLOAD_URL} className="underline underline-offset-2 hover:text-text">Mac (Intel)</a>
            {' · '}
            <a href={APP_CONFIG.WEB_APP_URL} className="underline underline-offset-2 hover:text-text">{lang === 'nl' ? 'In je browser' : 'In your browser'}</a>
          </p>
          <p className="mt-auto pt-5 text-xs leading-relaxed text-text-muted">
            {t.smart}
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
              {cloudActive ? <Badge tone="success">{t.on}</Badge> : <Badge>{t.off}</Badge>}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              {cloudActive ? t.cloudOn : t.cloudOff(fmtPrice(lang, APP_CONFIG.CLOUD_SYNC_PRICE))}
            </p>
            <Link href={href(lang, 'account')} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-text hover:underline">
              {cloudActive ? t.manage : t.setup} <ArrowRight aria-hidden strokeWidth={1.75} className="size-3.5" />
            </Link>
          </div>
        </Card>
        {!hasLicense && (
          <Card className="flex items-start gap-4">
            <Sparkles aria-hidden strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-iris-text" />
            <div className="flex-1">
              <h2 className="font-semibold">{t.proTitle}</h2>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{t.proBody(pro)}</p>
              <Link href={href(lang, 'pricing')} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-text hover:underline">
                {t.compare} <ArrowRight aria-hidden strokeWidth={1.75} className="size-3.5" />
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
