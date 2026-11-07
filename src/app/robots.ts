import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

// Se genera una sola vez al compilar (sitio estático)
export const dynamic = 'force-static';

// /robots.txt: todo el sitio se puede indexar y aquí está el mapa
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
