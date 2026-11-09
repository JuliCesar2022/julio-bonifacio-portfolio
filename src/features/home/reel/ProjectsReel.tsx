import Image from 'next/image';
import type { CSSProperties } from 'react';

import { homeSection, routes, sections } from '@/config/routes';
import { reel } from '@/content/home';
import { projects } from '@/content/projects';
import { cx } from '@/lib/cx';

import styles from './reel.module.css';
import { ReelScene } from './ReelScene';

const pad = (n: number) => String(n).padStart(2, '0');

/** Proyectos en scroll horizontal: en escritorio pasan de lado al hacer scroll; en celular se deslizan */
export function ProjectsReel() {
  return (
    <ReelScene
      className={styles.reel}
      id={sections.reel}
      aria-labelledby="reel-title"
      style={{ '--count': projects.length } as CSSProperties}
    >
      <div className={styles.stage}>
        <header className={styles.head}>
          <div>
            <p className="eyebrow">{reel.eyebrow}</p>
            <h2 className={styles.title} id="reel-title">
              <span className="light">{reel.title.light}</span> {reel.title.bold}
            </h2>
          </div>
          <div className={styles.links}>
            <a href={routes.projects}>{reel.all} →</a>
            <a href={homeSection(sections.about)}>{reel.skip} ↓</a>
          </div>
        </header>

        <div className={styles.viewport} data-anim="viewport">
          <ul className={styles.track} data-anim="track">
            {projects.map((project, i) => (
              <li key={project.slug} className={styles.card} data-anim="card">
                <div className={styles.shot}>
                  <Image
                    src={project.shot}
                    alt=""
                    fill
                    sizes="(max-width: 820px) min(86vw, 520px), (max-width: 1800px) 80vw, 1440px"
                  />
                </div>
                <a className={styles.cover} href={routes.project(project.slug)} tabIndex={-1} aria-hidden="true" />

                <div className={styles.overlay}>
                  <div>
                    <div className={styles.meta}>
                      <span className={styles.step}>{pad(i + 1)}</span>
                      <ul className={styles.tags}>
                        {project.tags.slice(0, 3).map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                    <h3 className={styles.name}>{project.name}</h3>
                    <p className={styles.tagline}>{project.tagline}</p>
                  </div>
                  <div className={styles.actions}>
                    <a
                      className="btn btn-light"
                      href={routes.project(project.slug)}
                      aria-label={`${reel.open}: ${project.name}`}
                    >
                      {reel.open} <span aria-hidden="true">→</span>
                    </a>
                    {project.link && (
                      <a className={cx('btn', styles.ghost)} href={project.link.href} target="_blank" rel="noopener">
                        {project.link.label} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.foot} aria-hidden="true">
          <span className={styles.counter}>
            <span data-anim="counter">01</span> / {pad(projects.length)}
          </span>
          <span className={styles.progress}>
            <span className={styles.bar} data-anim="progress" />
          </span>
          <span className={styles.hint}>{reel.swipeHint} →</span>
        </div>
      </div>
    </ReelScene>
  );
}
