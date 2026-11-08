import { CodeIcon, DatabaseIcon, PenIcon } from '@/components/ui/icons';
import { RichText } from '@/components/ui/RichText';
import { sections } from '@/config/routes';
import { hero } from '@/content/home';
import { cx } from '@/lib/cx';

import styles from './hero.module.css';
import { HeroCards } from './HeroCards';
import { HeroScene } from './HeroScene';
import { TypedTitle } from './TypedTitle';

const TAG_ICONS = { code: CodeIcon, database: DatabaseIcon, pen: PenIcon };

export function Hero() {
  return (
    <HeroScene className={styles.hero} id={sections.top}>
      <HeroCards />

      <div className={styles.copy} data-anim="copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <TypedTitle
          label={hero.title.label}
          lines={[
            { text: hero.title.light, weight: 'light' },
            { text: hero.title.bold, weight: 'bold' },
          ]}
        />
        <p className={cx(styles.sub, styles.fade)}>
          <RichText text={hero.intro} />
        </p>
        <ul className={cx(styles.tags, styles.fade)}>
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
    </HeroScene>
  );
}
