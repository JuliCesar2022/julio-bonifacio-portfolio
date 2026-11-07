import { RichText } from '@/components/ui/RichText';
import type { Fact } from '@/types/content';

/** Ficha de datos (dt/dd) de las páginas internas */
export function Facts({ items, className = 'story-facts' }: { items: Fact[]; className?: string }) {
  return (
    <dl className={className}>
      {items.map((fact) => (
        <div key={fact.label} className={fact.wide ? 'span' : undefined}>
          <dt>{fact.label}</dt>
          <dd>
            <RichText text={fact.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
