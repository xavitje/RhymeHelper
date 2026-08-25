import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex text-sm font-mono text-muted-foreground" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
              {isLast || !item.path ? (
                <span className="text-foreground">{item.label}</span>
              ) : (
                <Link href={item.path} className="hover:text-primary transition-colors flex items-center">
                  {index === 0 && item.label === 'Home' ? <Home className="w-4 h-4 mr-1" /> : null}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
