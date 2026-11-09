'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/ui/Logo';
import { homeSection, routes, sections } from '@/config/routes';
import { cx } from '@/lib/cx';

import styles from './Nav.module.css';

// Los cambios de página son enlaces normales (<a>), no next/link: la portada se carga completa cada vez.
// Al desmontarla y volverla a montar sin recargar, ScrollTrigger (GSAP 3.15) deja congeladas las
// animaciones de scroll. Los #enlaces dentro de la misma página siguen con scroll suave.
/** Altura del centro del menú (px desde arriba) */
const NAV_MIDDLE = 35;

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === routes.home;
  const onProjects = pathname === routes.projects || pathname.startsWith(`${routes.projects}/`);
  const onStory = pathname === routes.story;

  // Arriba del todo el menú es transparente; al bajar un poco toma fondo esmerilado
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Sobre una sección oscura (marcada con data-nav-theme="dark") el menú pasa a fondo oscuro y textos
  // blancos. Se mira una línea a la altura del centro del menú: cambia justo cuando el borde la cruza
  const [onDark, setOnDark] = useState(false);
  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    if (!darkSections.length) return;
    const under = new Set<Element>();
    let observer: IntersectionObserver | undefined;

    const watch = () => {
      observer?.disconnect();
      under.clear();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => (entry.isIntersecting ? under.add(entry.target) : under.delete(entry.target)));
          setOnDark(under.size > 0);
        },
        { rootMargin: `-${NAV_MIDDLE}px 0px -${Math.max(0, window.innerHeight - NAV_MIDDLE - 1)}px 0px` },
      );
      darkSections.forEach((section) => observer!.observe(section));
    };

    watch();
    window.addEventListener('resize', watch);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', watch);
    };
  }, [pathname]);

  return (
    <header className={cx(styles.nav, scrolled && styles.scrolled, onDark && styles.dark)}>
      <Logo href={isHome ? `#${sections.top}` : routes.home} />
      <nav aria-label="Principal">
        <a
          className={styles.link}
          href={onProjects ? routes.projects : homeSection(sections.projects)}
          aria-current={onProjects ? 'page' : undefined}
        >
          Proyectos
        </a>
        <a className={styles.link} href={homeSection(sections.about)}>
          Sobre mí
        </a>
        <a className={styles.link} href={routes.story} aria-current={onStory ? 'page' : undefined}>
          Mi historia
        </a>
        <a className={styles.cta} href={homeSection(sections.contact)}>
          Contacto
        </a>
      </nav>
    </header>
  );
}
