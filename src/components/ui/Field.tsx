import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../../lib/cn';

/** Invoerveld met optioneel icoon links. Zelfde maten als de app (40px, raised, haarlijn). */
export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'> & { icon?: LucideIcon; mono?: boolean }>(
  function Input({ icon: Icon, mono, className, ...rest }, ref) {
    return (
      <div className="relative">
        {Icon && <Icon aria-hidden strokeWidth={1.75} className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted" />}
        <input
          ref={ref}
          className={cn(
            'h-10 w-full rounded-md border border-border-strong bg-raised px-3 text-[15px] text-text placeholder:text-text-faint',
            'transition-colors focus:border-iris focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-iris/25',
            Icon && 'pl-9',
            mono && 'font-mono text-sm',
            className,
          )}
          {...rest}
        />
      </div>
    );
  },
);

/** Label + veld + hulptekst. Het label is gekoppeld aan het eerste invoerveld via `id`. */
export function Field({ label, hint, children, id: idProp, className }: {
  label: string; hint?: ReactNode; id?: string; className?: string;
  children: (id: string) => ReactNode;
}) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div className={cn('grid gap-1.5', className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-text">{label}</label>
      {children(id)}
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

const tones = {
  error: { cls: 'border-danger/30 bg-danger/10 text-danger', icon: AlertCircle, role: 'alert' as const },
  success: { cls: 'border-success/30 bg-success/10 text-success', icon: CheckCircle2, role: 'status' as const },
  info: { cls: 'border-border bg-raised text-text-muted', icon: Info, role: 'status' as const },
};

/** Melding met icoon en woord, nooit alleen kleur. */
export function Alert({ tone = 'info', children, className }: { tone?: keyof typeof tones; children: ReactNode; className?: string }) {
  const t = tones[tone];
  return (
    <div role={t.role} className={cn('flex items-start gap-2.5 rounded-md border px-3 py-2.5 text-sm leading-snug', t.cls, className)}>
      <t.icon aria-hidden strokeWidth={1.75} className="mt-px size-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
