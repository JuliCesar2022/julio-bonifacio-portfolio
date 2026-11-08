'use client';

import { useEffect } from 'react';

import { routes } from '@/config/routes';

// Antes cada proyecto era una sección de /proyectos (ej. /proyectos#camila).
// Los enlaces viejos que alguien haya guardado llevan ahora a la página del proyecto.
const OLD_ANCHORS: Record<string, string> = {
  camila: 'camila-ai',
};

/** Si se llega a /proyectos#algo y ese algo es un proyecto, va a su página */
export function LegacyHashRedirect({ slugs }: { slugs: string[] }) {
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const slug = OLD_ANCHORS[hash] ?? hash;
    if (slugs.includes(slug)) window.location.replace(routes.project(slug));
  }, [slugs]);

  return null;
}
