import { MailButton } from '@/components/ui/MailButton';
import type { PageEndContent } from '@/types/content';

/** Cierre de las páginas internas: invitación a escribir */
export function PageEnd({ end }: { end: PageEndContent }) {
  return (
    <section className="story-end reveal">
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
