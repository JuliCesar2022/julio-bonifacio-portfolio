// Forma de todo el contenido del sitio (src/content). Los componentes solo leen estos datos.
import type { StaticImageData } from 'next/image';

/**
 * Texto con formato mínimo, sin HTML:
 * - **negrita**
 * - [texto del enlace](https://… o /ruta o #ancla)
 */
export type RichText = string;

export type Link = { label: string; href: string };

export type Fact = { label: string; value: RichText; wide?: boolean };

export type Stat = { value: string; label: string };

/** Bloques con los que se arma un texto largo (capítulos, casos de estudio) */
export type Block =
  | { type: 'paragraph'; text: RichText }
  | { type: 'list'; items: RichText[] }
  | { type: 'stats'; items: Stat[] }
  | { type: 'link'; link: Link };

export type Section = { title: string; blocks: Block[] };

export type Picture = { image: StaticImageData; alt: string };

export type CaptionedPicture = Picture & {
  caption: string;
  /** Encuadre (X% Y%) cuando la foto se recorta, para no cortar lo importante */
  focus?: string;
};

export type Project = {
  /** Su dirección: /proyectos/<slug> */
  slug: string;
  name: string;
  /** Nombre corto en la tarjeta 3D de la portada */
  cardName: string;
  shot: StaticImageData;
  shotAlt: string;
  tagline: string;
  /** Resumen de 1–2 frases (120–160 caracteres): descripción para Google y tarjeta en /proyectos */
  summary: string;
  tags: string[];
  link?: Link;
  /** Repositorio público. Vacío = no se muestra el botón "Código" (ej. código privado) */
  repo?: string;
  /** Sin video se muestra la captura. El archivo va en /public/videos */
  video?: { src: string; poster: string; muted?: boolean };
  videoLabel: string;
  /** El reto, Lo que construí, Resultados… */
  sections: Section[];
  facts: Fact[];
};

export type Photo = Picture & {
  /** Celda del mosaico: a (grande), b, c (vertical) o d */
  area: 'a' | 'b' | 'c' | 'd';
  /** Texto del botón para lectores de pantalla: "Ampliar foto: …" */
  label: string;
  caption: string;
  /** Encuadre (X% Y%) para no cortar caras */
  focus?: string;
};

export type Tech = { name: string; logo: StaticImageData };

/** Título de dos líneas: la primera delgada, la segunda gruesa */
export type TwoLineTitle = { light: string; bold: string };

/** Lugar reservado para una foto que aún no está: se ve un recuadro con la descripción de la foto */
export type PhotoSlot = { pending: string; caption: string };

/** Video en un capítulo (archivo en /public/videos). Se descarga solo cuando le dan play */
export type StoryVideo = {
  video: { src: string; poster: string; width: number; height: number };
  /** Nombre para lectores de pantalla */
  label: string;
  caption: string;
};

/**
 * Capítulo de "Mi historia". Su número (01, 02…) sale de su posición en la lista, y las fotos
 * van a la derecha en los impares y a la izquierda en los pares
 */
export type StoryChapter = {
  /** Cuándo pasó (año, edad o etapa); va junto al número */
  when?: string;
  title: string;
  blocks: Block[];
  /** Fotos (o videos) al lado del texto, o recuadros para las que faltan */
  photos?: (CaptionedPicture | PhotoSlot | StoryVideo)[];
  /** Fotos en dos columnas (si no, una debajo de otra) */
  sideBySide?: boolean;
  /**
   * Varias fotos en mosaico:
   * - 'tall': tres, la primera grande a un lado y las otras dos apiladas (para una foto vertical)
   * - 'wide': la primera grande arriba y las demás debajo, de a dos (para fotos horizontales)
   * - 'grid': cuatro, en cuadrícula de 2 × 2
   * - 'pair': dos lado a lado, la primera vertical y más angosta (ej. un video de celular)
   */
  mosaic?: 'tall' | 'wide' | 'grid' | 'pair';
  /** Ficha de datos al lado del texto */
  facts?: Fact[];
};

/** Encabezado de las páginas internas: su último carácter se cambia por el ✳ animado */
export type PageHeroContent = {
  eyebrow: string;
  title: TwoLineTitle;
  lead: string;
  back: Link;
};

/** Cierre de las páginas internas */
export type PageEndContent = { title: TwoLineTitle; link: Link };
