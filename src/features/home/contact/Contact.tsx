import { WhatsAppLogo } from '@/components/ui/icons';
import { MailButton } from '@/components/ui/MailButton';
import { sections } from '@/config/routes';
import { contact } from '@/content/home';
import { site, whatsappUrl } from '@/content/site';

// Un enlace vacío (ej. el CV en site.ts) no se muestra
const links = [
  { label: 'GitHub', href: site.socials.github },
  { label: 'LinkedIn', href: site.socials.linkedin },
  { label: 'CV (PDF)', href: site.cv },
].filter((link) => link.href);

export function Contact() {
  return (
    <section className="contact" id={sections.contact}>
      <div className="contact-copy reveal">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 className="h2">
          <span className="light">{contact.title.light}</span>
          <br />
          {contact.title.bold}
        </h2>
        <div className="contact-actions">
          <MailButton />
          <a className="wa-btn" href={whatsappUrl} target="_blank" rel="noopener">
            <WhatsAppLogo />
            {contact.whatsapp}
          </a>
        </div>
        <ul className="socials">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact-art" aria-hidden="true">
        <span className="pill p1" />
        <span className="pill p2" />
        <span className="ring" />
      </div>
    </section>
  );
}
