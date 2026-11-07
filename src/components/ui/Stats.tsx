import type { Stat } from '@/types/content';

/** Cifras destacadas (ej. resultados de la validación de Camila AI) */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <div className="story-stats">
      {items.map((stat) => (
        <div className="stat" key={stat.label}>
          <b>{stat.value}</b>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
