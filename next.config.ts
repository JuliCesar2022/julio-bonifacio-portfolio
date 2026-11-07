import type { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

export default function config(phase: string): NextConfig {
  // El dominio real se usa en la URL canónica, el sitemap y las tarjetas para redes:
  // sin él, Google indexaría direcciones equivocadas. Por eso el build se detiene si falta.
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error(
      'Falta NEXT_PUBLIC_SITE_URL (ej. https://tudominio.com). Ponla en .env.production o como variable de build en Dokploy.',
    );
  }

  return {
    // Sitio estático: `next build` genera HTML listo en /out y lo sirve Nginx (ver Dockerfile)
    output: 'export',
    // Sin servidor no hay optimizador de imágenes: scripts/image-variants.mjs genera versiones
    // más pequeñas al compilar y este loader le da a cada pantalla la que necesita
    images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' },
    // La raíz es esta carpeta (hay otro package-lock.json suelto en la carpeta de usuario)
    turbopack: { root: __dirname },
    // Sin cacheComponents: todo se genera al compilar, y con output 'export' esa opción
    // impide generar robots.txt y sitemap.xml
  };
}
