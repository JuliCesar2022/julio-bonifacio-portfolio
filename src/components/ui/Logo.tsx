import { site } from '@/content/site';

import styles from './Logo.module.css';

export function Logo({ href, className }: { href: string; className?: string }) {
  return (
    <a className={className ? `${styles.logo} ${className}` : styles.logo} href={href}>
      <span className={styles.star} aria-hidden="true">
        ✳
      </span>{' '}
      {site.name}
    </a>
  );
}
