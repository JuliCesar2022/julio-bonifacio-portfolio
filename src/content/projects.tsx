// Proyectos: alimentan las tarjetas de la portada, el bento, /proyectos y los datos para Google.
// EDITA aquí el texto de cada proyecto. Los comentarios "EDITA" marcan dónde falta algo tuyo.
import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

import bloquiShot from '@/assets/proyectos/bloqui.webp';
import camilaShot from '@/assets/proyectos/camila-ai.webp';
import cecarShot from '@/assets/proyectos/cecar.webp';
import crmShot from '@/assets/proyectos/crm-cecar.webp';
import eduplayShot from '@/assets/proyectos/eduplay.webp';
import type { Fact } from '@/components/story/Facts';
import { Stats } from '@/components/ui/Stats';

export type Project = {
  /** Ancla en /proyectos (ej. /proyectos#camila) */
  slug: string;
  name: string;
  /** Nombre corto en la tarjeta 3D de la portada */
  cardName: string;
  shot: StaticImageData;
  shotAlt: string;
  tagline: string;
  tags: string[];
  link?: { label: string; href: string };
  /** Repositorio público. Vacío = no se muestra el botón "Código" (ej. código privado) */
  repo?: string;
  /** Sin video se muestra la captura. Pon el archivo en /public/videos y su ruta aquí */
  video?: { src: string; poster: string; muted?: boolean };
  videoLabel: string;
  challenge: ReactNode;
  built: ReactNode[];
  extra?: { title: string; content: ReactNode };
  facts: Fact[];
};

export const projects: Project[] = [
  {
    slug: 'camila',
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
    challenge: (
      <p>
        La <strong>ansiedad</strong> es cada vez más frecuente en jóvenes y estudiantes universitarios: dificulta el
        aprendizaje y afecta la concentración, la motivación y el rendimiento académico. Queríamos explorar cómo la
        inteligencia artificial puede apoyar la atención, desde la detección hasta el seguimiento.
      </p>
    ),
    built: [
      <>Conversación con Camila por <strong>chat y por llamada de voz en tiempo real</strong>.</>,
      <>Un modelo de lenguaje que genera respuestas empáticas y estrategias de afrontamiento personalizadas.</>,
      <>
        <strong>RAG</strong> (generación aumentada por recuperación): documentos especializados que orientan sus
        respuestas y su comportamiento.
      </>,
      <>Check-in diario de ánimo (del 1 al 10) y reportes de progreso.</>,
      <>Contenido de apoyo en video y gestión de citas con el psicólogo.</>,
      <>Modo invitado, modo claro y oscuro, y versión web y móvil.</>,
    ],
    extra: {
      title: 'Resultados',
      content: (
        <>
          <p>
            La validamos con <strong>8 expertos en psicología</strong>, con más del 76 % de aceptación en todas las
            dimensiones evaluadas:
          </p>
          <Stats />
          <p>
            Lo que sigue: detección automática de riesgo y reconocimiento de emociones a través del rostro y la voz.
            Camila es un apoyo y no reemplaza a un profesional de la salud mental.
          </p>
          {/* EDITA: tu rol en el proyecto y qué aprendiste */}
        </>
      ),
    },
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
    challenge: (
      <p>
        En Cartagena, los servicios de alimentación tienen dificultades para verificar el{' '}
        <strong>cálculo nutricional</strong> y la <strong>trazabilidad</strong> de los alimentos, y eso puede afectar la
        confianza y la salud pública. Blockchain puede mejorar estos procesos, pero los actores de la cadena de
        suministro desconocen sus beneficios y sus usos prácticos.
      </p>
    ),
    built: [
      <>Una lúdica interactiva guiada por <strong>Bloqui</strong>, nuestra mascota.</>,
      <>Retos para aprender jugando, como ordenar las etapas del cultivo del cacao para que la planta crezca.</>,
      <>Un diseño basado en el aprendizaje experiencial: entender blockchain haciendo, no memorizando.</>,
    ],
    extra: {
      title: 'Cómo lo trabajamos',
      content: (
        <p>
          Con un enfoque mixto en cinco etapas: diagnóstico con encuestas y observación, análisis de datos para encontrar
          brechas de conocimiento, diseño de la lúdica, aplicación con los participantes y evaluación del impacto
          comparando resultados.
        </p>
        // EDITA: tu rol en el proyecto y qué aprendiste
      ),
    },
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
    challenge: (
      // EDITA: qué necesitaba el cliente y por qué
      <p>
        Una agencia de tours por el mar y la ciudad que necesitaba un sitio web para{' '}
        <strong>mostrar sus experiencias</strong> y que sus clientes encontraran fácilmente el tour que buscan.
      </p>
    ),
    built: [
      <>Una portada con los tours destacados en tarjetas.</>,
      <><strong>Catálogo de tours con buscador</strong>.</>,
      <>Secciones de testimonios, nosotros y contacto.</>,
      <>Inicio de sesión para los clientes.</>,
    ],
    facts: [
      { label: 'Tipo', value: 'Proyecto para empresa' },
      { label: 'Estado', value: 'Publicado' },
      { label: 'Relacionado', value: <a href="#crm-cecar">CRM de Cecar</a>, wide: true },
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
    challenge: (
      // EDITA: cómo se manejaban antes las reservas y qué mejoró
      <p>
        Tener en un solo lugar el control de las <strong>reservas</strong>, los <strong>pagos</strong> y los{' '}
        <strong>clientes</strong> del negocio de tours.
      </p>
    ),
    built: [
      <>Un dashboard con los ingresos del período frente a la meta (mensual, trimestral y anual).</>,
      <>Estado de las reservas: activas, pendientes de pago y canceladas.</>,
      <>Actividad reciente del negocio y seguimiento de clientes nuevos.</>,
      <>Módulos de reservas, experiencias y clientes.</>,
      <>Modo claro y oscuro.</>,
    ],
    facts: [
      { label: 'Tipo', value: 'Proyecto para empresa' },
      { label: 'Relacionado', value: <a href="#cecar">Sitio de Cecar y Asociados</a>, wide: true },
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
    challenge: (
      // EDITA: para quién es EduPlay y qué problema resuelve
      <p>Darles a los docentes una vista clara de cómo va cada curso, con toda la gestión académica en un mismo lugar.</p>
    ),
    built: [
      <>
        Un <strong>dashboard por curso</strong>: estudiantes inscritos, promedio general, actividades creadas y tasa de
        entrega.
      </>,
      <>Gráficas de rendimiento por actividad, estado de entregas, progreso del curso y distribución de calificaciones.</>,
      <>Módulos de actividades, estudiantes, asistencia y calificaciones.</>,
      <>Planificación con calendario, syllabus y preparación de clase, además de reportes.</>,
    ],
    facts: [{ label: 'Tipo', value: 'Plataforma educativa' }],
  },
];

const bySlug = (slug: string) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Proyecto desconocido: ${slug}`);
  return project;
};

/** Orden de las tarjetas 3D de la portada (la primera queda adelante) */
export const heroProjects = ['bloqui', 'camila', 'eduplay', 'cecar', 'crm-cecar'].map(bySlug);
/** Tarjeta grande y borrosa en primer plano de la portada */
export const foregroundProject = bySlug('cecar');
/** Proyecto destacado del bento */
export const featuredProject = bySlug('cecar');
