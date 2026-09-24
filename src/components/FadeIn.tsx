import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

/**
 * Zachte fade/slide-in bij in beeld komen, puur CSS (scroll-driven animation, zie globals.css `.reveal`).
 * Inhoud is altijd zichtbaar zonder JS, in browsers zonder ondersteuning en bij "reduce motion".
 */
export function FadeIn({ children, className }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return <div className={cn('reveal', className)}>{children}</div>;
}
