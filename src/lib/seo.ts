// Ayudas de SEO: metadatos por página y datos estructurados (JSON-LD) para Google.
import type { Metadata } from 'next';

import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { stack } from '@/content/stack';

type PageSeo = { title?: string; description: string; path: string };

/**
 * Metadatos completos de una página. Next reemplaza (no mezcla) el bloque openGraph del layout,
 * así que cada página lo arma entero aquí. La imagen para redes sale de app/opengraph-image.png.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.role} en Cartagena`;
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
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
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

/** Página de proyectos: lista de los trabajos con su descripción */
export function projectsJsonLd(path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: absolute(path),
    itemListElement: projects.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.tagline,
        url: absolute(`${path}#${project.slug}`),
        image: absolute(project.shot.src),
        keywords: project.tags.join(', '),
        creator: { '@id': personId, '@type': 'Person', name: site.name },
        ...(project.link ? { sameAs: project.link.href } : {}),
      },
    })),
  };
}
