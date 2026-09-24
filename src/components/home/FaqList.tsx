"use client";
import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../content/faq';
import { cn } from '../../lib/cn';

/** Accordeon: één vraag tegelijk open, knoppen met aria-expanded. */
export function FaqList({ items, className }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className={cn('divide-y divide-border rounded-xl border border-border bg-surface', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                id={`${id}-q`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-text transition-colors hover:bg-raised/60 sm:px-6"
              >
                {item.question}
                <ChevronDown aria-hidden strokeWidth={1.75} className={cn('size-4 shrink-0 text-text-muted transition-transform duration-200', isOpen && 'rotate-180')} />
              </button>
            </h3>
            <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} hidden={!isOpen} className="px-5 pb-5 text-[15px] leading-relaxed text-text-muted sm:px-6">
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
