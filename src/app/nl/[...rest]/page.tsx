import { notFound } from 'next/navigation';

/** Onbekende /nl-paden tonen de Nederlandse 404 (nl/not-found.tsx). */
export default function NlCatchAll() {
  notFound();
}
