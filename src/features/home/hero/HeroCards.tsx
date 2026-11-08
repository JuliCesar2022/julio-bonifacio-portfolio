import Image from 'next/image';
import type { CSSProperties } from 'react';

import { hero } from '@/content/home';
import { getProject } from '@/content/projects';
import { cx } from '@/lib/cx';
import type { Project } from '@/types/content';

import styles from './hero.module.css';

const heroProjects = hero.cards.map(getProject);
const foregroundProject = getProject(hero.foregroundCard);

// Cada tarjeta toma la proporción de su captura para verse completa, sin recortes.
// --i es su puesto en la cascada (0 = adelante); HeroScene lo anima al turnarlas
const cardStyle = (project: Project, i: number) =>
  ({ '--i': i, aspectRatio: `${project.shot.width} / ${project.shot.height}` }) as CSSProperties;

/** Tarjetas 3D de la portada con las capturas de los proyectos (decorativas) */
export function HeroCards() {
  return (
    <>
      <div className={styles.stack} aria-hidden="true" data-anim="stack">
        <div className={styles.float}>
          <div className={styles.inner} data-anim="stack-inner">
            {heroProjects.map((project, i) => (
              <div key={project.slug} className={cx(styles.card, styles[`c${i + 1}`])}
                style={cardStyle(project, i)}
                data-anim="card"
              >
                <Image
                  className={styles.shot}
                  src={project.shot}
                  alt=""
                  draggable={false}
                  sizes="(max-width: 820px) 210px, (max-width: 1620px) 42vw, 680px"
                  preload={i === 0}
                  loading={i === 0 ? undefined : 'eager'}
                />
                <span className={styles.name}>{project.cardName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tarjeta grande y borrosa en primer plano, para dar profundidad */}
      <div className={styles.foreground} aria-hidden="true" data-anim="foreground">
        <div className={cx(styles.card, styles.foregroundCard, styles.c3)} style={cardStyle(foregroundProject, 3)}>
          <Image
            className={styles.shot}
            src={foregroundProject.shot}
            alt=""
            draggable={false}
            sizes="(max-width: 1466px) 30vw, 440px"
          />
        </div>
      </div>
    </>
  );
}
