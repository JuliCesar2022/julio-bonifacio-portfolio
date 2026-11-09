// "Mi historia": capítulos en orden cronológico, con fotos entre el texto. El número de cada uno (01, 02…)
// sale de su posición: para mover un capítulo basta con cambiarlo de lugar en la lista.
// Texto con formato: **negrita** y [enlace](/ruta). Los comentarios "EDITA" marcan dónde vale la pena agregar algo tuyo.
// Fotos que aún faltan: { pending: 'qué foto va', caption: '…' } muestra un recuadro; cámbialo por
// { image, alt, caption } cuando tengas la foto (guárdala en src/assets/historia/).
import demoProyecto from '@/assets/galeria/demo-proyecto.webp';
import posterBloqui from '@/assets/galeria/poster-bloqui.webp';
import posterCamila from '@/assets/galeria/poster-camila-ai.webp';
import becaCalidad from '@/assets/historia/beca-calidad-2024.webp';
import diplomaBachiller from '@/assets/historia/diploma-bachiller.webp';
import diplomaTecnologo from '@/assets/historia/diploma-tecnologo.webp';
import gradoAcompanante from '@/assets/historia/grado-acompanante.webp';
import gradoTecnologoCelebracion from '@/assets/historia/grado-tecnologo-celebracion.webp';
import gradoTecnologo from '@/assets/historia/grado-tecnologo.webp';
import hepaiEquipo from '@/assets/historia/hepai-equipo.webp';
import keyboardsEquipo from '@/assets/historia/keyboards-equipo.webp';
import keyboardsEstudio from '@/assets/historia/keyboards-estudio.webp';
import keyboardsSitio from '@/assets/historia/keyboards-sitio.webp';
import llegadaUnisinu from '@/assets/historia/llegada-unisinu.webp';
import medifyEquipo from '@/assets/historia/medify-equipo.webp';
import midas from '@/assets/historia/midas.webp';
import promocion2021 from '@/assets/historia/promocion-2021.webp';
import { homeSection, routes, sections } from '@/config/routes';
import type { CaptionedPicture, PageEndContent, PageHeroContent, StoryChapter } from '@/types/content';

import { camilaStats, getProject } from './projects';
import { site } from './site';

export const storySeo = {
  title: 'Mi historia',
  description:
    'La historia de Julio Bonifacio: de Galapa, Atlántico, a Ingeniería de Sistemas en Cartagena. Sus proyectos, su media beca y el Encuentro Nacional de Semilleros.',
};

export const storyHero: PageHeroContent = {
  eyebrow: 'Mi historia',
  title: { light: 'Un poco de', bold: 'mi camino' },
  lead: 'De Galapa, un pueblo del Atlántico, a construir sistemas que la gente usa: cómo me enamoré de la programación y llegué a presentar mis proyectos a nivel nacional.',
  back: { label: 'Volver al portafolio', href: homeSection(sections.about) },
};

export const storyCover: CaptionedPicture = {
  image: demoProyecto,
  alt: 'Grupo frente a la demo de Camila AI proyectada en la pared',
  caption: 'Presentando Camila AI.',
};

/** Captura de un proyecto (de projects.ts) como foto del capítulo */
const shot = (slug: string, caption: string): CaptionedPicture => {
  const project = getProject(slug);
  return { image: project.shot, alt: project.shotAlt, caption };
};

export const storyChapters: StoryChapter[] = [
  {
    when: 'Infancia',
    title: 'De Galapa, Atlántico',
    blocks: [
      {
        type: 'paragraph',
        text: 'Nací en Colombia, en **Galapa**, un pueblo del Atlántico. Crecí con mi papá, mi mamá y mi hermana, en una familia humilde y de muy pocos recursos.',
      },
      {
        type: 'paragraph',
        text: 'Tenía unos **7 años** cuando escuché por primera vez las palabras **ingeniería de sistemas**. No sabía muy bien qué se hacía allí, y con el tiempo me desvié de esa idea… hasta que, años después, volvió con más fuerza.',
      },
    ],
  },
  {
    when: 'De los 14 a los 16 años',
    title: 'Me enamoré de la programación',
    mosaic: 'tall',
    photos: [
      {
        image: gradoAcompanante,
        alt: 'Julio con toga y birrete azules, abrazado a un señor de camisa blanca, el día de su grado',
        caption: 'El día de mi grado.',
      },
      {
        image: diplomaBachiller,
        alt: 'Julio recibe su diploma de bachiller técnico',
        caption: 'Mi diploma de bachiller técnico.',
      },
      {
        image: promocion2021,
        alt: 'La promoción 2021 del colegio con togas y birretes azules bajo un árbol',
        caption: 'Promoción 2021.',
        // Deja visible el letrero "Promo 2021" de abajo
        focus: '50% 100%',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'En **décimo grado**, en el **Colegio Francisco de Paula Santander**, me enamoré de verdad de la programación. Empecé por mi cuenta con **cursos gratuitos de HTML y CSS** en plataformas interactivas.',
      },
      {
        type: 'paragraph',
        text: 'Al año siguiente cursé **once**, el último grado, y me gradué de **bachiller técnico** con la **promoción 2021**, a los **16 años**.',
      },
    ],
  },
  {
    when: 'Después del colegio',
    title: 'La puerta que se abrió en Cartagena',
    photos: [
      {
        image: llegadaUnisinu,
        alt: 'Julio con la camisa de la Escuela de Ingeniería de Sistemas frente a la Universidad del Sinú',
        caption: 'Mi llegada a la Universidad del Sinú.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Al graduarme empecé a estudiar en una corporación como **asistente de sistemas**. Fue un dilema extraño: sentía que no era suficiente, pero no había muchos recursos para algo más.',
      },
      {
        type: 'paragraph',
        text: 'Fue entonces cuando conocí a mi primo **Sergio**, que vive en Cartagena y estudiaba justo lo que yo quería. Así encontré la carrera a un precio accesible en **Cartagena de Indias**, en la **Universidad del Sinú Elías Bechara Zainúm**. Pisar esa universidad fue muy emocionante: fue la que me abrió las puertas.',
      },
      {
        type: 'paragraph',
        text: 'Con ayuda de **créditos** he podido seguir estudiando hasta hoy. Cada día iba apasionado, contra el clima y los obstáculos, a demostrar mi mejor versión.',
      },
    ],
  },
  {
    when: '2023 – 2024',
    title: 'Mis primeros proyectos en la U',
    mosaic: 'wide',
    photos: [
      {
        image: keyboardsSitio,
        alt: 'Sitio web de Keyboards proyectado en clase, con un chat de atención al cliente',
        caption: 'Presentando Keyboards.',
      },
      {
        image: keyboardsEquipo,
        alt: 'El equipo de Keyboards con camisetas del proyecto frente a la diapositiva de cierre',
        caption: 'El equipo de Keyboards.',
      },
      {
        image: keyboardsEstudio,
        alt: 'El equipo de Keyboards en un estudio de grabación con pantalla verde y una cámara',
        caption: 'En el estudio de grabación.',
      },
      {
        image: medifyEquipo,
        alt: 'El equipo de Medify junto a su mesa con globos azules y blancos en la universidad',
        caption: 'El equipo de Medify.',
      },
      {
        image: hepaiEquipo,
        alt: 'Selfi de tres integrantes del equipo de HepAI en un auditorio',
        caption: 'Con el equipo de HepAI.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'En la universidad di lo mejor de mí desde el principio: cuando me pedían algo básico, yo quería hacer algo mucho mejor. Así nacieron mis primeros proyectos, **todos liderados por mí**:',
      },
      // EDITA: agrega una frase de qué hacían Medify y HepAI
      {
        type: 'list',
        items: [
          '**Keyboards**, en 2023, en segundo semestre: una empresa de soporte técnico para computadores, con su sitio web y un chat de atención al cliente.',
          '**Medify**, después.',
          '**HepAI**, en 2024, en cuarto semestre.',
        ],
      },
    ],
  },
  {
    when: '2024',
    title: 'Media beca por mi desempeño',
    mosaic: 'pair',
    photos: [
      {
        video: {
          src: '/videos/beca-calidad-2024.mp4',
          poster: '/videos/beca-calidad-2024-poster.webp',
          width: 464,
          height: 832,
        },
        label: 'Video de la ceremonia de entrega de la Beca de Calidad',
        caption: 'La ceremonia de entrega.',
      },
      {
        image: becaCalidad,
        alt: 'Certificado de la Beca de Calidad Saray Castilla de Bechara otorgado a Julio César Bonifacio Martínez',
        caption: 'Mi certificado, julio de 2024.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'En 2024, antes de cursar quinto semestre, la universidad me otorgó la **Beca de Calidad “Saray Castilla de Bechara”**, una media beca por mi desempeño en el primer periodo del año: obtuve un **promedio acumulado de 4,075**, el más alto de mi programa.',
      },
      {
        type: 'paragraph',
        text: 'Solo fue por un semestre, pero fue una experiencia muy gratificante después de todo mi esfuerzo.',
      },
      {
        type: 'paragraph',
        text: 'Después empecé a concentrarme en hacer proyectos para negocios y ganar algo de dinero, y descuidé un poco la universidad: mantuve un puntaje excepcional, aunque no el promedio más alto de mi carrera.',
      },
    ],
  },
  {
    // EDITA: when con el año de ClassMaster
    title: 'Mi primer sistema usable',
    blocks: [
      {
        type: 'paragraph',
        text: 'Así nació **ClassMaster**, un sistema de gestión con contrato junto a la universidad. No duró mucho tiempo, pero fue **el primer sistema usable que hice**.',
      },
    ],
  },
  {
    when: 'Febrero de 2025',
    title: 'Mi primer título',
    mosaic: 'tall',
    photos: [
      {
        image: gradoTecnologo,
        alt: 'Julio sostiene su diploma de tecnólogo junto a un señor de camisa a cuadros',
        caption: 'Con mi diploma de tecnólogo.',
      },
      {
        image: gradoTecnologoCelebracion,
        alt: 'Julio junto a dos personas frente a una pared de ladrillo, el día de su grado',
        caption: 'Celebrando el grado.',
      },
      {
        image: diplomaTecnologo,
        alt: 'Diploma de Tecnólogo en Gestión de Sistemas y Redes de Cómputo de la Universidad del Sinú',
        caption: 'Mi diploma, 11 de febrero de 2025.',
      },
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'El **11 de febrero de 2025** me gradué como **Tecnólogo en Gestión de Sistemas y Redes de Cómputo** de la Universidad del Sinú: mi primer título en la universidad.',
      },
      { type: 'paragraph', text: 'Y seguí adelante con **Ingeniería de Sistemas**.' },
    ],
  },
  {
    when: '2025',
    title: 'Cecar: un proyecto que sigo construyendo',
    photos: [
      shot('cecar', 'Cecar y Asociados: tours en Cartagena.'),
      shot('crm-cecar', 'El CRM de Cecar.'),
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Después del grado llegó **Cecar y Asociados**, un sistema turístico para una agencia de tours en Cartagena, con su sitio web y su **CRM**.',
      },
      {
        type: 'paragraph',
        text: 'Todavía sigo trabajando en él: la persona que hizo el contrato decidió aplazarlo y apenas lo estoy retomando.',
      },
      { type: 'link', link: { label: 'Ver Cecar', href: routes.project('cecar') } },
    ],
  },
  {
    when: '2025',
    title: 'Quspide: mi mejor momento',
    photos: [
      {
        image: midas,
        alt: 'Plataforma MIDAS con el panel de capas y el mapa de Cartagena de Indias',
        caption: 'MIDAS, en Quspide.',
      },
      shot('eduplay', 'EduPlay.'),
    ],
    blocks: [
      {
        type: 'paragraph',
        text: 'Después trabajé **durante un año** en **Quspide**, una empresa de Cartagena de Indias. Fue mi mejor momento. Allí hice parte del desarrollo de **MIDAS**, una plataforma de mapas de Cartagena con capas de información de la ciudad (ordenamiento territorial, transporte, salud, educación…) y un asistente con inteligencia artificial.',
      },
      {
        type: 'paragraph',
        text: 'Mientras tanto, en **enero de 2026**, empecé a emprender con **EduPlay**, un sistema que facilita los procesos de los profesores universitarios. Hoy tiene **cerca de 40 usuarios**.',
      },
      { type: 'link', link: { label: 'Ver EduPlay', href: routes.project('eduplay') } },
    ],
  },
  {
    title: 'Camila AI',
    photos: [shot('camila-ai', 'El panel de Camila AI.')],
    blocks: [
      {
        type: 'paragraph',
        text: 'Luego me contrataron para construir **Camila AI**, un asistente virtual de bienestar emocional con **inteligencia artificial generativa**: conversa por chat y por voz en tiempo real, registra cómo te sientes cada día y muestra tu progreso.',
      },
      {
        type: 'paragraph',
        text: 'Aunque el pago no era mucho, me esforcé en la **seguridad**: incluso armé un ecosistema con un **SSO propio de Camila**, un solo inicio de sesión para todos sus servicios.',
      },
      {
        type: 'paragraph',
        text: 'Funciona con **RAG** (se apoya en documentos especializados para responder) y la validamos con **8 expertos en psicología**:',
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
    title: 'Bloqui: algo totalmente diferente',
    photos: [shot('bloqui', 'Bloqui: aprender blockchain jugando.')],
    blocks: [
      {
        type: 'paragraph',
        text: 'Y por último, **Bloqui**: en parte un proyecto del semillero de investigación y en parte personal. Decidí hacer algo totalmente diferente a lo normal: **un avatar que habla y se expresa de forma interactiva**.',
      },
      {
        type: 'paragraph',
        text: 'Bloqui es una lúdica para sensibilizar sobre el uso de **blockchain** en la certificación de calidad nutricional en la cadena de suministro alimentaria de Cartagena. La construimos en equipo con Andrés David Rodríguez Camargo, Juan Camilo Guardo León, Angie Cassiani Zuluaga y Lina Mariana Salcedo Arias, con la dirección de Cielo Ester Marriaga González.',
      },
      { type: 'link', link: { label: 'Ver Bloqui', href: routes.project('bloqui') } },
    ],
  },
  {
    when: '9 de octubre de 2026',
    title: 'A nivel nacional',
    sideBySide: true,
    photos: [
      { image: posterCamila, alt: 'Dos estudiantes junto al póster de Camila AI en el encuentro', caption: 'Póster de Camila AI.' },
      {
        image: posterBloqui,
        alt: 'Julio y una compañera junto al póster de Bloqui, con un portátil que muestra la mascota',
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
    when: 'Hoy',
    title: 'Lo que sigue',
    blocks: [
      {
        type: 'paragraph',
        text: 'Hoy tengo **21 años**, estoy cursando **octavo semestre** de Ingeniería de Sistemas y voy para noveno.',
      },
      {
        type: 'paragraph',
        text: 'Algo que se repite en todo mi camino: **he liderado mis proyectos**, desde Keyboards hasta Bloqui. La excepción es Quspide, donde trabajé como parte del equipo de la empresa.',
      },
      {
        type: 'paragraph',
        text: 'Quiero seguir mejorando Camila con **detección automática de riesgo** y **reconocimiento de emociones** a través del rostro y la voz, fortalecer mi inglés y seguir construyendo productos que la gente use.',
      },
      // EDITA: agrega qué estás buscando ahora (trabajo, prácticas, proyectos freelance)
    ],
    // EDITA: la edad y el semestre cambian cada año
    facts: [
      { label: 'De', value: 'Galapa, Atlántico' },
      { label: 'Vivo en', value: site.city },
      { label: 'Edad', value: '21 años' },
      { label: 'Semestre', value: '8.º, voy para 9.º' },
      { label: 'Título', value: 'Tecnólogo en Gestión de Sistemas y Redes de Cómputo (2025)', wide: true },
      { label: 'Carrera', value: `${site.studies}, ${site.university}`, wide: true },
    ],
  },
];

export const storyEnd: PageEndContent = {
  title: { light: '¿Construimos algo', bold: 'juntos?' },
  link: { label: 'Volver al portafolio', href: routes.home },
};
