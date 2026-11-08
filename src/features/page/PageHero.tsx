import { sections } from '@/config/routes';
import type { PageHeroContent } from '@/types/content';

import styles from './page.module.css';

/** Encabezado de las páginas internas: la última letra del título se cambia por el ✳ animado */
export function PageHero({ hero }: { hero: PageHeroContent }) {
  const { bold, light } = hero.title;
  return (
    <header className={styles.hero} id={sections.top}>
      <a className={styles.back} href={hero.back.href}>
        <span aria-hidden="true">←</span> {hero.back.label}
      </a>
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className={styles.title}>
        <span className="light">{light}</span>
        <br />
        {bold.slice(0, -1)}
        <span className="star" aria-hidden="true">
          ✳
        </span>
        <span className="sr-only">{bold.slice(-1)}</span>
      </h1>
      <p className={styles.lead}>{hero.lead}</p>
    </header>
  );
}
