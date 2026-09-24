import { useId } from 'react';
import { cn } from '../../lib/cn';

/** Het icoon (R met drie golfbalkjes op de Iris-tegel). Onder 32px automatisch de kleine variant. */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  const small = size <= 32;
  return (
    <svg viewBox="0 0 128 128" width={size} height={size} aria-hidden className={cn('shrink-0', className)}>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9587FF" />
          <stop offset="1" stopColor="#5A47E6" />
        </linearGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="30" fill={`url(#${id}g)`} />
      <rect width="128" height="128" rx="30" fill={`url(#${id}h)`} />
      {small ? (
        <path d="M44 98V30h26c14 0 23 8 23 21 0 9-5 16-13 19l16 28H80L66 73H57v25z M57 41v21h12c7 0 11-4 11-10.5S76 41 69 41z" fill="#fff" fillRule="evenodd" />
      ) : (
        <>
          <path d="M40 96V32h26c13 0 22 8 22 20 0 9-5 15-13 18l15 26H76L63 72H53v24z M53 43v18h12c6 0 10-3 10-9s-4-9-10-9z" fill="#fff" fillRule="evenodd" />
          <g fill="#fff" opacity=".85">
            <rect x="96" y="58" width="5" height="12" rx="2.5" />
            <rect x="104" y="52" width="5" height="24" rx="2.5" />
            <rect x="112" y="60" width="5" height="8" rx="2.5" />
          </g>
        </>
      )}
    </svg>
  );
}

/** Horizontale lockup: icoon + woordmerk in Geist 600. */
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={size} />
      <span className="font-semibold tracking-[-0.02em] text-text" style={{ fontSize: Math.round(size * 0.6) }}>
        Rhyme Helper
      </span>
    </span>
  );
}
