"use client";
import { useRef, useState } from 'react';
import { Download, Send } from 'lucide-react';
import { APP_CONFIG } from '../config';
import { usePlatform } from '../lib/usePlatform';
import { Button, ButtonLink, type ButtonVariant, type ButtonSize } from './ui/Button';
import { SendLinkSheet, type SheetLang } from './SendLinkSheet';

const LABELS = {
  en: { windows: 'Download free for Windows', windowsShort: 'Download free', send: 'Send me the download link', sendShort: 'Get the app' },
  nl: { windows: 'Gratis downloaden voor Windows', windowsShort: 'Gratis downloaden', send: 'Stuur me de downloadlink', sendShort: 'Download de app' },
} as const;

/**
 * Hoofdknop voor de app. Op Windows: directe download. Op telefoon, tablet, Mac of Linux:
 * "Stuur me de downloadlink" met een paneel om je e-mailadres in te vullen.
 */
export function GetAppButton({
  lang = 'en', short = false, label, variant, size, fullWidth, className,
}: {
  lang?: SheetLang; short?: boolean; label?: string; variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; className?: string;
}) {
  const platform = usePlatform();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = LABELS[lang];

  if (platform === 'windows') {
    return (
      <ButtonLink href={APP_CONFIG.WINDOWS_DOWNLOAD_URL} variant={variant} size={size} fullWidth={fullWidth} className={className} icon={Download}>
        {label ?? (short ? t.windowsShort : t.windows)}
      </ButtonLink>
    );
  }
  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        icon={Send}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {short ? t.sendShort : t.send}
      </Button>
      {open && <SendLinkSheet lang={lang} platform={platform} onClose={() => { setOpen(false); triggerRef.current?.focus(); }} />}
    </>
  );
}
