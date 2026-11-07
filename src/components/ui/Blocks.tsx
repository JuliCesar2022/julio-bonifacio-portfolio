import type { Block } from '@/types/content';

import { PillLink } from './PillLink';
import { RichText } from './RichText';
import { Stats } from './Stats';

/** Arma un texto largo a partir de sus bloques (párrafos, listas, cifras y enlaces) */
export function Blocks({ blocks, listClassName }: { blocks: Block[]; listClassName?: string }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={i}>
            <RichText text={block.text} />
          </p>
        );
      case 'list':
        return (
          <ul key={i} className={listClassName}>
            {block.items.map((item, j) => (
              <li key={j}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        );
      case 'stats':
        return <Stats key={i} items={block.items} />;
      case 'link':
        return <PillLink key={i} link={block.link} />;
    }
  });
}
