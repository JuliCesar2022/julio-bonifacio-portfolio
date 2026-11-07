import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

// Se genera una sola vez al compilar (sitio estático)
export const dynamic = 'force-static';

// Mapa del sitio para Google: /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1 },
    { path: '/proyectos', priority: 0.9 },
    { path: '/historia', priority: 0.8 },
  ];
  return pages.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    lastModified: site.updated,
    changeFrequency: 'monthly',
    priority,
  }));
}
