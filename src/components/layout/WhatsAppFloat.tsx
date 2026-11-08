import { WhatsAppLogo } from '@/components/ui/icons';
import { whatsappUrl } from '@/content/site';

import styles from './WhatsAppFloat.module.css';

/** Botón flotante de WhatsApp (abajo a la derecha en todas las páginas) */
export function WhatsAppFloat() {
  return (
    <a className={styles.float} href={whatsappUrl} target="_blank" rel="noopener" aria-label="Escríbeme por WhatsApp">
      <WhatsAppLogo />
    </a>
  );
}
