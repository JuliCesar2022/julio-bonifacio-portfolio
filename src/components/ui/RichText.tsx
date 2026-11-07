import { Fragment } from 'react';

import type { RichText as RichTextValue } from '@/types/content';

// **negrita** o [texto](enlace)
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Muestra texto del contenido con su formato mínimo (ver RichText en src/types/content.ts) */
export function RichText({ text }: { text: RichTextValue }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const [token, bold, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (bold) {
      parts.push(<strong key={match.index}>{bold}</strong>);
    } else {
      parts.push(
        <a key={match.index} href={href} {...(isExternal(href) ? { target: '_blank', rel: 'noopener' } : {})}>
          {label}
        </a>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}
