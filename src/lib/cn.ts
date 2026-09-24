import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-klassen samenvoegen; latere klassen winnen. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
