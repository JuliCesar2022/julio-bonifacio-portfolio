// Textos de la portada, sección por sección. Texto con formato: **negrita** y [enlace](/ruta).

export const hero = {
  eyebrow: 'Portafolio · 2026',
  /** Frase completa (lectores de pantalla y Google) y las dos líneas que se escriben solas; ✳ = "o" */
  title: {
    label: 'Convierto ideas en productos que se usan.',
    light: 'Convierto ideas en',
    bold: 'pr✳ductos que se usan.',
  },
  intro:
    'Soy Julio Bonifacio y hago desarrollo full stack. He creado **Bloqui**, un juego que enseña blockchain; **Camila AI**, un asistente psicológico virtual, y el **CRM de Cecar**, una empresa real.',
  tags: [
    { label: 'Frontend', icon: 'code' },
    { label: 'Backend', icon: 'database' },
    { label: 'Diseño UI', icon: 'pen' },
  ],
  /** Tarjetas 3D: orden de los proyectos (el primero queda adelante) y la borrosa del primer plano */
  cards: ['bloqui', 'camila-ai', 'eduplay', 'cecar', 'crm-cecar'],
  foregroundCard: 'cecar',
} as const;

export const showcase = {
  left: { lines: ['Mira', 'mi'], bold: 'trabajo' },
  right: { lines: ['hecho para'], bold: 'web y móvil' },
  cta: { label: 'Probar Camila AI', href: 'https://camilai.com' },
  note: 'Puedes probarla sin registrarte.',
  /** Videos hechos con Remotion (C:\dev\video-camila) */
  videos: {
    desktop: {
      src: '/videos/camila-pc.mp4',
      poster: '/videos/camila-pc-poster.webp',
      label: 'Demo de Camila AI: inicio de sesión, panel, chat y reportes',
    },
    phone: {
      src: '/videos/camila-movil.mp4',
      poster: '/videos/camila-movil-poster.webp',
      label: 'Demo de Camila AI en celular: chat, llamada y contenido',
    },
  },
};

export const bento = {
  eyebrow: 'Lo que hago',
  title: { light: 'Proyectos y', bold: 'habilidades' },
  projectsLabel: 'proyectos entregados',
  pill: 'Full stack · Web y móvil',
  yearsLabel: 'años programando',
  featured: {
    kicker: 'Proyecto destacado',
    slug: 'cecar',
    summary:
      'Web de una agencia de tours en Cartagena: catálogo de tours con buscador, testimonios e inicio de sesión.',
  },
  backend: { title: 'Backend', text: 'APIs, autenticación y bases de datos.' },
  stackTitle: 'Stack',
  status: { label: 'Disponible para proyectos', cta: 'Ver todos mis proyectos' },
};

export const about = {
  title: { light: 'Un poco', bold: 'sobre mí' },
  bio: 'Soy estudiante de Ingeniería de Sistemas en Cartagena y llevo más de dos años construyendo aplicaciones web de principio a fin. Me gusta crear cosas que la gente use de verdad: desde un juego que enseña blockchain hasta un asistente de bienestar emocional con inteligencia artificial, que presenté en el Encuentro Nacional de Semilleros de Investigación.',
  more: 'Ver mi historia completa',
  gallery: { eyebrow: 'En acción', note: 'Presentando proyectos, eventos y trabajo en equipo.' },
};

export const marquee = { word: 'Hablemos' };

export const contact = {
  eyebrow: 'Contacto',
  title: { light: '¿Tienes un proyecto?', bold: 'Escríbeme' },
  whatsapp: 'WhatsApp',
};
