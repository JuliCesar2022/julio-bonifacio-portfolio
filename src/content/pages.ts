// Textos de las páginas internas que no son de un proyecto ni de Mi historia.
import { homeSection, routes, sections } from '@/config/routes';
import type { PageEndContent, PageHeroContent } from '@/types/content';

export const projectsPage = {
  seo: {
    title: 'Proyectos',
    description:
      'Los proyectos de Julio Bonifacio: Camila AI, Bloqui, Cecar y Asociados, CRM Cecar y EduPlay, con videos y detalles de cada uno.',
  },
  hero: {
    eyebrow: 'Proyectos',
    title: { light: 'Lo que he', bold: 'construido' },
    lead: 'Cinco proyectos, de la investigación a empresas reales: qué problema resuelve cada uno, qué construí y cómo se ve funcionando.',
    back: { label: 'Volver al portafolio', href: homeSection(sections.projects) },
  } satisfies PageHeroContent,
  indexLabel: 'Ir a un proyecto',
  /** Enlace de cada proyecto en la lista */
  open: 'Ver proyecto',
  /** En la página de un proyecto */
  backToIndex: 'Todos los proyectos',
  previous: 'Anterior',
  next: 'Siguiente',
  navLabel: 'Más proyectos',
  end: {
    title: { light: '¿Tienes un proyecto', bold: 'en mente?' },
    link: { label: 'Conoce mi historia', href: routes.story },
  } satisfies PageEndContent,
};

export const notFoundPage = {
  title: 'Página no encontrada',
  eyebrow: 'Error 404',
  heading: { light: 'Esta página', bold: 'no existe' },
  lead: 'Puede que el enlace esté mal escrito o que la página se haya movido.',
  cta: { label: 'Ir al inicio', href: routes.home },
};
