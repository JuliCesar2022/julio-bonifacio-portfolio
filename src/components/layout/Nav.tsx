'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/ui/Logo';

// Los cambios de página son enlaces normales (<a>), no next/link: la portada se carga completa cada vez.
// Al desmontarla y volverla a montar sin recargar, ScrollTrigger (GSAP 3.15) deja congeladas las
// animaciones de scroll. Los #enlaces dentro de la misma página siguen con scroll suave.
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const onProjects = pathname === '/proyectos';
  const onStory = pathname === '/historia';

  // Arriba del todo el menú es transparente; al bajar un poco toma fondo esmerilado
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <Logo href={isHome ? '#inicio' : '/'} />
      <nav aria-label="Principal">
        <a
          className="nav-link"
          href={onProjects ? '/proyectos' : '/#proyectos'}
          aria-current={onProjects ? 'page' : undefined}
        >
          Proyectos
        </a>
        <a className="nav-link" href="/#sobre-mi">
          Sobre mí
        </a>
        <a className="nav-link" href="/historia" aria-current={onStory ? 'page' : undefined}>
          Mi historia
        </a>
        <a className="nav-cta" href="/#contacto">
          Contacto
        </a>
      </nav>
    </header>
  );
}
