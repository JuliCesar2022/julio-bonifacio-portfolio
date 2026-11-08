import Image from 'next/image';
import { Fragment } from 'react';

import { Blocks } from '@/components/ui/Blocks';
import { PillLink } from '@/components/ui/PillLink';
import { Facts } from '@/features/page/Facts';
import page from '@/features/page/page.module.css';
import { cx } from '@/lib/cx';
import type { Project } from '@/types/content';

import styles from './projects.module.css';

/** Video del proyecto con barra de navegador; sin video, la captura */
function CaseMedia({ project }: { project: Project }) {
  return (
    <figure className={styles.video}>
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
          className={styles.poster}
          src={project.shot}
          alt={project.shotAlt}
          sizes="(max-width: 1120px) 92vw, 1030px"
        />
      )}
    </figure>
  );
}

type Props = {
  project: Project;
  /** Posición en la lista (se muestra como 01, 02…) */
  index: number;
  /** h1 en la página del proyecto */
  headingLevel?: 1 | 2;
};

/** Un proyecto: encabezado, video y detalle */
export function CaseStudy({ project, index, headingLevel = 2 }: Props) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  const links = [project.link, project.repo ? { label: 'Código', href: project.repo } : undefined].filter(
    (link) => link !== undefined,
  );
  return (
    <article className={cx(styles.case, 'reveal')} id={project.slug}>
      <header className={styles.head}>
        <div>
          <span className={page.step}>{String(index + 1).padStart(2, '0')}</span>
          <Heading>{project.name}</Heading>
          <p className={styles.tagline}>{project.tagline}</p>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        {links.length > 0 && (
          <div className={styles.links}>
            {links.map((link) => (
              <PillLink key={link.href} link={link} />
            ))}
          </div>
        )}
      </header>

      <CaseMedia project={project} />

      <div className={styles.body}>
        <div className={cx(page.text, styles.text)}>
          {project.sections.map((section) => (
            <Fragment key={section.title}>
              <h3>{section.title}</h3>
              <Blocks blocks={section.blocks} listClassName={styles.list} />
            </Fragment>
          ))}
        </div>
        <Facts items={project.facts} compact className={styles.aside} />
      </div>
    </article>
  );
}
