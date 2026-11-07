// Todas las direcciones del sitio en un solo lugar: menú, pie, enlaces internos, sitemap y SEO.

export const routes = {
  home: '/',
  projects: '/proyectos',
  story: '/historia',
  project: (slug: string) => `/proyectos/${slug}`,
} as const;

/** Secciones de la portada (id del elemento) */
export const sections = {
  top: 'inicio',
  projects: 'proyectos',
  about: 'sobre-mi',
  contact: 'contacto',
} as const;

/** Enlace a una sección de la portada desde cualquier página (ej. /#contacto) */
export const homeSection = (id: (typeof sections)[keyof typeof sections]) => `${routes.home}#${id}`;
