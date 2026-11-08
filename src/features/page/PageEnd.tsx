import { MailButton } from '@/components/ui/MailButton';
import { cx } from '@/lib/cx';
import type { PageEndContent } from '@/types/content';

import styles from './page.module.css';

/** Cierre de las páginas internas: invitación a escribir */
export function PageEnd({ end }: { end: PageEndContent }) {
  return (
    <section className={cx(styles.end, 'reveal')}>
      <h2>
        <span className="light">{end.title.light}</span>
        <br />
        {end.title.bold}
      </h2>
      <div className="contact-actions">
        <MailButton />
        <a className="btn btn-ghost" href={end.link.href}>
          {end.link.label}
        </a>
      </div>
    </section>
  );
}
