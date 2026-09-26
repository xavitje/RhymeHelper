import { Fragment } from 'react';
import { Kbd } from '../ui/Kbd';

/** Tekst met {Ctrl+K}-tokens → toetsen. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{') && p.endsWith('}') ? <Kbd key={i} keys={splitKeys(p.slice(1, -1))} /> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}

/** "Ctrl+Shift+T" → ['Ctrl','Shift','T']; losse "+" (bijv. zoom) blijft staan. */
export function splitKeys(combo: string) {
  if (combo === 'Ctrl+=') return ['Ctrl', '='];
  if (combo === 'Ctrl+-') return ['Ctrl', '-'];
  return combo.split('+');
}

/** "Ctrl+Z / Ctrl+Y" → toetsen met een schuine streep ertussen. */
export function KeyCombo({ combo }: { combo: string }) {
  const alts = combo.split(' / ');
  return (
    <span className="inline-flex flex-wrap items-center justify-end gap-1.5">
      {alts.map((a, i) => (
        <Fragment key={a}>
          {i > 0 && <span className="text-xs text-text-faint">/</span>}
          <Kbd keys={splitKeys(a)} />
        </Fragment>
      ))}
    </span>
  );
}
