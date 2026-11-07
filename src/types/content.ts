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

export type CaptionedPicture = Picture & { caption: string };

export type Project = {
  /** Su dirección: /proyectos/<slug> */
  slug: string;
  name: string;
  /** Nombre corto en la tarjeta 3D de la portada */
  cardName: string;
  shot: StaticImageData;
  shotAlt: string;
  tagline: string;
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

export type StoryChapter = {
  step: string;
  title: string;
  blocks: Block[];
  /** Fotos al lado del texto */
  photos?: CaptionedPicture[];
  /** Fotos en dos columnas (si no, una debajo de otra) */
  sideBySide?: boolean;
  /** Ficha de datos al lado del texto */
  facts?: Fact[];
  /** Fotos a la izquierda */
  flip?: boolean;
};

/** Encabezado de las páginas internas: su último carácter se cambia por el ✳ animado */
export type PageHero = {
  eyebrow: string;
  title: TwoLineTitle;
  lead: string;
  back: Link;
};

/** Cierre de las páginas internas */
export type PageEnd = { title: TwoLineTitle; link: Link };
