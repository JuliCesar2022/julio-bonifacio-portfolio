import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Sitio estático: `next build` genera HTML listo en /out y lo sirve Nginx (ver Dockerfile)
  output: 'export',
  // Sin servidor no hay optimizador de imágenes: scripts/image-variants.mjs genera versiones
  // más pequeñas al compilar y este loader le da a cada pantalla la que necesita
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' },
  // La raíz es esta carpeta (hay otro package-lock.json suelto en la carpeta de usuario)
  turbopack: { root: __dirname },
  // Sin cacheComponents: todo se genera al compilar, y con output 'export' esa opción
  // impide generar robots.txt y sitemap.xml.
  // El dominio (NEXT_PUBLIC_SITE_URL) se valida en src/lib/env.ts.
};

export default nextConfig;
