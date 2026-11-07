import { MailButton } from '@/components/ui/MailButton';

type Props = { light: string; bold: string; link: { label: string; href: string } };

/** Cierre de las páginas internas: invitación a escribir */
export function StoryEnd({ light, bold, link }: Props) {
  return (
    <section className="story-end reveal">
      <h2>
        <span className="light">{light}</span>
        <br />
        {bold}
      </h2>
      <div className="contact-actions">
        <MailButton />
        <a className="btn btn-ghost" href={link.href}>
          {link.label}
        </a>
      </div>
    </section>
  );
}
