import { CodeIcon, DatabaseIcon, PenIcon } from '@/components/ui/icons';

import { HeroCards } from './HeroCards';
import { TypedTitle } from './TypedTitle';

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <HeroCards />

      <div className="hero-copy">
        <p className="eyebrow">Portafolio · 2026</p>
        <TypedTitle
          label="Convierto ideas en productos que se usan."
          lines={[
            { text: 'Convierto ideas en', className: 'line-light' },
            { text: 'pr✳ductos que se usan.', className: 'line-bold' },
          ]}
        />
        <p className="hero-sub hero-fade">
          Soy Julio Bonifacio y hago desarrollo full stack. He creado <strong>Bloqui</strong>, un juego que enseña
          blockchain; <strong>Camila AI</strong>, un asistente psicológico virtual, y el <strong>CRM de Cecar</strong>,
          una empresa real.
        </p>
        <ul className="hero-tags hero-fade">
          <li>
            <CodeIcon />
            Frontend
          </li>
          <li>
            <DatabaseIcon />
            Backend
          </li>
          <li>
            <PenIcon />
            Diseño UI
          </li>
        </ul>
      </div>
    </section>
  );
}
