import type { Metadata } from 'next';
import Image from 'next/image';

import { CaseStudy } from '@/components/projects/CaseStudy';
import { StoryEnd } from '@/components/story/StoryEnd';
import { StoryHero } from '@/components/story/StoryHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { projects } from '@/content/projects';
import { pageMetadata, projectsJsonLd } from '@/lib/seo';

const PATH = '/proyectos';

export const metadata: Metadata = pageMetadata({
  title: 'Proyectos',
  description:
    'Los proyectos de Julio Bonifacio: Camila AI, Bloqui, Cecar y Asociados, CRM Cecar y EduPlay, con videos y detalles de cada uno.',
  path: PATH,
});

// PROYECTOS: una sección por proyecto (el contenido está en src/content/projects.tsx)
export default function ProyectosPage() {
  return (
    <main className="story">
      <StoryHero
        eyebrow="Proyectos"
        light="Lo que he"
        bold="construido"
        lead="Cinco proyectos, de la investigación a empresas reales: qué problema resuelve cada uno, qué construí y cómo se ve funcionando."
        backHref="/#proyectos"
      />

      <ul className="proj-index reveal" aria-label="Ir a un proyecto">
        {projects.map((project) => (
          <li key={project.slug}>
            <a href={`#${project.slug}`}>
              <Image src={project.shot} alt="" sizes="(max-width: 820px) 36vw, 260px" />
              <span>{project.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {projects.map((project, i) => (
        <CaseStudy key={project.slug} project={project} index={i} />
      ))}

      <StoryEnd
        light="¿Tienes un proyecto"
        bold="en mente?"
        link={{ label: 'Conoce mi historia', href: '/historia' }}
      />

      <JsonLd data={projectsJsonLd(PATH)} />
    </main>
  );
}
