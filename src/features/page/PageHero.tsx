import { sections } from '@/config/routes';
import type { PageHeroContent } from '@/types/content';

/** Encabezado de las páginas internas: la última letra del título se cambia por el ✳ animado */
export function PageHero({ hero }: { hero: PageHeroContent }) {
  const { bold, light } = hero.title;
  return (
    <header className="story-hero" id={sections.top}>
      <a className="story-back" href={hero.back.href}>
        <span aria-hidden="true">←</span> {hero.back.label}
      </a>
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className="story-title">
        <span className="light">{light}</span>
        <br />
        {bold.slice(0, -1)}
        <span className="star" aria-hidden="true">
          ✳
        </span>
        <span className="sr-only">{bold.slice(-1)}</span>
      </h1>
      <p className="story-lead">{hero.lead}</p>
    </header>
  );
}
