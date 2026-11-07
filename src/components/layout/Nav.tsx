'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/ui/Logo';
import { homeSection, routes, sections } from '@/config/routes';

// Los cambios de página son enlaces normales (<a>), no next/link: la portada se carga completa cada vez.
// Al desmontarla y volverla a montar sin recargar, ScrollTrigger (GSAP 3.15) deja congeladas las
// animaciones de scroll. Los #enlaces dentro de la misma página siguen con scroll suave.
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === routes.home;
  const onProjects = pathname === routes.projects;
  const onStory = pathname === routes.story;

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
      <Logo href={isHome ? `#${sections.top}` : routes.home} />
      <nav aria-label="Principal">
        <a
          className="nav-link"
          href={onProjects ? routes.projects : homeSection(sections.projects)}
          aria-current={onProjects ? 'page' : undefined}
        >
          Proyectos
        </a>
        <a className="nav-link" href={homeSection(sections.about)}>
          Sobre mí
        </a>
        <a className="nav-link" href={routes.story} aria-current={onStory ? 'page' : undefined}>
          Mi historia
        </a>
        <a className="nav-cta" href={homeSection(sections.contact)}>
          Contacto
        </a>
      </nav>
    </header>
  );
}
