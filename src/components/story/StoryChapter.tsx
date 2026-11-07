import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type ChapterPhoto = { image: StaticImageData; alt: string; caption: string };

type Props = {
  step: string;
  title: string;
  children: ReactNode;
  /** Fotos al lado del texto */
  photos?: ChapterPhoto[];
  /** Contenido a la derecha en vez de fotos (ej. la ficha de datos) */
  aside?: ReactNode;
  /** Fotos a la izquierda */
  flip?: boolean;
  /** Fotos en dos columnas (si no, una debajo de otra) */
  sideBySide?: boolean;
};

/** Capítulo de "Mi historia": texto y fotos lado a lado */
export function StoryChapter({ step, title, children, photos, aside, flip, sideBySide }: Props) {
  return (
    <section className={flip ? 'story-chapter flip reveal' : 'story-chapter reveal'}>
      <div className="story-text">
        <span className="story-step">{step}</span>
        <h2>{title}</h2>
        {children}
      </div>
      {aside}
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
