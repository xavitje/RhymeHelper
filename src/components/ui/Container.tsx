import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn';

/** Paginabreedte: 1200px met 20px (mobiel) / 32px marge. `narrow` = leeskolom. */
export function Container({ className, narrow, ...rest }: ComponentPropsWithoutRef<'div'> & { narrow?: boolean }) {
  return <div className={cn('mx-auto w-full px-5 sm:px-8', narrow ? 'max-w-3xl' : 'max-w-[1200px]', className)} {...rest} />;
}
