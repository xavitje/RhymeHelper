"use client";
import { useEffect, useState } from 'react';

/** Waar de bezoeker op zit. De server rendert altijd 'windows', zodat er voor Windows-bezoekers niets verspringt. */
export type Platform = 'windows' | 'mac' | 'mobile' | 'other';

export function detectPlatform(): Platform {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } };
  const ua = navigator.userAgent;
  // iPadOS doet zich voor als Mac, maar heeft een touchscreen.
  if (nav.userAgentData?.mobile || /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'mobile';
  const p = nav.userAgentData?.platform || navigator.platform || '';
  if (/Win/i.test(p) || /Windows/.test(ua)) return 'windows';
  if (/Mac/i.test(p) || /Macintosh/.test(ua)) return 'mac';
  return 'other';
}

export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('windows');
  useEffect(() => setPlatform(detectPlatform()), []);
  return platform;
}

/**
 * Apple Silicon of Intel? Chrome en Edge vertellen dat; Safari en Firefox niet.
 * Dan gaan we uit van Apple Silicon (alle Macs sinds eind 2020) en tonen we ernaast een Intel-link.
 */
export type MacArch = 'arm64' | 'x64' | 'unknown';

export function useMacArch(enabled: boolean): MacArch {
  const [arch, setArch] = useState<MacArch>('unknown');
  useEffect(() => {
    if (!enabled) return;
    const uad = (navigator as Navigator & {
      userAgentData?: { getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }> };
    }).userAgentData;
    uad?.getHighEntropyValues?.(['architecture'])
      .then(({ architecture }) => {
        if (architecture === 'arm') setArch('arm64');
        else if (architecture === 'x86') setArch('x64');
      })
      .catch(() => {});
  }, [enabled]);
  return arch;
}
