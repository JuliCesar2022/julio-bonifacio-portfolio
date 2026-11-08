import type { Metadata } from 'next';
import Image from 'next/image';

import { JsonLd } from '@/components/ui/JsonLd';
import { routes } from '@/config/routes';
import { projectsPage } from '@/content/pages';
import { projects } from '@/content/projects';
import { PageEnd } from '@/features/page/PageEnd';
import { PageHero } from '@/features/page/PageHero';
import page from '@/features/page/page.module.css';
import { LegacyHashRedirect } from '@/features/projects/LegacyHashRedirect';
import { ProjectSummary } from '@/features/projects/ProjectSummary';
import projectStyles from '@/features/projects/projects.module.css';
import { cx } from '@/lib/cx';
import { pageMetadata, projectsJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({ ...projectsPage.seo, path: routes.projects });

// Índice de proyectos: cada uno tiene su página en /proyectos/<slug> (src/app/proyectos/[slug])
export default function ProyectosPage() {
  return (
    <main className={page.main}>
      <PageHero hero={projectsPage.hero} />

      <ul className={cx(projectStyles.index, 'reveal')} aria-label={projectsPage.indexLabel}>
        {projects.map((project) => (
          <li key={project.slug}>
            <a href={routes.project(project.slug)}>
              <Image src={project.shot} alt="" sizes="(max-width: 820px) 36vw, 260px" />
              <span>{project.name}</span>
            </a>
          </li>
        ))}
      </ul>

      {projects.map((project, i) => (
        <ProjectSummary key={project.slug} project={project} index={i} />
      ))}

      <PageEnd end={projectsPage.end} />

      <JsonLd data={projectsJsonLd()} />
      <LegacyHashRedirect slugs={projects.map((project) => project.slug)} />
    </main>
  );
}
