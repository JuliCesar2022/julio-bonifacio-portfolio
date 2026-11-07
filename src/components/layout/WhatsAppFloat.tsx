import { WhatsAppLogo } from '@/components/ui/icons';
import { whatsappUrl } from '@/content/site';

/** Botón flotante de WhatsApp (abajo a la derecha en todas las páginas) */
export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={whatsappUrl} target="_blank" rel="noopener" aria-label="Escríbeme por WhatsApp">
      <WhatsAppLogo />
    </a>
  );
}
