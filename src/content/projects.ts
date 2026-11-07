// Proyectos: alimentan las tarjetas de la portada, el bento, /proyectos, la página de cada uno y el SEO.
// Texto con formato: **negrita** y [enlace](/ruta). Los comentarios "EDITA" marcan dónde falta algo tuyo.
import bloquiShot from '@/assets/proyectos/bloqui.webp';
import camilaShot from '@/assets/proyectos/camila-ai.webp';
import cecarShot from '@/assets/proyectos/cecar.webp';
import crmShot from '@/assets/proyectos/crm-cecar.webp';
import eduplayShot from '@/assets/proyectos/eduplay.webp';
import type { Project, Stat } from '@/types/content';

/** Validación de Camila AI con 8 expertos en psicología (también aparece en Mi historia) */
export const camilaStats: Stat[] = [
  { value: '96%', label: 'usabilidad' },
  { value: '88%', label: 'validez clínica' },
  { value: '88%', label: 'adaptabilidad' },
];

export const projects: Project[] = [
  {
    slug: 'camila-ai',
    name: 'Camila AI',
    cardName: 'Camila AI',
    shot: camilaShot,
    shotAlt: 'Panel de Camila AI con chat, tiempo con Camila y recursos',
    tagline: 'Asistente virtual de bienestar emocional con inteligencia artificial generativa.',
    tags: ['IA generativa', 'RAG', 'Voz en tiempo real', 'Investigación'],
    link: { label: 'Probar Camila AI', href: 'https://camilai.com' },
    // EDITA: cambia por un video más completo (ej. /videos/camila.mp4)
    video: { src: '/videos/camila-pc.mp4', poster: '/videos/camila-pc-poster.webp', muted: true },
    videoLabel: 'Demo de Camila AI: inicio de sesión, panel, chat, llamada, contenido y modo oscuro',
    sections: [
      {
        title: 'El reto',
        blocks: [
          {
            type: 'paragraph',
            text: 'La **ansiedad** es cada vez más frecuente en jóvenes y estudiantes universitarios: dificulta el aprendizaje y afecta la concentración, la motivación y el rendimiento académico. Queríamos explorar cómo la inteligencia artificial puede apoyar la atención, desde la detección hasta el seguimiento.',
          },
        ],
      },
      {
        title: 'Lo que construí',
        blocks: [
          {
            type: 'list',
            items: [
              'Conversación con Camila por **chat y por llamada de voz en tiempo real**.',
              'Un modelo de lenguaje que genera respuestas empáticas y estrategias de afrontamiento personalizadas.',
              '**RAG** (generación aumentada por recuperación): documentos especializados que orientan sus respuestas y su comportamiento.',
              'Check-in diario de ánimo (del 1 al 10) y reportes de progreso.',
              'Contenido de apoyo en video y gestión de citas con el psicólogo.',
              'Modo invitado, modo claro y oscuro, y versión web y móvil.',
            ],
          },
        ],
      },
      {
        title: 'Resultados',
        blocks: [
          {
            type: 'paragraph',
            text: 'La validamos con **8 expertos en psicología**, con más del 76 % de aceptación en todas las dimensiones evaluadas:',
          },
          { type: 'stats', items: camilaStats },
          {
            type: 'paragraph',
            text: 'Lo que sigue: detección automática de riesgo y reconocimiento de emociones a través del rostro y la voz. Camila es un apoyo y no reemplaza a un profesional de la salud mental.',
          },
          // EDITA: agrega un párrafo con tu rol en el proyecto y qué aprendiste
        ],
      },
    ],
    facts: [
      { label: 'Tipo', value: 'Investigación · Semillero' },
      { label: 'Presentado en', value: 'Encuentro Nacional de Semilleros 2026' },
      {
        label: 'Equipo',
        value:
          'Andrés David Rodríguez Camargo, María Claudia Bonfante Rodríguez, Cielo Ester Marriaga González y Rocío Marilyn Vanegas',
        wide: true,
      },
    ],
  },
  {
    slug: 'bloqui',
    name: 'Bloqui',
    cardName: 'Bloqui',
    shot: bloquiShot,
    shotAlt: 'Pantalla de Bloqui con la mascota naranja y las etapas del cultivo',
    tagline:
      'Lúdica interactiva para entender cómo blockchain aporta confianza a la calidad nutricional de los alimentos.',
    tags: ['Blockchain', 'Lúdica interactiva', 'Investigación'],
    videoLabel: 'Demo de Bloqui',
    sections: [
      {
        title: 'El reto',
        blocks: [
          {
            type: 'paragraph',
            text: 'En Cartagena, los servicios de alimentación tienen dificultades para verificar el **cálculo nutricional** y la **trazabilidad** de los alimentos, y eso puede afectar la confianza y la salud pública. Blockchain puede mejorar estos procesos, pero los actores de la cadena de suministro desconocen sus beneficios y sus usos prácticos.',
          },
        ],
      },
      {
        title: 'Lo que construí',
        blocks: [
          {
            type: 'list',
            items: [
              'Una lúdica interactiva guiada por **Bloqui**, nuestra mascota.',
              'Retos para aprender jugando, como ordenar las etapas del cultivo del cacao para que la planta crezca.',
              'Un diseño basado en el aprendizaje experiencial: entender blockchain haciendo, no memorizando.',
            ],
          },
        ],
      },
      {
        title: 'Cómo lo trabajamos',
        blocks: [
          {
            type: 'paragraph',
            text: 'Con un enfoque mixto en cinco etapas: diagnóstico con encuestas y observación, análisis de datos para encontrar brechas de conocimiento, diseño de la lúdica, aplicación con los participantes y evaluación del impacto comparando resultados.',
          },
          // EDITA: agrega un párrafo con tu rol en el proyecto y qué aprendiste
        ],
      },
    ],
    facts: [
      { label: 'Tipo', value: 'Investigación · Semillero' },
      { label: 'Presentado en', value: 'Encuentro Nacional de Semilleros 2026' },
      {
        label: 'Equipo',
        value: 'Andrés David Rodríguez Camargo, Juan Camilo Guardo León, Angie Cassiani Zuluaga y Lina Mariana Salcedo Arias',
        wide: true,
      },
      { label: 'Dirección', value: 'Cielo Ester Marriaga González', wide: true },
    ],
  },
  {
    slug: 'cecar',
    name: 'Cecar y Asociados',
    cardName: 'Cecar',
    shot: cecarShot,
    shotAlt: 'Página de inicio de Cecar y Asociados: tours por el mar en Cartagena',
    tagline: 'Sitio web de una agencia de tours en Cartagena.',
    tags: ['Sitio web', 'Turismo', 'Empresa real'],
    link: { label: 'Ver demo', href: 'https://cecar.forif.co/' },
    // EDITA: enlace al código en GitHub (si es privado, déjalo vacío)
    repo: '',
    videoLabel: 'Demo del sitio de Cecar y Asociados',
    sections: [
      {
        title: 'El reto',
        blocks: [
          // EDITA: qué necesitaba el cliente y por qué
          {
            type: 'paragraph',
            text: 'Una agencia de tours por el mar y la ciudad que necesitaba un sitio web para **mostrar sus experiencias** y que sus clientes encontraran fácilmente el tour que buscan.',
          },
        ],
      },
      {
        title: 'Lo que construí',
        blocks: [
          {
            type: 'list',
            items: [
              'Una portada con los tours destacados en tarjetas.',
              '**Catálogo de tours con buscador**.',
              'Secciones de testimonios, nosotros y contacto.',
              'Inicio de sesión para los clientes.',
            ],
          },
          // EDITA: agrega un párrafo con tu rol, tecnologías usadas y qué aprendiste trabajando con un cliente
        ],
      },
    ],
    facts: [
      { label: 'Tipo', value: 'Proyecto para empresa' },
      { label: 'Estado', value: 'Publicado' },
      { label: 'Relacionado', value: '[CRM de Cecar](#crm-cecar)', wide: true },
    ],
  },
  {
    slug: 'crm-cecar',
    name: 'CRM Cecar',
    cardName: 'CRM Cecar',
    shot: crmShot,
    shotAlt: 'Panel del CRM de Cecar',
    tagline: 'Panel de gestión para el negocio de tours de Cecar y Asociados.',
    tags: ['CRM', 'Dashboard', 'Empresa real'],
    videoLabel: 'Demo del CRM de Cecar',
    sections: [
      {
        title: 'El reto',
        blocks: [
          // EDITA: cómo se manejaban antes las reservas y qué mejoró
          {
            type: 'paragraph',
            text: 'Tener en un solo lugar el control de las **reservas**, los **pagos** y los **clientes** del negocio de tours.',
          },
        ],
      },
      {
        title: 'Lo que construí',
        blocks: [
          {
            type: 'list',
            items: [
              'Un dashboard con los ingresos del período frente a la meta (mensual, trimestral y anual).',
              'Estado de las reservas: activas, pendientes de pago y canceladas.',
              'Actividad reciente del negocio y seguimiento de clientes nuevos.',
              'Módulos de reservas, experiencias y clientes.',
              'Modo claro y oscuro.',
            ],
          },
          // EDITA: agrega un párrafo con tu rol, tecnologías usadas y qué aprendiste
        ],
      },
    ],
    facts: [
      { label: 'Tipo', value: 'Proyecto para empresa' },
      { label: 'Relacionado', value: '[Sitio de Cecar y Asociados](#cecar)', wide: true },
    ],
  },
  {
    slug: 'eduplay',
    name: 'EduPlay',
    cardName: 'EduPlay',
    shot: eduplayShot,
    shotAlt: 'Dashboard de un curso en EduPlay con gráficas de rendimiento',
    tagline: 'Plataforma para gestionar cursos: actividades, estudiantes, asistencia y calificaciones.',
    tags: ['Educación', 'Dashboard', 'Analítica'],
    videoLabel: 'Demo de EduPlay',
    sections: [
      {
        title: 'El reto',
        blocks: [
          // EDITA: para quién es EduPlay y qué problema resuelve
          {
            type: 'paragraph',
            text: 'Darles a los docentes una vista clara de cómo va cada curso, con toda la gestión académica en un mismo lugar.',
          },
        ],
      },
      {
        title: 'Lo que construí',
        blocks: [
          {
            type: 'list',
            items: [
              'Un **dashboard por curso**: estudiantes inscritos, promedio general, actividades creadas y tasa de entrega.',
              'Gráficas de rendimiento por actividad, estado de entregas, progreso del curso y distribución de calificaciones.',
              'Módulos de actividades, estudiantes, asistencia y calificaciones.',
              'Planificación con calendario, syllabus y preparación de clase, además de reportes.',
            ],
          },
          // EDITA: agrega un párrafo con tu rol, tecnologías usadas y qué aprendiste
        ],
      },
    ],
    facts: [{ label: 'Tipo', value: 'Plataforma educativa' }],
  },
];

/** Busca un proyecto por su slug (falla al compilar si no existe, así no queda un enlace roto) */
export function getProject(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Proyecto desconocido: ${slug}`);
  return project;
}
