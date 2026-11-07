// Datos personales y enlaces: se usan en el menú, el pie, contacto y el SEO.
// EDITA aquí y cambia en todo el sitio.

import { SITE_URL } from '@/lib/env';

export const site = {
  url: SITE_URL,
  name: 'Julio Bonifacio',
  legalName: 'Julio César Bonifacio Martínez',
  role: 'Desarrollador full stack',
  tagline: 'Convierto ideas en productos que se usan.',
  description:
    'Portafolio de Julio Bonifacio, desarrollador full stack en Cartagena de Indias. Proyectos como Camila AI, Bloqui y el CRM de Cecar, hechos con React, Angular, Node.js y NestJS.',
  keywords: [
    'Julio Bonifacio',
    'desarrollador full stack',
    'desarrollador web Cartagena',
    'programador Cartagena de Indias',
    'React',
    'Angular',
    'Node.js',
    'NestJS',
    'Camila AI',
    'Bloqui',
    'portafolio',
  ],
  locale: 'es_CO',
  city: 'Cartagena de Indias',
  country: 'CO',
  studies: 'Ingeniería de Sistemas',
  university: 'Universidad del Sinú, Seccional Cartagena',
  languages: 'Español, inglés básico',
  /** Años programando (bento, Mi historia) */
  experienceYears: 2,
  email: 'juliobonifacio53@gmail.com',
  whatsapp: {
    number: '573026736193',
    message: 'Hola Julio, vi tu portafolio y me gustaría hablar contigo.',
  },
  socials: {
    github: 'https://github.com/JuliCesar2022',
    linkedin: 'https://www.linkedin.com/in/julio-cesar-bonifacio-martinez-04b240352/',
    // EDITA: pon tu enlace y aparece solo en el pie de página
    instagram: '',
  },
  // EDITA: ruta del CV (ej. '/cv-julio-bonifacio.pdf' guardado en /public). Vacío = no se muestra
  cv: '',
  // Fecha de la última actualización del contenido (sitemap)
  updated: '2026-11-05',
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;
export const mailUrl = `mailto:${site.email}`;
