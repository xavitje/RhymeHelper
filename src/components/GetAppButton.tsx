"use client";
import { useRef, useState } from 'react';
import { Download, Globe, Send } from 'lucide-react';
import { APP_CONFIG } from '../config';
import { usePlatform, useMacArch } from '../lib/usePlatform';
import { useLang } from '../i18n/useLang';
import { ButtonLink, type ButtonVariant, type ButtonSize } from './ui/Button';
import { SendLinkSheet, type SheetLang } from './SendLinkSheet';

const LABELS = {
  en: {
    windows: 'Download free for Windows', mac: 'Download free for Mac', freeShort: 'Download free',
    paidWindows: 'Download for Windows', paidMac: 'Download for Mac',
    send: 'Send me the download link', sendShort: 'Get the app',
    web: 'Open Rhyme Helper free', webShort: 'Open the app', webPaid: 'Open Rhyme Helper',
  },
  nl: {
    windows: 'Gratis downloaden voor Windows', mac: 'Gratis downloaden voor Mac', freeShort: 'Gratis downloaden',
    paidWindows: 'Download voor Windows', paidMac: 'Download voor Mac',
    send: 'Stuur me de downloadlink', sendShort: 'Download de app',
    web: 'Open Rhyme Helper gratis', webShort: 'Open de app', webPaid: 'Open Rhyme Helper',
  },
} as const;

/**
 * Hoofdknop voor de app. Op Windows en Mac: directe download van de juiste installer.
 * Op telefoon, tablet of Linux: de webversie openen (app.rhymehelper.store, installeerbaar als app).
 * `paid`: zonder het woord "gratis" (voor wie al Pro heeft).
 */
export function GetAppButton({
  lang: langProp, short = false, paid = false, label, variant, size, fullWidth, className,
}: {
  lang?: SheetLang; short?: boolean; paid?: boolean; label?: string; variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; className?: string;
}) {
  const pathLang = useLang();
  const lang = langProp ?? pathLang;
  const platform = usePlatform();
  const arch = useMacArch(platform === 'mac');
  const t = LABELS[lang];

  if (platform === 'windows' || platform === 'mac') {
    const mac = platform === 'mac';
    const hrefUrl = !mac ? APP_CONFIG.WINDOWS_DOWNLOAD_URL : arch === 'x64' ? APP_CONFIG.MAC_INTEL_DOWNLOAD_URL : APP_CONFIG.MAC_DOWNLOAD_URL;
    const text = label ?? (paid ? (mac ? t.paidMac : t.paidWindows) : short ? t.freeShort : mac ? t.mac : t.windows);
    return (
      <ButtonLink href={hrefUrl} variant={variant} size={size} fullWidth={fullWidth} className={className} icon={Download}>
        {text}
      </ButtonLink>
    );
  }
  return (
    <ButtonLink href={`${APP_CONFIG.WEB_APP_URL}/?ref=site-${lang}`} variant={variant} size={size} fullWidth={fullWidth} className={className} icon={Globe}>
      {label ?? (paid ? t.webPaid : short ? t.webShort : t.web)}
    </ButtonLink>
  );
}

const ALT = {
  en: { webQ: 'Rather not install anything?', web: 'Open it in your browser', sendQ: 'Writing on your computer?', send: 'Email me the download link' },
  nl: { webQ: 'Liever niets installeren?', web: 'Open hem in je browser', sendQ: 'Schrijf je op je computer?', send: 'Mail me de downloadlink' },
} as const;

/**
 * Tweede keuze onder de hoofdknop. Computer: de webversie. Telefoon: de downloadlink mailen voor de computer.
 */
export function AltAppLink({ lang: langProp, className = '' }: { lang?: SheetLang; className?: string }) {
  const pathLang = useLang();
  const lang = langProp ?? pathLang;
  const platform = usePlatform();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = ALT[lang];
  const linkClass = 'underline underline-offset-2 hover:text-text';
  if (platform === 'windows' || platform === 'mac') {
    return (
      <p className={`text-sm text-text-muted ${className}`}>
        {t.webQ}{' '}
        <a href={`${APP_CONFIG.WEB_APP_URL}/?ref=site-alt-${lang}`} className={linkClass}>{t.web}</a>
      </p>
    );
  }
  return (
    <p className={`text-sm text-text-muted ${className}`}>
      {t.sendQ}{' '}
      <button ref={triggerRef} type="button" className={linkClass} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
        <Send aria-hidden className="mr-1 inline size-3.5 align-[-2px]" />{t.send}
      </button>
      {open && <SendLinkSheet lang={lang} platform={platform} onClose={() => { setOpen(false); triggerRef.current?.focus(); }} />}
    </p>
  );
}

const INTEL = {
  en: { q: 'Mac with an Intel chip?', link: 'Download the Intel version' },
  nl: { q: 'Mac met een Intel-chip?', link: 'Download de Intel-versie' },
} as const;

/** Kleine regel onder de downloadknop, alleen op een Mac waarvan we de chip niet kennen (Safari, Firefox). */
export function MacIntelLink({ lang: langProp, className = '' }: { lang?: SheetLang; className?: string }) {
  const pathLang = useLang();
  const lang = langProp ?? pathLang;
  const platform = usePlatform();
  const arch = useMacArch(platform === 'mac');
  if (platform !== 'mac' || arch !== 'unknown') return null;
  const t = INTEL[lang];
  return (
    <p className={`text-sm text-text-muted ${className}`}>
      {t.q}{' '}
      <a href={APP_CONFIG.MAC_INTEL_DOWNLOAD_URL} className="underline underline-offset-2 hover:text-text">{t.link}</a>
    </p>
  );
}
