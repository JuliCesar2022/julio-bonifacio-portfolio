import { RichText } from '@/components/ui/RichText';
import { cx } from '@/lib/cx';
import type { Fact } from '@/types/content';

import styles from './Facts.module.css';

type Props = {
  items: Fact[];
  /** Versión compacta (al lado de un caso de estudio) */
  compact?: boolean;
  className?: string;
};

/** Ficha de datos (dt/dd) de las páginas internas */
export function Facts({ items, compact, className }: Props) {
  return (
    <dl className={cx(styles.facts, compact && styles.compact, className)}>
      {items.map((fact) => (
        <div key={fact.label} className={fact.wide ? styles.wide : undefined}>
          <dt>{fact.label}</dt>
          <dd>
            <RichText text={fact.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
