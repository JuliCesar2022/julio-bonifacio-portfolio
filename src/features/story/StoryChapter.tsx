import Image from 'next/image';

import { Blocks } from '@/components/ui/Blocks';
import { Facts } from '@/features/page/Facts';
import page from '@/features/page/page.module.css';
import { cx } from '@/lib/cx';
import type { StoryChapter as Chapter } from '@/types/content';

import styles from './story.module.css';

/** Capítulo de "Mi historia": texto y fotos (o ficha de datos) lado a lado */
/** flip: fotos a la izquierda */
export function StoryChapter({ chapter, step, flip }: { chapter: Chapter; step: string; flip: boolean }) {
  const { when, title, blocks, photos, sideBySide, mosaic, facts } = chapter;
  const full = '(max-width: 820px) 92vw, 500px';
  const half = '(max-width: 820px) 46vw, 250px';
  const sizes = (index: number) => {
    if (mosaic === 'wide') return index === 0 ? full : half;
    if (mosaic === 'tall') return index === 0 ? `(max-width: 560px) 92vw, ${half}` : half;
    if (mosaic === 'grid') return half;
    if (mosaic === 'pair') return '(max-width: 820px) 54vw, 290px';
    return sideBySide ? half : full;
  };
  return (
    <section className={cx(styles.chapter, flip && styles.flip, 'reveal')}>
      <div className={page.text}>
        <span className={page.step}>{step}</span>
        {when && <span className={styles.when}>{when}</span>}
        <h2>{title}</h2>
        <Blocks blocks={blocks} />
      </div>
      {facts && <Facts items={facts} />}
      {photos && (
        <div className={cx(styles.media, sideBySide && styles.two, mosaic && styles.mosaic, mosaic && styles[mosaic])}>
          {photos.map((photo, index) => (
            <figure key={photo.caption}>
              {'pending' in photo ? (
                // Foto que aún falta: recuadro con lo que va ahí
                <div className={styles.slot}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                    <circle cx="12" cy="13" r="3.5" />
                  </svg>
                  <span>Foto pendiente</span>
                  <small>{photo.pending}</small>
                </div>
              ) : 'video' in photo ? (
                // Con preload="none" no se descarga nada hasta que le dan play
                <video
                  className={styles.clip}
                  src={photo.video.src}
                  poster={photo.video.poster}
                  width={photo.video.width}
                  height={photo.video.height}
                  controls
                  playsInline
                  preload="none"
                  aria-label={photo.label}
                />
              ) : (
                <div className={styles.frame}>
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    sizes={sizes(index)}
                    style={photo.focus ? { objectPosition: photo.focus } : undefined}
                  />
                </div>
              )}
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
