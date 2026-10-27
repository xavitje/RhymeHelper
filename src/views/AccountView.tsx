"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cloud, ExternalLink, Lock, Mail, Sparkles, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useSessionUser } from '../lib/useSessionUser';
import { isPro, hasCloudSync, cloudSyncEndsAt, customerPortalUrl } from '../lib/entitlements';
import { APP_CONFIG, proPrice } from '../config';
import { AccountHeader, AccountSkeleton } from '../components/account/AccountHeader';
import { CloudLibraryStats } from '../components/account/CloudLibraryStats';
import { Alert, Badge, Button, ButtonLink, Card, Field, Input } from '../components/ui';
import { useLang } from '../i18n/useLang';
import { href } from '../i18n/routes';
import { fmtPrice } from '../i18n/ui';

const T = {
  en: {
    emailSent: 'Check both your old and new inbox. Click the link in each to confirm the change.', emailFail: 'Could not change your email.',
    pwDone: 'Your password is updated.', pwFail: 'Could not change your password.', delFail: 'Could not delete your account.',
    title: 'Account settings', active: 'Active', on: 'On', off: 'Off',
    proOn: 'All Pro features are unlocked: advanced rhymes, AI suggestions, Studio, your full song library, tabs, split screen and extra styles.',
    proOff: (p: string) => `Near rhymes, AI suggestions, multi-syllable search, Studio, your full song library, tabs and split screen. One-time ${p}.`,
    getPro: (p: string) => `Get Pro for ${p}`,
    cancelled: (d: string) => `Cancelled. Cloud Sync keeps working until ${d}.`, locale: 'en-GB',
    cloudOn: 'Your cloud library is on every computer you log in on. Changes sync within seconds.',
    cloudOff: (p: string) => `Your songs in a cloud library, on every computer you write on. ${p} a month, cancel any time.`,
    manage: 'Manage subscription', subActive: 'Your subscription is active.', subscribe: 'Subscribe to Cloud Sync',
    emailTitle: 'Email address', current: 'Current:', newEmail: 'New email', saving: 'Saving…', changeEmail: 'Change email',
    pwTitle: 'Password', newPw: 'New password', min: 'At least 6 characters.', changePw: 'Change password',
    delTitle: 'Delete account',
    delBody: 'This permanently deletes your account and the data linked to it, in line with our privacy policy and the GDPR. Songs saved on your computer stay there. This cannot be undone.',
    delBtn: 'Delete my account', sure: 'Are you sure? Your account and the license link on it will be removed.',
    deleting: 'Deleting…', yes: 'Yes, delete my account', cancel: 'Cancel',
  },
  nl: {
    emailSent: 'Check zowel je oude als je nieuwe inbox. Klik in allebei op de link om de wijziging te bevestigen.', emailFail: 'We konden je e-mailadres niet wijzigen.',
    pwDone: 'Je wachtwoord is aangepast.', pwFail: 'We konden je wachtwoord niet wijzigen.', delFail: 'We konden je account niet verwijderen.',
    title: 'Accountinstellingen', active: 'Actief', on: 'Aan', off: 'Uit',
    proOn: 'Alle Pro-functies staan aan: uitgebreide rijmen, AI-suggesties, Studio, je hele liedbibliotheek, tabbladen, gesplitst scherm en extra stijlen.',
    proOff: (p: string) => `Bijna-rijmen, AI-suggesties, meerlettergrepig zoeken, Studio, je hele liedbibliotheek, tabbladen en gesplitst scherm. Eenmalig ${p}.`,
    getPro: (p: string) => `Koop Pro voor ${p}`,
    cancelled: (d: string) => `Opgezegd. Cloud Sync blijft werken tot ${d}.`, locale: 'nl-NL',
    cloudOn: 'Je cloudbibliotheek staat op elke computer waarop je inlogt. Wijzigingen staan binnen seconden overal.',
    cloudOff: (p: string) => `Je liedjes in een cloudbibliotheek, op elke computer waarop je schrijft. ${p} per maand, altijd opzegbaar.`,
    manage: 'Abonnement beheren', subActive: 'Je abonnement is actief.', subscribe: 'Cloud Sync afsluiten',
    emailTitle: 'E-mailadres', current: 'Huidig:', newEmail: 'Nieuw e-mailadres', saving: 'Opslaan…', changeEmail: 'E-mailadres wijzigen',
    pwTitle: 'Wachtwoord', newPw: 'Nieuw wachtwoord', min: 'Minimaal 6 tekens.', changePw: 'Wachtwoord wijzigen',
    delTitle: 'Account verwijderen',
    delBody: 'Hiermee verwijder je je account en de gegevens die eraan gekoppeld zijn, volgens onze privacyverklaring en de AVG. Liedjes die op je computer staan, blijven daar. Dit kun je niet ongedaan maken.',
    delBtn: 'Mijn account verwijderen', sure: 'Weet je het zeker? Je account en de licentiekoppeling erop worden verwijderd.',
    deleting: 'Verwijderen…', yes: 'Ja, verwijder mijn account', cancel: 'Annuleren',
  },
} as const;

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

export function AccountView() {
  const router = useRouter();
  const lang = useLang();
  const t = T[lang];
  const proP = fmtPrice(lang, proPrice().price);
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

  const pro = isPro(user);
  const cloudActive = hasCloudSync(user);
  const cloudEnds = cloudSyncEndsAt(user);
  const portalUrl = customerPortalUrl(user);
  const withUser = (url: string) => `${url}${url.includes('?') ? '&' : '?'}checkout[custom][user_id]=${user.id}`;

  const updateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailBusy(true);
    setEmailMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail.trim() });
      if (error) throw error;
      setEmailMsg({ tone: 'success', text: t.emailSent });
      setNewEmail('');
    } catch (err) {
      setEmailMsg({ tone: 'error', text: errText(err, t.emailFail) });
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
      setPasswordMsg({ tone: 'success', text: t.pwDone });
      setNewPassword('');
    } catch (err) {
      setPasswordMsg({ tone: 'error', text: errText(err, t.pwFail) });
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
      router.push(href(lang, 'home'));
    } catch (err) {
      setDeleteMsg({ tone: 'error', text: errText(err, t.delFail) });
      setDeleteBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <AccountHeader title={t.title} email={user.email} />

      {/* Abonnementen en toegang */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <Sparkles aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> Rhyme Helper Pro
            </h2>
            {pro ? <Badge tone="success">{t.active}</Badge> : <Badge>Free</Badge>}
          </div>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">
            {pro
              ? t.proOn
              : t.proOff(proP)}
          </p>
          {!pro && (
            <ButtonLink href={withUser(proPrice().checkoutUrl)} external target="_blank" rel="noopener noreferrer" iconRight={ExternalLink} className="mt-5">
              {t.getPro(proP)}
            </ButtonLink>
          )}
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <Cloud aria-hidden strokeWidth={1.75} className="size-5 text-text-muted" /> Cloud Sync
            </h2>
            {cloudActive ? <Badge tone="success">{t.on}</Badge> : <Badge>{t.off}</Badge>}
          </div>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">
            {cloudActive && cloudEnds
              ? t.cancelled(cloudEnds.toLocaleDateString(t.locale, { day: 'numeric', month: 'long', year: 'numeric' }))
              : cloudActive
              ? t.cloudOn
              : t.cloudOff(fmtPrice(lang, APP_CONFIG.CLOUD_SYNC_PRICE))}
          </p>
          <CloudLibraryStats active={cloudActive} />
          {cloudActive ? (
            portalUrl ? (
              <ButtonLink href={portalUrl} external target="_blank" rel="noopener noreferrer" variant="secondary" iconRight={ExternalLink} className="mt-5">
                {t.manage}
              </ButtonLink>
            ) : (
              <p className="mt-5 text-sm text-text-muted">{t.subActive}</p>
            )
          ) : (
            <ButtonLink href={withUser(APP_CONFIG.CLOUD_SYNC_CHECKOUT_URL)} external target="_blank" rel="noopener noreferrer" variant="secondary" iconRight={ExternalLink} className="mt-5">
              {t.subscribe}
            </ButtonLink>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6">
        <Section icon={Mail} title={t.emailTitle}>
          <p className="text-sm text-text-muted">{t.current} <span className="text-text">{user.email}</span></p>
          <form onSubmit={updateEmail} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <Field label={t.newEmail} className="flex-1">
              {(id) => <Input id={id} type="email" required autoComplete="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />}
            </Field>
            <Button type="submit" variant="secondary" disabled={emailBusy}>{emailBusy ? t.saving : t.changeEmail}</Button>
          </form>
          {emailMsg && <Alert tone={emailMsg.tone} className="mt-4">{emailMsg.text}</Alert>}
        </Section>

        <Section icon={Lock} title={t.pwTitle}>
          <form onSubmit={updatePassword} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Field label={t.newPw} hint={t.min} className="flex-1">
              {(id) => <Input id={id} type="password" required minLength={6} autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />}
            </Field>
            <Button type="submit" variant="secondary" disabled={passwordBusy} className="sm:mb-[22px]">{passwordBusy ? t.saving : t.changePw}</Button>
          </form>
          {passwordMsg && <Alert tone={passwordMsg.tone} className="mt-4">{passwordMsg.text}</Alert>}
        </Section>

        <Card className="border-danger/25">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold">
            <Trash2 aria-hidden strokeWidth={1.75} className="size-5 text-danger" /> {t.delTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
            {t.delBody}
          </p>
          {!confirmDelete ? (
            <Button variant="secondary" onClick={() => setConfirmDelete(true)} className="mt-5 text-danger">{t.delBtn}</Button>
          ) : (
            <div className="mt-5 rounded-md border border-danger/30 bg-danger/10 p-4">
              <p className="text-sm font-medium text-text">{t.sure}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={deleteAccount} disabled={deleteBusy} className="bg-danger text-bg hover:bg-danger/90">
                  {deleteBusy ? t.deleting : t.yes}
                </Button>
                <Button variant="ghost" onClick={() => setConfirmDelete(false)} disabled={deleteBusy}>{t.cancel}</Button>
              </div>
            </div>
          )}
          {deleteMsg && <Alert tone={deleteMsg.tone} className="mt-4">{deleteMsg.text}</Alert>}
        </Card>
      </div>
    </div>
  );
}
