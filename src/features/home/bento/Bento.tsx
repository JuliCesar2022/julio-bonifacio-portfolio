import Image from 'next/image';
import type { CSSProperties } from 'react';

import { routes, sections } from '@/config/routes';
import { bento } from '@/content/home';
import { getProject, projects } from '@/content/projects';
import { site } from '@/content/site';
import { stack } from '@/content/stack';

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
        <article data-anim="tile" className="tile tile-num">
          <div className="glass" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="big">{projects.length}</p>
          <p className="tile-text">{bento.projectsLabel}</p>
        </article>

        <article data-anim="tile" className="tile tile-pill">
          <p className="tile-title">{bento.pill}</p>
        </article>

        <article data-anim="tile" className="tile tile-years">
          <pre className="code" aria-hidden="true">
            {`const me = {\n  yearsCoding: ${years},\n  coffee: Infinity,\n};`}
          </pre>
          <p className="big">+{years}</p>
          <p className="tile-text">{bento.yearsLabel}</p>
        </article>

        <article data-anim="tile" className="tile tile-feat">
          <p className="tile-kicker">{bento.featured.kicker}</p>
          <div className="mock">
            <div className="mock-bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <Image className="mock-shot" src={featured.shot} alt={featured.shotAlt} sizes="(max-width: 900px) 92vw, 480px" />
          </div>
          <h3 className="tile-h">{featured.name}</h3>
          <p className="tile-text">{bento.featured.summary}</p>
          <div className="tile-actions">
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

        <article data-anim="tile" className="tile tile-back">
          <div className="bars" aria-hidden="true" data-anim="bars">
            {bars.map((h, j) => (
              <span key={j} style={{ '--h': h, '--j': j } as CSSProperties} />
            ))}
          </div>
          <h3 className="tile-h">{bento.backend.title}</h3>
          <p className="tile-text">{bento.backend.text}</p>
        </article>

        <article data-anim="tile" className="tile tile-stack">
          <div className="orb" aria-hidden="true" />
          <h3 className="tile-h">{bento.stackTitle}</h3>
          <ul className="chips">
            {stack.map((tech) => (
              <li key={tech.name}>
                <Image src={tech.logo} alt="" width={18} height={18} unoptimized />
                {tech.name}
              </li>
            ))}
          </ul>
        </article>

        <article data-anim="tile" className="tile tile-status">
          <p>
            <span className="dot" aria-hidden="true" /> {bento.status.label}
          </p>
          <a className="btn btn-dark" href={routes.projects}>
            {bento.status.cta} <span aria-hidden="true">→</span>
          </a>
        </article>
      </BentoGrid>
    </BentoScene>
  );
}
