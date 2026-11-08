import Image from 'next/image';
import type { CSSProperties } from 'react';

import { routes, sections } from '@/config/routes';
import { bento } from '@/content/home';
import { getProject, projects } from '@/content/projects';
import { site } from '@/content/site';
import { stack } from '@/content/stack';
import { cx } from '@/lib/cx';

import styles from './bento.module.css';
import { BentoGrid } from './BentoGrid';
import { BentoScene } from './BentoScene';

// Alturas de las barras del bloque "Backend" (decorativas)
const bars = ['35%', '60%', '45%', '80%', '65%', '100%'];

const featured = getProject(bento.featured.slug);
const years = site.experienceYears;

/** Proyectos y habilidades: cuadrícula de tarjetas (bento grid) */
export function Bento() {
  return (
    <BentoScene className="section" id={sections.projects}>
      <div className="section-head reveal">
        <p className="eyebrow">{bento.eyebrow}</p>
        <h2 className="h2">
          <span className="light">{bento.title.light}</span> {bento.title.bold}
        </h2>
      </div>

      <BentoGrid>
        <article data-anim="tile" className={cx(styles.tile, styles.num)}>
          <div className={styles.glass} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className={styles.big}>{projects.length}</p>
          <p className={styles.text}>{bento.projectsLabel}</p>
        </article>

        <article data-anim="tile" className={cx(styles.tile, styles.pill)}>
          <p className={styles.title}>{bento.pill}</p>
        </article>

        <article data-anim="tile" className={cx(styles.tile, styles.years)}>
          <pre className={styles.code} aria-hidden="true">
            {`const me = {\n  yearsCoding: ${years},\n  coffee: Infinity,\n};`}
          </pre>
          <p className={styles.big}>+{years}</p>
          <p className={styles.text}>{bento.yearsLabel}</p>
        </article>

        <article data-anim="tile" className={cx(styles.tile, styles.feat)}>
          <p className={styles.kicker}>{bento.featured.kicker}</p>
          <div className={styles.mock}>
            <div className="mock-bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <Image className={styles.shot} src={featured.shot} alt={featured.shotAlt} sizes="(max-width: 900px) 92vw, 480px" />
          </div>
          <h3 className={styles.heading}>{featured.name}</h3>
          <p className={styles.text}>{bento.featured.summary}</p>
          <div className={styles.actions}>
            {featured.link && (
              <a className="btn btn-light" href={featured.link.href} target="_blank" rel="noopener">
                {featured.link.label}
              </a>
            )}
            {featured.repo && (
              <a className="btn btn-ghost" href={featured.repo} target="_blank" rel="noopener">
                Código
              </a>
            )}
          </div>
        </article>

        <article data-anim="tile" className={cx(styles.tile, styles.back)}>
          <div className={styles.bars} aria-hidden="true" data-anim="bars">
            {bars.map((h, j) => (
              <span key={j} style={{ '--h': h, '--j': j } as CSSProperties} />
            ))}
          </div>
          <h3 className={styles.heading}>{bento.backend.title}</h3>
          <p className={styles.text}>{bento.backend.text}</p>
        </article>

        <article data-anim="tile" className={cx(styles.tile, styles.stack)}>
          <div className={styles.orb} aria-hidden="true" />
          <h3 className={styles.heading}>{bento.stackTitle}</h3>
          <ul className={styles.chips}>
            {stack.map((tech) => (
              <li key={tech.name}>
                <Image src={tech.logo} alt="" width={18} height={18} unoptimized />
                {tech.name}
              </li>
            ))}
          </ul>
        </article>

        <article data-anim="tile" className={cx(styles.tile, styles.status)}>
          <p>
            <span className={styles.dot} aria-hidden="true" /> {bento.status.label}
          </p>
          <a className="btn btn-dark" href={routes.projects}>
            {bento.status.cta} <span aria-hidden="true">→</span>
          </a>
        </article>
      </BentoGrid>
    </BentoScene>
  );
}
