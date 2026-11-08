import Image from 'next/image';
import { Fragment } from 'react';

import julio from '@/assets/julio-bonifacio.webp';
import { routes, sections } from '@/config/routes';
import { about } from '@/content/home';
import { gallery } from '@/content/gallery';
import { site } from '@/content/site';
import { cx } from '@/lib/cx';

import styles from './about.module.css';
import { AboutScene } from './AboutScene';
import { Gallery } from './Gallery';

/** Cada palabra en su propio span: el título se enciende palabra por palabra al hacer scroll */
function Words({ text }: { text: string }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className={styles.word} data-anim="word">
        {word}
      </span>
    </Fragment>
  ));
}

const facts = [
  { label: 'Ubicación', value: site.city },
  { label: 'Estudios', value: site.studies },
  { label: 'Idiomas', value: site.languages },
];

/** Sobre mí (sección oscura) con la galería de fotos */
export function About() {
  return (
    <AboutScene className={styles.about} id={sections.about}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          <span className="light">
            <Words text={about.title.light} />
          </span>
          <br />
          <Words text={about.title.bold} />
        </h2>
        <div className={styles.card} data-anim="card">
          <Image className={styles.avatar} src={julio} alt={site.name} width={64} height={64} unoptimized />
          <p>{about.bio}</p>
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a className={cx('btn btn-light', styles.more)} href={routes.story}>
            {about.more} <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.galleryHead}>
          <p className="eyebrow">{about.gallery.eyebrow}</p>
          <p className={styles.galleryNote}>{about.gallery.note}</p>
        </div>
        <Gallery photos={gallery} />
      </div>
    </AboutScene>
  );
}
