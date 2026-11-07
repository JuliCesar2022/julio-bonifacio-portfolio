import Image from 'next/image';
import type { CSSProperties } from 'react';

import { foregroundProject, heroProjects, type Project } from '@/content/projects';

// Cada tarjeta toma la proporción de su captura para verse completa, sin recortes.
// --i es su puesto en la cascada (0 = adelante); HomeScenes lo anima al turnarlas
const cardStyle = (project: Project, i: number) =>
  ({ '--i': i, aspectRatio: `${project.shot.width} / ${project.shot.height}` }) as CSSProperties;

/** Tarjetas 3D de la portada con las capturas de los proyectos (decorativas) */
export function HeroCards() {
  return (
    <>
      <div className="stack" aria-hidden="true">
        <div className="stack-float">
          <div className="stack-inner">
            {heroProjects.map((project, i) => (
              <div key={project.slug} className={`card3d c${i + 1} has-shot`} style={cardStyle(project, i)}>
                <Image
                  className="card-shot"
                  src={project.shot}
                  alt=""
                  draggable={false}
                  sizes="(max-width: 820px) 210px, (max-width: 1620px) 42vw, 680px"
                  preload={i === 0}
                  loading={i === 0 ? undefined : 'eager'}
                />
                <span className="card-name">{project.cardName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tarjeta grande y borrosa en primer plano, para dar profundidad */}
      <div className="fg-wrap" aria-hidden="true">
        <div className="card3d card-fg c3 has-shot" style={cardStyle(foregroundProject, 3)}>
          <Image
            className="card-shot"
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
