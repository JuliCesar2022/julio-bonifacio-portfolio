import { PillLink } from '@/components/ui/PillLink';
import { routes } from '@/config/routes';
import { projectsPage } from '@/content/pages';
import page from '@/features/page/page.module.css';
import { cx } from '@/lib/cx';
import type { Project } from '@/types/content';

import styles from './projects.module.css';

/** Proyecto en la lista de /proyectos: número, nombre, resumen y enlace a su página */
export function ProjectSummary({ project, index }: { project: Project; index: number }) {
  const href = routes.project(project.slug);
  return (
    <article className={cx(styles.case, styles.summary, 'reveal')}>
      <header className={styles.head}>
        <div>
          <span className={page.step}>{String(index + 1).padStart(2, '0')}</span>
          <h2>
            <a href={href}>{project.name}</a>
          </h2>
          <p className={styles.tagline}>{project.summary}</p>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className={styles.links}>
          <PillLink link={{ label: `${projectsPage.open} →`, href }} />
        </div>
      </header>
    </article>
  );
}
