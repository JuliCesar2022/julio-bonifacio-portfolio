import type { ReactNode } from 'react';

import { ChatIcon, FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from '@/components/ui/icons';
import { Logo } from '@/components/ui/Logo';
import { homeSection, sections } from '@/config/routes';
import { mailUrl, site, whatsappUrl } from '@/content/site';

import styles from './Footer.module.css';

type Social = { label: string; href: string; icon: ReactNode; external?: boolean };

const socials: Social[] = [
  { label: 'GitHub', href: site.socials.github, icon: <GitHubIcon />, external: true },
  { label: 'LinkedIn', href: site.socials.linkedin, icon: <LinkedInIcon />, external: true },
  { label: 'Instagram', href: site.socials.instagram, icon: <InstagramIcon />, external: true },
  { label: 'Facebook', href: site.socials.facebook, icon: <FacebookIcon />, external: true },
  { label: 'WhatsApp', href: whatsappUrl, icon: <ChatIcon />, external: true },
  { label: 'Correo', href: mailUrl, icon: <MailIcon /> },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo href={homeSection(sections.top)} className={styles.brandLogo} />
          <p>{site.tagline}</p>
        </div>
        <ul className={styles.social} aria-label="Redes y contacto">
          {/* Una red sin enlace (ej. Instagram vacío en site.ts) no se muestra */}
          {socials
            .filter((social) => social.href)
            .map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  {...(social.external ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {social.icon}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <span>
          {/* Nombre completo visible: así Google también encuentra el sitio al buscarlo entero */}
          © {site.updated.slice(0, 4)} {site.legalName}
        </span>
        <a href={`#${sections.top}`}>Volver arriba ↑</a>
      </div>
    </footer>
  );
}
