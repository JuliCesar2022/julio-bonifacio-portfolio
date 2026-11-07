import { Fragment } from 'react';

/** Escribe el texto pintando cada ✳ con el degradado de la marca */
export function StarText({ text }: { text: string }) {
  return text.split('✳').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="star">✳</span>}
      {part}
    </Fragment>
  ));
}
