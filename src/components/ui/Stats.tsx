import type { Stat } from '@/types/content';

import styles from './Stats.module.css';

/** Cifras destacadas (ej. resultados de la validación de Camila AI) */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <div className={styles.stats}>
      {items.map((stat) => (
        <div className={styles.stat} key={stat.label}>
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
