import { marquee } from '@/content/home';

import styles from './marquee.module.css';
import { MarqueeScene } from './MarqueeScene';

/** Letras gigantes que se deslizan con el scroll */
export function Marquee() {
  return (
    <MarqueeScene className={styles.marquee} aria-hidden="true">
      <div className={styles.track} data-anim="track">
        <span>{marquee.word}</span>
        <span className="star">✳</span>
        <span className={styles.gradient}>{marquee.word}</span>
        <span className="star">✳</span>
        <span>{marquee.word}</span>
      </div>
    </MarqueeScene>
  );
}
