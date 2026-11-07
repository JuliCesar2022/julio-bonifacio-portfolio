import { mailUrl, site } from '@/content/site';

/** Botón negro con el correo (contacto y final de las páginas) */
export function MailButton() {
  return (
    <a className="mail" href={mailUrl}>
      {site.email} <span aria-hidden="true">→</span>
    </a>
  );
}
