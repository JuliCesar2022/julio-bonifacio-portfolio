import type { Metadata } from 'next';
import Image from 'next/image';

import { CaseStudy } from '@/components/projects/CaseStudy';
import { StoryEnd } from '@/components/story/StoryEnd';
import { StoryHero } from '@/components/story/StoryHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { routes } from '@/config/routes';
import { projectsPage } from '@/content/pages';
import { projects } from '@/content/projects';
import { pageMetadata, projectsJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ ...projectsPage.seo, path: routes.projects });

// Proyectos: el contenido está en src/content/projects.ts y src/content/pages.ts
export default function ProyectosPage() {
  return (
    <main className="story">
      <StoryHero hero={projectsPage.hero} />

      <ul className="proj-index reveal" aria-label={projectsPage.indexLabel}>
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

      <StoryEnd end={projectsPage.end} />

      <JsonLd data={projectsJsonLd(routes.projects)} />
    </main>
  );
}
