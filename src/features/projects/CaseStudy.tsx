import Image from 'next/image';
import { Fragment } from 'react';

import { Facts } from '@/components/story/Facts';
import { Blocks } from '@/components/ui/Blocks';
import { PillLink } from '@/components/ui/PillLink';
import type { Project } from '@/types/content';

/** Video del proyecto con barra de navegador; sin video, la captura */
function CaseMedia({ project }: { project: Project }) {
  return (
    <figure className="case-video">
      <div className="mock-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {project.video ? (
        <video
          src={project.video.src}
          poster={project.video.poster}
          controls
          muted={project.video.muted}
          loop
          playsInline
          preload="metadata"
          aria-label={project.videoLabel}
        />
      ) : (
        <Image
          className="case-video-poster"
          src={project.shot}
          alt={project.shotAlt}
          sizes="(max-width: 1120px) 92vw, 1030px"
        />
      )}
    </figure>
  );
}

/** Un proyecto: encabezado, video y detalle */
export function CaseStudy({ project, index }: { project: Project; index: number }) {
  const links = [project.link, project.repo ? { label: 'Código', href: project.repo } : undefined].filter(
    (link) => link !== undefined,
  );
  return (
    <article className="case reveal" id={project.slug}>
      <header className="case-head">
        <div>
          <span className="story-step">{String(index + 1).padStart(2, '0')}</span>
          <h2>{project.name}</h2>
          <p className="case-tagline">{project.tagline}</p>
          <ul className="case-tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        {links.length > 0 && (
          <div className="case-links">
            {links.map((link) => (
              <PillLink key={link.href} link={link} />
            ))}
          </div>
        )}
      </header>

      <CaseMedia project={project} />

      <div className="case-body">
        <div className="story-text case-text">
          {project.sections.map((section) => (
            <Fragment key={section.title}>
              <h3>{section.title}</h3>
              <Blocks blocks={section.blocks} listClassName="case-list" />
            </Fragment>
          ))}
        </div>
        <Facts items={project.facts} className="case-aside story-facts" />
      </div>
    </article>
  );
}
