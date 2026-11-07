import Image from 'next/image';
import type { CSSProperties } from 'react';

import { featuredProject, projects } from '@/content/projects';
import { stack } from '@/content/stack';

import { BentoGrid } from './BentoGrid';

// Alturas de las barras del bloque "Backend" (decorativas)
const bars = ['35%', '60%', '45%', '80%', '65%', '100%'];

/** Proyectos y habilidades: cuadrícula de tarjetas (bento grid) */
export function Bento() {
  return (
    <section className="section" id="proyectos">
      <div className="section-head reveal">
        <p className="eyebrow">Lo que hago</p>
        <h2 className="h2">
          <span className="light">Proyectos y</span> habilidades
        </h2>
      </div>

      <BentoGrid>
        <article className="tile tile-num">
          <div className="glass" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="big">{projects.length}</p>
          <p className="tile-text">proyectos entregados</p>
        </article>

        <article className="tile tile-pill">
          <p className="tile-title">Full stack · Web y móvil</p>
        </article>

        <article className="tile tile-years">
          <pre className="code" aria-hidden="true">
            {'const me = {\n  yearsCoding: 2,\n  coffee: Infinity,\n};'}
          </pre>
          <p className="big">+2</p>
          <p className="tile-text">años programando</p>
        </article>

        <article className="tile tile-feat">
          <p className="tile-kicker">Proyecto destacado</p>
          <div className="mock">
            <div className="mock-bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <Image
              className="mock-shot"
              src={featuredProject.shot}
              alt={featuredProject.shotAlt}
              sizes="(max-width: 900px) 92vw, 480px"
            />
          </div>
          <h3 className="tile-h">{featuredProject.name}</h3>
          <p className="tile-text">
            Web de una agencia de tours en Cartagena: catálogo de tours con buscador, testimonios e inicio de sesión.
          </p>
          <div className="tile-actions">
            {featuredProject.link && (
              <a className="btn btn-light" href={featuredProject.link.href} target="_blank" rel="noopener">
                Ver demo
              </a>
            )}
            {featuredProject.repo && (
              <a className="btn btn-ghost" href={featuredProject.repo} target="_blank" rel="noopener">
                Código
              </a>
            )}
          </div>
        </article>

        <article className="tile tile-back">
          <div className="bars" aria-hidden="true">
            {bars.map((h, j) => (
              <span key={j} style={{ '--h': h, '--j': j } as CSSProperties} />
            ))}
          </div>
          <h3 className="tile-h">Backend</h3>
          <p className="tile-text">APIs, autenticación y bases de datos.</p>
        </article>

        <article className="tile tile-stack">
          <div className="orb" aria-hidden="true" />
          <h3 className="tile-h">Stack</h3>
          <ul className="chips">
            {stack.map((tech) => (
              <li key={tech.name}>
                <Image src={tech.logo} alt="" width={18} height={18} unoptimized />
                {tech.name}
              </li>
            ))}
          </ul>
        </article>

        <article className="tile tile-status">
          <p>
            <span className="dot" aria-hidden="true" /> Disponible para proyectos
          </p>
          <a className="btn btn-dark" href="/proyectos">
            Ver todos mis proyectos <span aria-hidden="true">→</span>
          </a>
        </article>
      </BentoGrid>
    </section>
  );
}
