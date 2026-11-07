import type { ReactNode } from 'react';

import { ChatIcon, GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon } from '@/components/ui/icons';
import { Logo } from '@/components/ui/Logo';
import { mailUrl, site, whatsappUrl } from '@/content/site';

type Social = { label: string; href: string; icon: ReactNode; external?: boolean };

const socials: Social[] = [
  { label: 'GitHub', href: site.socials.github, icon: <GitHubIcon />, external: true },
  { label: 'LinkedIn', href: site.socials.linkedin, icon: <LinkedInIcon />, external: true },
  { label: 'Instagram', href: site.socials.instagram, icon: <InstagramIcon />, external: true },
  { label: 'WhatsApp', href: whatsappUrl, icon: <ChatIcon />, external: true },
  { label: 'Correo', href: mailUrl, icon: <MailIcon /> },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo href="/#inicio" />
          <p>{site.tagline}</p>
        </div>
        <ul className="footer-social" aria-label="Redes y contacto">
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
      <div className="footer-bottom">
        <span>
          © {site.updated.slice(0, 4)} {site.name}
        </span>
        <a href="#inicio">Volver arriba ↑</a>
      </div>
    </footer>
  );
}
