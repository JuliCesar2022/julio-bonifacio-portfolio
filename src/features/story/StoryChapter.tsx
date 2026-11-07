import Image from 'next/image';

import { Blocks } from '@/components/ui/Blocks';
import type { StoryChapter as Chapter } from '@/types/content';

import { Facts } from './Facts';

/** Capítulo de "Mi historia": texto y fotos (o ficha de datos) lado a lado */
export function StoryChapter({ chapter }: { chapter: Chapter }) {
  const { step, title, blocks, photos, sideBySide, facts, flip } = chapter;
  return (
    <section className={flip ? 'story-chapter flip reveal' : 'story-chapter reveal'}>
      <div className="story-text">
        <span className="story-step">{step}</span>
        <h2>{title}</h2>
        <Blocks blocks={blocks} />
      </div>
      {facts && <Facts items={facts} />}
      {photos && (
        <div className={sideBySide ? 'story-media two' : 'story-media'}>
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
