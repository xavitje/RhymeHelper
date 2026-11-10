"use client";
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, KeyRound, Lock, LogOut, Mail } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { isPro } from '../lib/entitlements';
import { APP_CONFIG, proPrice } from '../config';
import { AuthCard, GoogleLogo } from '../components/auth/AuthCard';
import { Alert, Button, ButtonLink, Field, Input } from '../components/ui';
import { useLang } from '../i18n/useLang';
import { href } from '../i18n/routes';
import { cn } from '../lib/cn';

/**
 * Pro kopen of een code van een kaartje verzilveren, altijd in deze volgorde:
 *   1. account (Google of e-mail)   2. kassa van Lemon Squeezy, gekoppeld aan dat account   3. Pro staat aan in de app
 * Door de koppeling (custom user_id) zet de webhook Pro altijd op het goede account, ook als iemand in de kassa
 * een ander e-mailadres typt. Zonder account vooraf ging dat mis als het account nog niet bestond.
 */
import { checkoutPath, clearPending, readPendingCheckout, savePending, type Kind } from '../lib/checkout';
type AuthMode = 'signup' | 'signin';

const REF_KEY = 'rh-ref';
const CARD_REF = 'openmic-denhaag'; // kaartjes van de open mic; een ?ref= uit de link gaat voor

const T = {
  en: {
    buy: { title: 'Get Pro', sub: (p: string) => `One-time ${p}. First your account, so Pro is linked to it and turns on in the app by itself.` },
    code: { title: 'Redeem your code', sub: 'Got a card with a Pro code? Create an account, then enter the code at checkout. It’s free.' },
    steps: ['Account', 'Checkout', 'Pro in the app'],
    google: 'Continue with Google', or: 'or', email: 'Email', password: 'Password', min: 'At least 6 characters.', placeholder: 'you@example.com',
    signup: 'Create account', signin: 'Log in', busy: 'One moment…',
    haveAccount: 'Already have an account?', newHere: 'No account yet?',
    confirm: (m: string) => `Almost there: we sent a link to ${m}. Open it on this phone, then you’ll come back here for step 2.`,
    signedInAs: 'Logged in as', notYou: 'Not you?',
    codeLabel: 'Code from your card', codePh: 'e.g. RHYME-ABC123', codeHint: 'Already filled in at checkout. Total: €0.',
    toCheckout: 'Go to checkout', toCheckoutFree: 'Redeem at checkout',
    after: 'After paying: open the app and log in with this account. Pro turns on by itself.',
    openApp: 'Open the app', already: 'Pro is already on for this account.', generic: 'Something went wrong. Please try again.',
    needCode: 'Enter the code from your card.',
  },
  nl: {
    buy: { title: 'Pro kopen', sub: (p: string) => `Eenmalig ${p}. Eerst je account, zodat Pro eraan vastzit en in de app vanzelf aangaat.` },
    code: { title: 'Je code verzilveren', sub: 'Een kaartje met een Pro-code gekregen? Maak een account en vul de code in bij de kassa. Het kost niks.' },
    steps: ['Account', 'Kassa', 'Pro in de app'],
    google: 'Doorgaan met Google', or: 'of', email: 'E-mail', password: 'Wachtwoord', min: 'Minimaal 6 tekens.', placeholder: 'jij@voorbeeld.nl',
    signup: 'Account maken', signin: 'Inloggen', busy: 'Even geduld…',
    haveAccount: 'Heb je al een account?', newHere: 'Nog geen account?',
    confirm: (m: string) => `Bijna: we hebben een link gestuurd naar ${m}. Open hem op deze telefoon, dan kom je hier terug voor stap 2.`,
    signedInAs: 'Ingelogd als', notYou: 'Niet jij?',
    codeLabel: 'Code van je kaartje', codePh: 'bijv. RHYME-ABC123', codeHint: 'Staat bij de kassa al ingevuld. Totaal: €0.',
    toCheckout: 'Naar de kassa', toCheckoutFree: 'Verzilveren bij de kassa',
    after: 'Na het afrekenen: open de app en log in met dit account. Pro gaat vanzelf aan.',
    openApp: 'Open de app', already: 'Pro staat al aan op dit account.', generic: 'Er ging iets mis. Probeer het opnieuw.',
    needCode: 'Vul de code van je kaartje in.',
  },
} as const;

/** Ingelogde gebruiker, zonder door te sturen naar /login (hier log je juist in). */
function useOptionalUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!alive) return;
      setUser(session?.user ?? null);
      setLoading(false);
      if (session) {
        const { data } = await supabase.auth.getUser(); // verse app_metadata (Pro al aan?)
        if (alive && data?.user) setUser(data.user);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { if (alive) { setUser(session?.user ?? null); setLoading(false); } });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);
  return { user, loading };
}

const cleanCode = (v: string) => v.toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 40);

function readRef(): string | null {
  try {
    const raw = localStorage.getItem(REF_KEY);
    if (!raw) return null;
    const { ref, until } = JSON.parse(raw);
    return typeof ref === 'string' && Date.now() < until ? ref : null;
  } catch { return null; }
}

/** Kassalink van Lemon Squeezy, gekoppeld aan het account. */
function checkoutUrl({ userId, email, code, ref }: { userId: string; email?: string; code?: string; ref?: string | null }) {
  const url = new URL(APP_CONFIG.LEMON_SQUEEZY_CHECKOUT_URL);
  url.searchParams.delete('embed'); // volle pagina, geen overlay
  url.searchParams.set('checkout[custom][user_id]', userId);
  if (email) url.searchParams.set('checkout[email]', email);
  if (ref) url.searchParams.set('checkout[custom][ref]', ref);
  const launch = new URL(proPrice().checkoutUrl, 'https://x').searchParams.get('checkout[discount_code]');
  const discount = code || launch;
  if (discount) url.searchParams.set('checkout[discount_code]', discount);
  // Affiliate-ID van Lemon Squeezy meegeven (cookie van affiliate.js, alleen na toestemming)
  const aff = document.cookie.split(';').map((c) => c.trim()).find((c) => c.startsWith('ls_aff_ref='))?.slice('ls_aff_ref='.length);
  if (aff) url.searchParams.set('aff_ref', decodeURIComponent(aff));
  return url.toString();
}

export function CheckoutView({ kind }: { kind: Kind }) {
  const lang = useLang();
  const L = T[lang];
  const { user, loading } = useOptionalUser();
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);

  // Code uit de link (?code=) of van een eerdere poging; dit apparaat onthoudt dat we aan het afrekenen zijn.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = cleanCode(params.get('code') || '');
    const pending = readPendingCheckout();
    const c = fromUrl || (pending?.kind === kind ? pending.code : '');
    if (c) setCode(c);
    if (kind === 'code' && !readRef()) {
      try { localStorage.setItem(REF_KEY, JSON.stringify({ ref: CARD_REF, until: Date.now() + 30 * 864e5 })); } catch { /* */ }
    }
  }, [kind]);

  const here = () => `${window.location.origin}${checkoutPath(lang, kind, code || undefined)}`;

  const submitAuth = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    savePending(kind, code);
    const mail = email.trim();
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email: mail, password, options: { emailRedirectTo: here() } });
        if (error) throw error;
        if (!data.session) setMessage({ tone: 'success', text: L.confirm(mail) });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: mail, password });
        if (error) throw error;
      }
    } catch (err) {
      setMessage({ tone: 'error', text: err instanceof Error ? err.message : L.generic });
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    setMessage(null);
    savePending(kind, code);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: here() } });
    if (error) { setMessage({ tone: 'error', text: error.message }); setBusy(false); }
  };

  const goCheckout = () => {
    if (!user) return;
    if (kind === 'code' && !code) { setMessage({ tone: 'error', text: L.needCode }); return; }
    clearPending();
    window.location.href = checkoutUrl({ userId: user.id, email: user.email ?? undefined, code: code || undefined, ref: readRef() });
  };

  const head = kind === 'code' ? { title: L.code.title, sub: L.code.sub } : { title: L.buy.title, sub: L.buy.sub(proPrice().price) };
  const step = user ? 2 : 1;
  const codeField = (
    <Field label={L.codeLabel} hint={L.codeHint}>
      {(id) => (
        <Input id={id} icon={KeyRound} value={code} onChange={(e) => setCode(cleanCode(e.target.value))} placeholder={L.codePh}
          autoComplete="off" autoCapitalize="characters" spellCheck={false} data-testid="code-input" />
      )}
    </Field>
  );

  return (
    <AuthCard title={head.title} sub={head.sub}>
      <ol className="mb-6 grid grid-cols-3 gap-2 text-center text-[12px]" aria-label="Stappen">
        {L.steps.map((s, i) => (
          <li key={s} className={cn('rounded-md border px-1 py-1.5', i + 1 === step ? 'border-iris/60 bg-iris/10 text-text' : i + 1 < step ? 'border-border text-text-muted' : 'border-border text-text-muted/70')}
            aria-current={i + 1 === step ? 'step' : undefined}>
            {i + 1 < step ? <Check aria-hidden className="mr-1 inline size-3" /> : `${i + 1}. `}{s}
          </li>
        ))}
      </ol>

      {loading ? (
        <div className="h-40 animate-pulse rounded-lg bg-raised" />
      ) : user ? (
        <div className="grid gap-5" data-testid="checkout-step2">
          <p className="text-sm text-text-muted">
            {L.signedInAs} <span className="font-medium text-text">{user.email}</span>.{' '}
            <button type="button" onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-text">
              <LogOut aria-hidden className="size-3" /> {L.notYou}
            </button>
          </p>
          {isPro(user) ? (
            <>
              <Alert tone="success">{L.already}</Alert>
              <ButtonLink href={APP_CONFIG.WEB_APP_URL} size="lg" fullWidth iconRight={ArrowRight}>{L.openApp}</ButtonLink>
            </>
          ) : (
            <>
              {kind === 'code' && codeField}
              {message && <Alert tone={message.tone}>{message.text}</Alert>}
              <Button size="lg" fullWidth iconRight={ArrowRight} onClick={goCheckout} data-testid="to-checkout">
                {kind === 'code' ? L.toCheckoutFree : L.toCheckout}
              </Button>
              <p className="text-xs leading-relaxed text-text-muted">{L.after}</p>
            </>
          )}
        </div>
      ) : (
        <div data-testid="checkout-step1">
          {kind === 'code' && <div className="mb-5">{codeField}</div>}
          <button type="button" onClick={google} disabled={busy}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-[10px] border border-border-strong bg-bg text-sm font-medium text-text transition-colors hover:bg-raised disabled:opacity-60">
            <GoogleLogo /> {L.google}
          </button>
          <div className="my-5 flex items-center gap-3 text-xs text-text-muted">
            <span className="h-px flex-1 bg-border" /> {L.or} <span className="h-px flex-1 bg-border" />
          </div>
          <form onSubmit={submitAuth} className="grid gap-4">
            <Field label={L.email}>
              {(id) => <Input id={id} icon={Mail} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={L.placeholder} />}
            </Field>
            <Field label={L.password} hint={mode === 'signup' ? L.min : undefined}>
              {(id) => <Input id={id} icon={Lock} type="password" required minLength={6} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} />}
            </Field>
            {message && <Alert tone={message.tone}>{message.text}</Alert>}
            <Button type="submit" size="lg" fullWidth disabled={busy}>{busy ? L.busy : mode === 'signup' ? L.signup : L.signin}</Button>
          </form>
          <p className="mt-5 text-center text-sm text-text-muted">
            {mode === 'signup' ? L.haveAccount : L.newHere}{' '}
            <button type="button" onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setMessage(null); }} className="font-medium text-text hover:underline">
              {mode === 'signup' ? L.signin : L.signup}
            </button>
          </p>
        </div>
      )}
      {kind === 'buy' && (
        <p className="mt-6 text-center text-xs text-text-muted">
          <Link href={href(lang, 'code')} className="underline underline-offset-2 hover:text-text">{lang === 'nl' ? 'Een code van een kaartje?' : 'Got a code from a card?'}</Link>
        </p>
      )}
    </AuthCard>
  );
}
