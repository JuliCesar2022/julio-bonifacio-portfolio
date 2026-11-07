'use client';

import Image from 'next/image';
import { useRef, useState, type CSSProperties } from 'react';

import type { Photo } from '@/types/content';

// Ancho que ocupa cada foto del mosaico. object-fit: cover recorta, así que las celdas altas
// (a y c) necesitan una imagen más ancha que la celda
const PHOTO_SIZES: Record<Photo['area'], string> = {
  a: '(max-width: 820px) 130vw, 940px',
  b: '(max-width: 820px) 46vw, 300px',
  c: '(max-width: 820px) 60vw, 420px',
  d: '(max-width: 820px) 46vw, 300px',
};

/** Fotos en mosaico; al tocar una se abre en grande (se cierra con Esc, la X o tocando afuera) */
export function Gallery({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Photo | null>(null);

  const show = (photo: Photo) => {
    setOpen(photo);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <div className="gallery">
        {photos.map((photo) => (
          <figure
            key={photo.area}
            className={`photo photo-${photo.area}`}
            style={photo.focus ? ({ '--focus': photo.focus } as CSSProperties) : undefined}
          >
            <button className="photo-open" type="button" aria-label={`Ampliar foto: ${photo.label}`} onClick={() => show(photo)}>
              <Image src={photo.image} alt={photo.alt} sizes={PHOTO_SIZES[photo.area]} />
            </button>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        className="lightbox"
        aria-label="Foto ampliada"
        ref={dialogRef}
        onClick={(event) => event.target === event.currentTarget && close()}
        onClose={() => setOpen(null)}
      >
        {open && <Image src={open.image} alt={open.alt} style={{ width: 'auto', height: 'auto' }} />}
        <p className="lightbox-caption">{open?.caption}</p>
        <button className="lightbox-close" type="button" aria-label="Cerrar" onClick={close}>
          ×
        </button>
      </dialog>
    </>
  );
}
