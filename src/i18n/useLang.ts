"use client";
import { usePathname } from 'next/navigation';
import { langFromPath, type Lang } from './routes';

/** Taal van de huidige pagina, afgeleid van het pad (/nl… = Nederlands). */
export function useLang(): Lang {
  return langFromPath(usePathname());
}
