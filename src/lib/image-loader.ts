// Loader de next/image para el sitio estático: en vez de un servidor que redimensiona,
// usa las versiones que genera scripts/image-variants.mjs al compilar.
// Para cada ancho que pide el navegador devuelve la versión más chica que alcanza, o el original.
import variants from './image-variants.json';

const available: Record<string, number[]> = variants;

// Imágenes importadas desde src/assets: /_next/static/media/<nombre>.<huella>.<ext>
const STATIC_MEDIA = /\/_next\/static\/media\/([^/.]+)\.[^/]+\.(?:webp|png|jpe?g)$/i;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const name = src.match(STATIC_MEDIA)?.[1];
  const best = name ? available[name]?.find((w) => w >= width) : undefined;
  // Sin versión que alcance (o es un SVG/imagen pequeña): el original
  return name && best ? `/_img/${name}-${best}.webp` : src;
}
