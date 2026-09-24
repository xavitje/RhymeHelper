import { cn } from '../../lib/cn';

/** Toetsen van een sneltoets, bijv. <Kbd keys={['Ctrl', 'K']} />. */
export function Kbd({ keys, className }: { keys: string[]; className?: string }) {
  return (
    <span className={cn('inline-flex gap-[3px] align-middle', className)}>
      {keys.map((k) => (
        <kbd
          key={k}
          className="inline-block min-w-[18px] rounded-[5px] border border-b-2 border-border-strong bg-raised px-[5px] text-center font-sans text-[11px] font-medium leading-[17px] text-text-muted"
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}
