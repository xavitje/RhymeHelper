"use client";
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Mail, X } from 'lucide-react';
import { SITE } from '../config';
import type { Platform } from '../lib/usePlatform';
import { href } from '../i18n/routes';
import { Alert, Field, Input } from './ui/Field';
import { Button } from './ui/Button';

export type SheetLang = 'en' | 'nl';

const COPY = {
  en: {
    title: 'Get Rhyme Helper on your PC',
    leadMobile: 'Rhyme Helper runs on Windows. We’ll email you the download link, so you can open it on your computer.',
    leadMac: 'Rhyme Helper runs on Windows for now. We’ll email you the download link for your PC.',
    email: 'Email address',
    mac: 'Email me once when the Mac version is ready',
    submit: 'Send the link',
    sending: 'Sending…',
    note: 'We only use your address to send this link, and delete it after 30 days.',
    privacy: 'Privacy',
    doneTitle: 'Check your inbox',
    done: 'The link is on its way. Open it on your Windows PC. Not there in a few minutes? Check your spam folder.',
    close: 'Close',
    errInvalid: 'That email address doesn’t look right. Check it and try again.',
    errLimit: 'You’ve already asked for the link a few times today. Check your inbox and spam folder.',
    errFailed: `Sending didn’t work. Try again later, or email ${SITE.contactEmail}.`,
  },
  nl: {
    title: 'Rhyme Helper op je pc',
    leadMobile: 'Rhyme Helper werkt op Windows. We mailen je de downloadlink, zodat je hem op je computer kunt openen.',
    leadMac: 'Rhyme Helper werkt voorlopig op Windows. We mailen je de downloadlink voor je pc.',
    email: 'E-mailadres',
    mac: 'Mail me één keer als de Mac-versie er is',
    submit: 'Stuur de link',
    sending: 'Versturen…',
    note: 'We gebruiken je adres alleen voor deze link en wissen het na 30 dagen.',
    privacy: 'Privacy',
    doneTitle: 'Kijk in je inbox',
    done: 'De link is onderweg. Open hem op je Windows-pc. Na een paar minuten nog niets? Kijk in je spammap.',
    close: 'Sluiten',
    errInvalid: 'Dat e-mailadres klopt niet helemaal. Controleer het en probeer opnieuw.',
    errLimit: 'Je hebt de link vandaag al een paar keer aangevraagd. Kijk in je inbox en spammap.',
    errFailed: `Versturen lukte niet. Probeer het later nog eens, of mail ${SITE.contactEmail}.`,
  },
} as const;

function storedRef(): string | null {
  try {
    const raw = localStorage.getItem('rh-ref');
    if (!raw) return null;
    const { ref, until } = JSON.parse(raw);
    return typeof ref === 'string' && Date.now() < until ? ref : null;
  } catch {
    return null;
  }
}

type State = 'idle' | 'sending' | 'done' | 'invalid' | 'limit' | 'failed';

/** Paneel "Stuur me de downloadlink": van onderen op telefoons, als kaart in het midden vanaf sm. */
export function SendLinkSheet({ lang, platform, onClose }: { lang: SheetLang; platform: Platform; onClose: () => void }) {
  const t = COPY[lang];
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>('idle');
  const [email, setEmail] = useState('');
  const [wantsMac, setWantsMac] = useState(false);
  const [trap, setTrap] = useState(''); // honeypot

  // Esc sluit, focus blijft in het paneel, pagina scrollt niet mee.
  useEffect(() => {
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('input:not([tabindex="-1"]), button, a[href]') ?? []).filter((el) => !el.hasAttribute('disabled'));
    // Eerst het e-mailveld (of na verzenden de sluitknop), niet het kruisje.
    (panel?.querySelector<HTMLElement>('input[type="email"], [data-autofocus]') ?? focusables()[0])?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'Tab') {
        const items = focusables();
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1]?.focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0]?.focus(); }
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, state === 'done']); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('/api/send-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang, platform, ref: storedRef(), wantsMac: platform === 'mac' && wantsMac, website: trap }),
      });
      if (res.ok) {
        setState('done');
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        gtag?.('event', 'link_request', { platform, lang, wants_mac: platform === 'mac' && wantsMac });
        return;
      }
      const { error } = await res.json().catch(() => ({ error: 'failed' }));
      setState(error === 'invalid_email' ? 'invalid' : error === 'limit' ? 'limit' : 'failed');
    } catch {
      setState('failed');
    }
  };

  const error = state === 'invalid' ? t.errInvalid : state === 'limit' ? t.errLimit : state === 'failed' ? t.errFailed : null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" lang={lang}>
      <button type="button" aria-label={t.close} tabIndex={-1} onClick={onClose} className="link-sheet-backdrop absolute inset-0 bg-black/60" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="link-sheet relative w-full rounded-t-2xl border border-border bg-surface px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-modal sm:max-w-md sm:rounded-2xl sm:p-7"
      >
        <span aria-hidden className="mx-auto mb-4 block h-1 w-10 rounded-full bg-border-strong sm:hidden" />
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-raised hover:text-text"
        >
          <X className="size-4" strokeWidth={1.75} />
        </button>

        {state === 'done' ? (
          <div className="pr-8" role="status">
            <CheckCircle2 aria-hidden strokeWidth={1.75} className="size-6 text-success" />
            <h2 id={titleId} className="mt-3 text-xl font-semibold tracking-[-0.02em]">{t.doneTitle}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{t.done}</p>
            <Button type="button" variant="secondary" size="lg" fullWidth className="mt-6" onClick={onClose} data-autofocus>{t.close}</Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id={titleId} className="pr-8 text-xl font-semibold tracking-[-0.02em]">{t.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{platform === 'mac' ? t.leadMac : t.leadMobile}</p>

            <Field label={t.email} className="mt-5">
              {(id) => (
                <Input
                  id={id}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  icon={Mail}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (state !== 'idle' && state !== 'sending') setState('idle'); }}
                  aria-invalid={state === 'invalid' || undefined}
                  className="h-12 text-base"
                />
              )}
            </Field>

            {/* Honeypot: onzichtbaar voor mensen en schermlezers. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>Website<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} name="website" /></label>
            </div>

            {platform === 'mac' && (
              <label className="mt-4 flex cursor-pointer items-start gap-3 text-[15px]">
                <input type="checkbox" checked={wantsMac} onChange={(e) => setWantsMac(e.target.checked)} className="mt-1 size-4 shrink-0 accent-iris" />
                <span>{t.mac}</span>
              </label>
            )}

            {error && <Alert tone="error" className="mt-4">{error}</Alert>}

            <Button type="submit" size="lg" fullWidth className="mt-5" disabled={state === 'sending' || !email.trim()}>
              {state === 'sending' ? t.sending : t.submit}
            </Button>
            <p className="mt-3 text-xs leading-relaxed text-text-muted">
              {t.note}{' '}
              <a href={`${href(lang, 'privacy')}#download-link`} className="text-text underline decoration-text-faint underline-offset-4 hover:decoration-text">{t.privacy}</a>
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
