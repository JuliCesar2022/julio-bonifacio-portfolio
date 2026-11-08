import Image from 'next/image';

import { Blocks } from '@/components/ui/Blocks';
import { Facts } from '@/features/page/Facts';
import page from '@/features/page/page.module.css';
import { cx } from '@/lib/cx';
import type { StoryChapter as Chapter } from '@/types/content';

import styles from './story.module.css';

/** Capítulo de "Mi historia": texto y fotos (o ficha de datos) lado a lado */
export function StoryChapter({ chapter }: { chapter: Chapter }) {
  const { step, title, blocks, photos, sideBySide, facts, flip } = chapter;
  return (
    <section className={cx(styles.chapter, flip && styles.flip, 'reveal')}>
      <div className={page.text}>
        <span className={page.step}>{step}</span>
        <h2>{title}</h2>
        <Blocks blocks={blocks} />
      </div>
      {facts && <Facts items={facts} />}
      {photos && (
        <div className={cx(styles.media, sideBySide && styles.two)}>
          {photos.map((photo) => (
            <figure key={photo.caption}>
              <Image
                src={photo.image}
                alt={photo.alt}
                sizes={sideBySide ? '(max-width: 820px) 46vw, 250px' : '(max-width: 820px) 92vw, 500px'}
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
