import type { MetadataRoute } from 'next';

import { routes } from '@/config/routes';
import { projects } from '@/content/projects';
import { site } from '@/content/site';

// Se genera una sola vez al compilar (sitio estático)
export const dynamic = 'force-static';

// Mapa del sitio para Google: /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: routes.home, priority: 1 },
    { path: routes.projects, priority: 0.9 },
    ...projects.map((project) => ({ path: routes.project(project.slug), priority: 0.8 })),
    { path: routes.story, priority: 0.8 },
  ];
  return pages.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    lastModified: site.updated,
    changeFrequency: 'monthly',
    priority,
  }));
}
