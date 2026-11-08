import type { Link } from '@/types/content';

import styles from './PillLink.module.css';

/** Enlace con forma de píldora; los externos se abren en otra pestaña y llevan ↗ */
export function PillLink({ link }: { link: Link }) {
  const external = /^https?:\/\//.test(link.href);
  return (
    <a className={styles.link} href={link.href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {link.label} {external && <span aria-hidden="true">↗</span>}
    </a>
  );
}
