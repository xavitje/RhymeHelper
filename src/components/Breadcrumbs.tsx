import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-1">
              {index > 0 && <ChevronRight aria-hidden className="size-3.5 text-text-faint" strokeWidth={1.75} />}
              {isLast || !item.path ? (
                <span aria-current={isLast ? 'page' : undefined} className="text-text">{item.label}</span>
              ) : (
                <Link href={item.path} className="rounded-sm transition-colors hover:text-text">{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
