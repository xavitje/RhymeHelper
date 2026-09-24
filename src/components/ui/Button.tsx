import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

/**
 * Knop volgens de brand guide.
 * primary = de ene actie per scherm (Iris) · secondary = raised + haarlijn · ghost = laag · pill = marketing-CTA (iris-deep, 48px).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none border border-transparent ' +
  'transition-[background-color,border-color,color] duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iris';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-iris text-on-iris hover:bg-iris-hover shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.25)]',
  secondary: 'bg-raised text-text border-border hover:bg-hover',
  ghost: 'bg-transparent text-text-muted hover:bg-raised hover:text-text',
  pill: 'bg-iris-deep text-on-iris hover:bg-iris rounded-full font-semibold',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px] rounded-md',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-5 text-[15px] font-semibold rounded-[11px]',
};

const pillSizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[17px]',
};

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

export function buttonClass({ variant = 'primary', size = 'md', fullWidth, className }: Omit<Common, 'icon' | 'iconRight' | 'children'>) {
  return cn(base, variants[variant], variant === 'pill' ? pillSizes[size] : sizes[size], fullWidth && 'w-full', className);
}

function Inner({ icon: Icon, iconRight: IconRight, children }: Pick<Common, 'icon' | 'iconRight' | 'children'>) {
  return (
    <>
      {Icon && <Icon aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />}
      {children}
      {IconRight && <IconRight aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />}
    </>
  );
}

export function Button({ variant, size, icon, iconRight, fullWidth, className, children, ...rest }: Common & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={buttonClass({ variant, size, fullWidth, className })} {...rest}>
      <Inner icon={icon} iconRight={iconRight}>{children}</Inner>
    </button>
  );
}

/** Link die eruitziet als een knop. Externe of download-links gebruiken <a>, interne next/link. */
export function ButtonLink({
  href, variant, size, icon, iconRight, fullWidth, className, children, external, ...rest
}: Common & { href: string; external?: boolean } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  const cls = buttonClass({ variant, size, fullWidth, className });
  const isPlain = external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/downloads/') || 'download' in rest;
  if (isPlain) {
    return (
      <a href={href} className={cls} {...rest}>
        <Inner icon={icon} iconRight={iconRight}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner icon={icon} iconRight={iconRight}>{children}</Inner>
    </Link>
  );
}
