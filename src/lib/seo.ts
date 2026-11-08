// Ayudas de SEO: metadatos por página y datos estructurados (JSON-LD) para Google.
import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';

import defaultShareImage from '@/assets/og/portafolio.jpg';
import { routes } from '@/config/routes';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { stack } from '@/content/stack';
import type { Project } from '@/types/content';

type ShareImage = { image: StaticImageData; alt: string };
type PageSeo = { title?: string; description: string; path: string; share?: ShareImage };

/** Imagen al compartir el sitio en redes (1200×630) */
const DEFAULT_SHARE: ShareImage = {
  image: defaultShareImage,
  alt: `${site.name}, ${site.role.toLowerCase()} en Cartagena: "${site.tagline}", con capturas de Camila AI, Bloqui, Cecar y el CRM de Cecar.`,
};

/**
 * Metadatos completos de una página. Next reemplaza (no mezcla) el bloque openGraph del layout,
 * así que cada página lo arma entero aquí, imagen para redes incluida.
 */
export function pageMetadata({ title, description, path, share = DEFAULT_SHARE }: PageSeo): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role} en Cartagena`;
  const images = [{ url: share.image.src, width: share.image.width, height: share.image.height, alt: share.alt }];
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images },
  };
}

const absolute = (path: string) => new URL(path, site.url).toString();
const personId = `${site.url}/#julio`;

/** Quién es Julio: Google lo usa para el panel de conocimiento y los resultados con tu nombre */
export function personJsonLd(image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    image: absolute(image),
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    description: site.description,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
    alumniOf: { '@type': 'CollegeOrUniversity', name: site.university },
    knowsAbout: [...stack.map((tech) => tech.name), 'Inteligencia artificial generativa', 'RAG', 'Blockchain'],
    knowsLanguage: ['es', 'en'],
    sameAs: Object.values(site.socials).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} — Portafolio`,
    url: site.url,
    inLanguage: 'es',
    author: { '@id': personId },
  };
}

/** Página "Mi historia": perfil de una persona */
export function profilePageJsonLd(path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: absolute(path),
    inLanguage: 'es',
    mainEntity: { '@id': personId, '@type': 'Person', name: site.name, url: site.url },
  };
}

/** Un proyecto como obra creada por Julio */
function creativeWork(project: Project) {
  return {
    '@type': 'CreativeWork',
    name: project.name,
    headline: project.tagline,
    description: project.summary,
    url: absolute(routes.project(project.slug)),
    image: absolute(project.shot.src),
    keywords: project.tags.join(', '),
    inLanguage: 'es',
    creator: { '@id': personId, '@type': 'Person', name: site.name },
    ...(project.link ? { sameAs: project.link.href } : {}),
  };
}

/** Página de proyectos: lista de los trabajos, cada uno con su página */
export function projectsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: absolute(routes.projects),
    itemListElement: projects.map((project, i) => ({ '@type': 'ListItem', position: i + 1, item: creativeWork(project) })),
  };
}

/** Página de un proyecto */
export function projectJsonLd(project: Project) {
  return { '@context': 'https://schema.org', ...creativeWork(project) };
}

/** Migas de pan para Google: Inicio › Proyectos › Camila AI */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: absolute(step.path),
    })),
  };
}
