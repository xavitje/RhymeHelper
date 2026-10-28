import Image from 'next/image';
import { Mail } from 'lucide-react';
import { MAKER, MAKER_COPY } from '../../content/maker';
import type { Lang } from '../../i18n/routes';
import { ButtonLink, Section } from '../ui';

/** Wie Rhyme Helper maakt: foto of initialen-avatar, kort verhaal, directe mail. */
export function MakerBlock({ lang }: { lang: Lang }) {
  const t = MAKER_COPY[lang];
  return (
    <Section className="border-t border-border" narrow>
      <div className="grid gap-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-10">
        <div className="flex sm:block">
          {MAKER.photo ? (
            <Image src={MAKER.photo} width={112} height={112} alt={MAKER.name} className="size-20 rounded-full object-cover sm:size-28" />
          ) : (
            <span
              aria-hidden
              className="grid size-20 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,rgb(169_159_255),rgb(124_108_255)_55%,rgb(76_62_200))] text-2xl font-semibold tracking-[-0.02em] text-white shadow-float sm:size-28 sm:text-3xl"
            >
              {MAKER.initials}
            </span>
          )}
        </div>
        <div>
          <p className="text-[13px] font-medium text-iris-text">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">
            {t.title} <span className="text-text-muted">{t.accent}</span>
          </h2>
          <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-text-muted">
            {t.story.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <p className="text-[15px]"><span className="font-semibold">{MAKER.name}</span> <span className="text-text-muted">· {t.role}</span></p>
            <ButtonLink href={`mailto:${MAKER.email}`} variant="secondary" size="sm" icon={Mail}>{t.cta}</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
