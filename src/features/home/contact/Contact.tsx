import { WhatsAppLogo } from '@/components/ui/icons';
import { MailButton } from '@/components/ui/MailButton';
import { sections } from '@/config/routes';
import { contact } from '@/content/home';
import { site, whatsappUrl } from '@/content/site';

import styles from './contact.module.css';
import { ContactScene } from './ContactScene';

// Un enlace vacío (ej. el CV en site.ts) no se muestra
const links = [
  { label: 'GitHub', href: site.socials.github },
  { label: 'LinkedIn', href: site.socials.linkedin },
  { label: 'CV (PDF)', href: site.cv },
].filter((link) => link.href);

export function Contact() {
  return (
    <ContactScene className={styles.contact} id={sections.contact}>
      <div className="reveal">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 className="h2">
          <span className="light">{contact.title.light}</span>
          <br />
          {contact.title.bold}
        </h2>
        <div className="contact-actions">
          <MailButton />
          <a className={styles.whatsapp} href={whatsappUrl} target="_blank" rel="noopener">
            <WhatsAppLogo />
            {contact.whatsapp}
          </a>
        </div>
        <ul className={styles.socials}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.art} aria-hidden="true">
        <span className={`${styles.pill} ${styles.pill1}`} data-anim="pill-1" />
        <span className={`${styles.pill} ${styles.pill2}`} data-anim="pill-2" />
        <span className={styles.ring} data-anim="ring" />
      </div>
    </ContactScene>
  );
}
