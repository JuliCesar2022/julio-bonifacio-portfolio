type Props = {
  eyebrow: string;
  /** Primera línea, en letra delgada */
  light: string;
  /** Segunda línea; su última letra se reemplaza por el ✳ animado */
  bold: string;
  lead: string;
  backHref: string;
};

/** Encabezado de las páginas internas (Mi historia, Proyectos) */
export function StoryHero({ eyebrow, light, bold, lead, backHref }: Props) {
  const lastLetter = bold.slice(-1);
  return (
    <header className="story-hero" id="inicio">
      <a className="story-back" href={backHref}>
        <span aria-hidden="true">←</span> Volver al portafolio
      </a>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="story-title">
        <span className="light">{light}</span>
        <br />
        {bold.slice(0, -1)}
        <span className="star" aria-hidden="true">
          ✳
        </span>
        <span className="sr-only">{lastLetter}</span>
      </h1>
      <p className="story-lead">{lead}</p>
    </header>
  );
}
