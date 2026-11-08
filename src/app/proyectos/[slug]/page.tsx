import type { Metadata } from 'next';

import { JsonLd } from '@/components/ui/JsonLd';
import { routes, sections } from '@/config/routes';
import { projectsPage } from '@/content/pages';
import { getProject, projects } from '@/content/projects';
import { PageEnd } from '@/features/page/PageEnd';
import page from '@/features/page/page.module.css';
import { CaseStudy } from '@/features/projects/CaseStudy';
import { ProjectPager } from '@/features/projects/ProjectPager';
import { breadcrumbJsonLd, pageMetadata, projectJsonLd } from '@/lib/seo';

// Una página por proyecto, generada al compilar (sitio estático: solo existen estas)
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<'/proyectos/[slug]'>): Promise<Metadata> {
  const project = getProject((await props.params).slug);
  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: routes.project(project.slug),
    share: { image: project.shot, alt: project.shotAlt },
  });
}

// El contenido de cada proyecto está en src/content/projects.ts
export default async function ProjectPage(props: PageProps<'/proyectos/[slug]'>) {
  const project = getProject((await props.params).slug);
  const index = projects.indexOf(project);

  return (
    <main className={page.main}>
      <div id={sections.top}>
        <a className={page.back} href={routes.projects}>
          <span aria-hidden="true">←</span> {projectsPage.backToIndex}
        </a>
      </div>

      <CaseStudy project={project} index={index} headingLevel={1} />

      <ProjectPager previous={projects[index - 1]} next={projects[index + 1]} />

      <PageEnd end={projectsPage.end} />

      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: routes.home },
          { name: projectsPage.seo.title, path: routes.projects },
          { name: project.name, path: routes.project(project.slug) },
        ])}
      />
    </main>
  );
}
