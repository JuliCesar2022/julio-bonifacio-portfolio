import { routes } from '@/config/routes';
import { projectsPage } from '@/content/pages';
import type { Project } from '@/types/content';

import styles from './projects.module.css';

type Props = { previous?: Project; next?: Project };

/** Anterior / siguiente al final de la página de un proyecto */
export function ProjectPager({ previous, next }: Props) {
  return (
    <nav className={styles.pager} aria-label={projectsPage.navLabel}>
      {previous && (
        <a href={routes.project(previous.slug)} rel="prev">
          <span>← {projectsPage.previous}</span>
          <b>{previous.name}</b>
        </a>
      )}
      {next && (
        <a className={styles.next} href={routes.project(next.slug)} rel="next">
          <span>{projectsPage.next} →</span>
          <b>{next.name}</b>
        </a>
      )}
    </nav>
  );
}
