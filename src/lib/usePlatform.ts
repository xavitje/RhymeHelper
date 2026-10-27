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
