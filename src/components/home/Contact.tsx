import { WhatsAppLogo } from '@/components/ui/icons';
import { MailButton } from '@/components/ui/MailButton';
import { site, whatsappUrl } from '@/content/site';

const links = [
  { label: 'GitHub', href: site.socials.github },
  { label: 'LinkedIn', href: site.socials.linkedin },
  { label: 'CV (PDF)', href: site.cv },
].filter((link) => link.href);

export function Contact() {
  return (
    <section className="contact" id="contacto">
      <div className="contact-copy reveal">
        <p className="eyebrow">Contacto</p>
        <h2 className="h2">
          <span className="light">¿Tienes un proyecto?</span>
          <br />
          Escríbeme
        </h2>
        <div className="contact-actions">
          <MailButton />
          <a className="wa-btn" href={whatsappUrl} target="_blank" rel="noopener">
            <WhatsAppLogo />
            WhatsApp
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
