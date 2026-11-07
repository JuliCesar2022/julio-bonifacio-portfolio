import Image from 'next/image';

import { Facts } from '@/components/story/Facts';
import type { Project } from '@/content/projects';

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

/** Un proyecto en /proyectos: encabezado, video y detalle */
export function CaseStudy({ project, index }: { project: Project; index: number }) {
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
        {(project.link || project.repo) && (
          <div className="case-links">
            {project.link && (
              <a className="pill-link" href={project.link.href} target="_blank" rel="noopener">
                {project.link.label} <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.repo && (
              <a className="pill-link" href={project.repo} target="_blank" rel="noopener">
                Código <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </header>

      <CaseMedia project={project} />

      <div className="case-body">
        <div className="story-text case-text">
          <h3>El reto</h3>
          {project.challenge}

          <h3>Lo que construí</h3>
          <ul className="case-list">
            {project.built.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {project.extra && (
            <>
              <h3>{project.extra.title}</h3>
              {project.extra.content}
            </>
          )}
        </div>
        <Facts items={project.facts} className="case-aside story-facts" />
      </div>
    </article>
  );
}
