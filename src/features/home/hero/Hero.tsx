import { CodeIcon, DatabaseIcon, PenIcon } from '@/components/ui/icons';
import { RichText } from '@/components/ui/RichText';
import { sections } from '@/config/routes';
import { hero } from '@/content/home';

import { HeroCards } from './HeroCards';
import { TypedTitle } from './TypedTitle';

const TAG_ICONS = { code: CodeIcon, database: DatabaseIcon, pen: PenIcon };

export function Hero() {
  return (
    <section className="hero" id={sections.top}>
      <HeroCards />

      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <TypedTitle
          label={hero.title.label}
          lines={[
            { text: hero.title.light, className: 'line-light' },
            { text: hero.title.bold, className: 'line-bold' },
          ]}
        />
        <p className="hero-sub hero-fade">
          <RichText text={hero.intro} />
        </p>
        <ul className="hero-tags hero-fade">
          {hero.tags.map(({ label, icon }) => {
            const Icon = TAG_ICONS[icon];
            return (
              <li key={label}>
                <Icon />
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
