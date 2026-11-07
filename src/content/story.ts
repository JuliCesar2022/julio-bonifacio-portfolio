// "Mi historia": capítulos en orden, con fotos entre el texto.
// Texto con formato: **negrita** y [enlace](/ruta). Los comentarios "EDITA" marcan dónde vale la pena agregar algo tuyo.
import demoProyecto from '@/assets/galeria/demo-proyecto.webp';
import posterBloqui from '@/assets/galeria/poster-bloqui.webp';
import posterCamila from '@/assets/galeria/poster-camila-ai.webp';
import { homeSection, routes, sections } from '@/config/routes';
import type { CaptionedPicture, PageEndContent, PageHeroContent, StoryChapter } from '@/types/content';

import { camilaStats, getProject, projects } from './projects';
import { site } from './site';

export const storySeo = {
  title: 'Mi historia',
  description:
    'La historia de Julio Bonifacio: estudiante de Ingeniería de Sistemas en Cartagena, sus proyectos y su paso por el Encuentro Nacional de Semilleros.',
};

export const storyHero: PageHeroContent = {
  eyebrow: 'Mi historia',
  title: { light: 'Un poco de', bold: 'mi camino' },
  lead: 'Cómo un estudiante de Ingeniería de Sistemas en Cartagena terminó presentando sus proyectos en un encuentro nacional de investigación.',
  back: { label: 'Volver al portafolio', href: homeSection(sections.about) },
};

export const storyCover: CaptionedPicture = {
  image: demoProyecto,
  alt: 'Grupo frente a la demo de Camila AI proyectada en la pared',
  caption: 'Presentando Camila AI.',
};

const shot = (slug: string, alt: string, caption: string): CaptionedPicture => ({
  image: getProject(slug).shot,
  alt,
  caption,
});

export const storyChapters: StoryChapter[] = [
  {
    step: '01',
    title: 'Hola, soy Julio',
    blocks: [
      {
        type: 'paragraph',
        text: 'Soy **Julio Bonifacio**, estudiante de **Ingeniería de Sistemas** en Cartagena de Indias. Llevo **más de dos años programando** y lo que más disfruto es llevar una idea de principio a fin: diseñar la interfaz, construir la API, conectar la base de datos y ver a alguien usando lo que hice.',
      },
      // EDITA: agrega un párrafo con cómo empezaste a programar (qué te llamó la atención, tu primer proyecto…)
      {
        type: 'paragraph',
        text: 'Esta es la versión corta de cómo esos proyectos fueron creciendo, de un sitio web para una empresa de Cartagena a dos investigaciones presentadas a nivel nacional.',
      },
    ],
    facts: [
      { label: 'Ubicación', value: site.city },
      { label: 'Estudios', value: site.studies },
      { label: 'Experiencia', value: `+${site.experienceYears} años programando` },
      { label: 'Proyectos', value: `${projects.length} entregados` },
    ],
  },
  {
    step: '02',
    title: 'Proyectos para una empresa real',
    flip: true,
    photos: [
      shot('cecar', 'Página de inicio de Cecar y Asociados con tours por el mar en Cartagena', 'Cecar y Asociados: tours en Cartagena.'),
      shot('crm-cecar', 'Panel del CRM de Cecar', 'El CRM de Cecar.'),
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Uno de mis retos más grandes fue **Cecar y Asociados**, una agencia de tours en Cartagena. Desarrollé su sitio web: un catálogo de tours con buscador, testimonios de clientes e inicio de sesión. Después vino el **CRM de Cecar**.',
      },
      // EDITA: agrega qué hace el CRM y qué aprendiste trabajando con un cliente
      {
        type: 'paragraph',
        text: 'También desarrollé **EduPlay**, una plataforma educativa. Cada proyecto me enseñó algo distinto: hablar con clientes, ordenar requisitos y entregar algo que funcione de verdad.',
      },
      { type: 'link', link: { label: 'Ver Cecar', href: 'https://cecar.forif.co/' } },
    ],
  },
  {
    step: '03',
    title: 'Investigar también es construir',
    photos: [shot('bloqui', 'Pantalla de Bloqui con la mascota naranja y las etapas del cultivo', 'Bloqui: aprender blockchain jugando.')],
    blocks: [
      {
        type: 'paragraph',
        text: 'En los semilleros de investigación de la universidad encontré otra forma de programar: usar la tecnología para resolver problemas de la ciudad. Así nació **Bloqui**, una lúdica interactiva para sensibilizar sobre el uso de **blockchain** en la certificación de calidad nutricional en la cadena de suministro alimentaria de Cartagena.',
      },
      {
        type: 'paragraph',
        text: 'Bloqui, nuestra mascota, convierte un tema complejo en un juego. Lo construimos en equipo con Andrés David Rodríguez Camargo, Juan Camilo Guardo León, Angie Cassiani Zuluaga y Lina Mariana Salcedo Arias, con la dirección de Cielo Ester Marriaga González.',
      },
    ],
  },
  {
    step: '04',
    title: 'Camila AI: tecnología que acompaña',
    flip: true,
    photos: [shot('camila-ai', 'Panel de Camila AI con chat, tiempo con Camila y recursos', 'El panel de Camila AI.')],
    blocks: [
      {
        type: 'paragraph',
        text: 'Después llegó **Camila AI**, un asistente virtual de bienestar emocional con **inteligencia artificial generativa**. Camila conversa por chat y por voz en tiempo real, ofrece estrategias de afrontamiento personalizadas, registra cómo te sientes cada día y muestra tu progreso.',
      },
      {
        type: 'paragraph',
        text: 'Funciona con **RAG** (generación aumentada por recuperación): se apoya en documentos especializados que orientan sus respuestas. La validamos con **8 expertos en psicología**:',
      },
      { type: 'stats', items: camilaStats },
      {
        type: 'paragraph',
        text: 'Gracias a María Claudia Bonfante Rodríguez por su aporte clave, y a Andrés David Rodríguez Camargo, Cielo Ester Marriaga González y Rocío Marilyn Vanegas. Camila es un apoyo y no reemplaza a un profesional de la salud mental.',
      },
      { type: 'link', link: { label: 'Probar Camila AI', href: 'https://camilai.com' } },
    ],
  },
  {
    step: '05',
    title: '9 de octubre de 2026: a nivel nacional',
    sideBySide: true,
    photos: [
      { image: posterCamila, alt: 'Dos estudiantes junto al póster de Camila AI en el encuentro', caption: 'Póster de Camila AI.' },
      {
        image: posterBloqui,
        alt: 'Estudiantes junto al póster de Bloqui, con un portátil que muestra la mascota',
        caption: 'Póster de Bloqui.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Ese día presenté **Camila AI** y **Bloqui** en el **Encuentro Nacional de Semilleros de Investigación**, en la Universidad del Sinú, sede Montería, representando a la Unisinú Seccional Cartagena.',
      },
      // EDITA: agrega cómo te sentiste, qué te preguntaron, qué te llevaste del evento
      {
        type: 'paragraph',
        text: 'Explicar dos proyectos frente a personas de todo el país fue la mejor forma de ponerlos a prueba y de llevarme nuevas ideas para mejorarlos.',
      },
    ],
  },
  {
    step: '06',
    title: 'Lo que sigue',
    blocks: [
      {
        type: 'paragraph',
        text: 'Quiero seguir mejorando Camila con **detección automática de riesgo** y **reconocimiento de emociones** a través del rostro y la voz, fortalecer mi inglés y seguir construyendo productos que la gente use.',
      },
      // EDITA: agrega qué estás buscando ahora (trabajo, prácticas, proyectos freelance)
    ],
  },
];

export const storyEnd: PageEndContent = {
  title: { light: '¿Construimos algo', bold: 'juntos?' },
  link: { label: 'Volver al portafolio', href: routes.home },
};
