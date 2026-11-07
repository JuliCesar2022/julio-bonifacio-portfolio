'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Los elementos con la clase .reveal aparecen al entrar en pantalla (agrega .in).
 * Vuelve a buscar en cada cambio de página. Con "reducir movimiento" se muestran de una.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = document.querySelectorAll('.reveal:not(.in)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      pending.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
