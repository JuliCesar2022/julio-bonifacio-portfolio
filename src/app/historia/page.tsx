import type { Metadata } from 'next';
import Image from 'next/image';

import demoProyecto from '@/assets/galeria/demo-proyecto.webp';
import posterBloqui from '@/assets/galeria/poster-bloqui.webp';
import posterCamila from '@/assets/galeria/poster-camila-ai.webp';
import { Facts } from '@/components/story/Facts';
import { StoryChapter } from '@/components/story/StoryChapter';
import { StoryEnd } from '@/components/story/StoryEnd';
import { StoryHero } from '@/components/story/StoryHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { Stats } from '@/components/ui/Stats';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { pageMetadata, profilePageJsonLd } from '@/lib/seo';

const PATH = '/historia';

export const metadata: Metadata = pageMetadata({
  title: 'Mi historia',
  description:
    'La historia de Julio Bonifacio: estudiante de Ingeniería de Sistemas en Cartagena, sus proyectos y su paso por el Encuentro Nacional de Semilleros.',
  path: PATH,
});

const shot = (slug: string) => projects.find((p) => p.slug === slug)!.shot;

// MI HISTORIA: capítulos en orden, con fotos entre el texto.
// EDITA: los comentarios "EDITA" marcan dónde vale la pena agregar algo tuyo
export default function HistoriaPage() {
  return (
    <main className="story">
      <StoryHero
        eyebrow="Mi historia"
        light="Un poco de"
        bold="mi camino"
        lead="Cómo un estudiante de Ingeniería de Sistemas en Cartagena terminó presentando sus proyectos en un encuentro nacional de investigación."
        backHref="/#sobre-mi"
      />

      <figure className="story-cover reveal">
        <Image
          src={demoProyecto}
          alt="Grupo frente a la demo de Camila AI proyectada en la pared"
          sizes="(max-width: 1120px) 92vw, 1030px"
          preload
        />
        <figcaption>Presentando Camila AI.</figcaption>
      </figure>

      <StoryChapter
        step="01"
        title="Hola, soy Julio"
        aside={
          <Facts
            items={[
              { label: 'Ubicación', value: site.city },
              { label: 'Estudios', value: site.studies },
              { label: 'Experiencia', value: '+2 años programando' },
              { label: 'Proyectos', value: `${projects.length} entregados` },
            ]}
          />
        }
      >
        <p>
          Soy <strong>Julio Bonifacio</strong>, estudiante de <strong>Ingeniería de Sistemas</strong> en Cartagena de
          Indias. Llevo <strong>más de dos años programando</strong> y lo que más disfruto es llevar una idea de
          principio a fin: diseñar la interfaz, construir la API, conectar la base de datos y ver a alguien usando lo
          que hice.
        </p>
        {/* EDITA: cuenta aquí cómo empezaste a programar (qué te llamó la atención, tu primer proyecto…) */}
        <p>
          Esta es la versión corta de cómo esos proyectos fueron creciendo, de un sitio web para una empresa de
          Cartagena a dos investigaciones presentadas a nivel nacional.
        </p>
      </StoryChapter>

      <StoryChapter
        step="02"
        title="Proyectos para una empresa real"
        flip
        photos={[
          {
            image: shot('cecar'),
            alt: 'Página de inicio de Cecar y Asociados con tours por el mar en Cartagena',
            caption: 'Cecar y Asociados: tours en Cartagena.',
          },
          { image: shot('crm-cecar'), alt: 'Panel del CRM de Cecar', caption: 'El CRM de Cecar.' },
        ]}
      >
        <p>
          Uno de mis retos más grandes fue <strong>Cecar y Asociados</strong>, una agencia de tours en Cartagena.
          Desarrollé su sitio web: un catálogo de tours con buscador, testimonios de clientes e inicio de sesión.
          Después vino el <strong>CRM de Cecar</strong>.
        </p>
        {/* EDITA: qué hace el CRM y qué aprendiste trabajando con un cliente */}
        <p>
          También desarrollé <strong>EduPlay</strong>, una plataforma educativa. Cada proyecto me enseñó algo distinto:
          hablar con clientes, ordenar requisitos y entregar algo que funcione de verdad.
        </p>
        <a className="pill-link" href="https://cecar.forif.co/" target="_blank" rel="noopener">
          Ver Cecar <span aria-hidden="true">↗</span>
        </a>
      </StoryChapter>

      <StoryChapter
        step="03"
        title="Investigar también es construir"
        photos={[
          {
            image: shot('bloqui'),
            alt: 'Pantalla de Bloqui con la mascota naranja y las etapas del cultivo',
            caption: 'Bloqui: aprender blockchain jugando.',
          },
        ]}
      >
        <p>
          En los semilleros de investigación de la universidad encontré otra forma de programar: usar la tecnología para
          resolver problemas de la ciudad. Así nació <strong>Bloqui</strong>, una lúdica interactiva para sensibilizar
          sobre el uso de <strong>blockchain</strong> en la certificación de calidad nutricional en la cadena de
          suministro alimentaria de Cartagena.
        </p>
        <p>
          Bloqui, nuestra mascota, convierte un tema complejo en un juego. Lo construimos en equipo con Andrés David
          Rodríguez Camargo, Juan Camilo Guardo León, Angie Cassiani Zuluaga y Lina Mariana Salcedo Arias, con la
          dirección de Cielo Ester Marriaga González.
        </p>
      </StoryChapter>

      <StoryChapter
        step="04"
        title="Camila AI: tecnología que acompaña"
        flip
        photos={[
          {
            image: shot('camila'),
            alt: 'Panel de Camila AI con chat, tiempo con Camila y recursos',
            caption: 'El panel de Camila AI.',
          },
        ]}
      >
        <p>
          Después llegó <strong>Camila AI</strong>, un asistente virtual de bienestar emocional con{' '}
          <strong>inteligencia artificial generativa</strong>. Camila conversa por chat y por voz en tiempo real, ofrece
          estrategias de afrontamiento personalizadas, registra cómo te sientes cada día y muestra tu progreso.
        </p>
        <p>
          Funciona con <strong>RAG</strong> (generación aumentada por recuperación): se apoya en documentos
          especializados que orientan sus respuestas. La validamos con <strong>8 expertos en psicología</strong>:
        </p>
        <Stats />
        <p>
          Gracias a María Claudia Bonfante Rodríguez por su aporte clave, y a Andrés David Rodríguez Camargo, Cielo Ester
          Marriaga González y Rocío Marilyn Vanegas. Camila es un apoyo y no reemplaza a un profesional de la salud
          mental.
        </p>
        <a className="pill-link" href="https://camilai.com" target="_blank" rel="noopener">
          Probar Camila AI <span aria-hidden="true">↗</span>
        </a>
      </StoryChapter>

      <StoryChapter
        step="05"
        title="9 de octubre de 2026: a nivel nacional"
        sideBySide
        photos={[
          {
            image: posterCamila,
            alt: 'Dos estudiantes junto al póster de Camila AI en el encuentro',
            caption: 'Póster de Camila AI.',
          },
          {
            image: posterBloqui,
            alt: 'Estudiantes junto al póster de Bloqui, con un portátil que muestra la mascota',
            caption: 'Póster de Bloqui.',
          },
        ]}
      >
        <p>
          Ese día presenté <strong>Camila AI</strong> y <strong>Bloqui</strong> en el{' '}
          <strong>Encuentro Nacional de Semilleros de Investigación</strong>, en la Universidad del Sinú, sede Montería,
          representando a la Unisinú Seccional Cartagena.
        </p>
        {/* EDITA: cómo te sentiste, qué te preguntaron, qué te llevaste del evento */}
        <p>
          Explicar dos proyectos frente a personas de todo el país fue la mejor forma de ponerlos a prueba y de llevarme
          nuevas ideas para mejorarlos.
        </p>
      </StoryChapter>

      <StoryChapter step="06" title="Lo que sigue">
        <p>
          Quiero seguir mejorando Camila con <strong>detección automática de riesgo</strong> y{' '}
          <strong>reconocimiento de emociones</strong> a través del rostro y la voz, fortalecer mi inglés y seguir
          construyendo productos que la gente use.
        </p>
        {/* EDITA: qué estás buscando ahora (trabajo, prácticas, proyectos freelance) */}
      </StoryChapter>

      <StoryEnd light="¿Construimos algo" bold="juntos?" link={{ label: 'Volver al portafolio', href: '/' }} />

      <JsonLd data={profilePageJsonLd(PATH)} />
    </main>
  );
}
