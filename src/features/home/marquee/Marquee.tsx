import { marquee } from '@/content/home';

import { MarqueeScene } from './MarqueeScene';

/** Letras gigantes que se deslizan con el scroll */
export function Marquee() {
  return (
    <MarqueeScene className="marquee" aria-hidden="true">
      <div className="marquee-track" data-anim="track">
        <span>{marquee.word}</span>
        <span className="star">✳</span>
        <span className="grad">{marquee.word}</span>
        <span className="star">✳</span>
        <span>{marquee.word}</span>
      </div>
    </MarqueeScene>
  );
}
