'use client';

import type { ComponentProps } from 'react';

import { useScrollScene, type SceneSetup, type ScreenScenes } from '@/components/motion/useScrollScene';

/**
 * Proyectos en scroll horizontal (solo escritorio; en celular es un carrusel nativo).
 * La sección es alta y su escenario queda fijo con CSS sticky; aquí el scroll vertical por esa
 * altura se convierte en desplazamiento horizontal de la fila, y la tarjeta del centro se destaca.
 */
export function ReelScene(props: ComponentProps<'section'>) {
  const ref = useScrollScene<HTMLElement>(noop, { byScreen: SCREENS });
  return <section ref={ref} {...props} />;
}

const noop: SceneSetup = () => {};

const horizontalScene: SceneSetup = ({ root, q, gsap, ScrollTrigger }) => {
  const [viewport] = q('viewport');
  const [track] = q('track');
  const [bar] = q('progress');
  const [counter] = q('counter');
  const cards = q('card');
  if (!viewport || !track || !cards.length) return;

  const distance = () => track.scrollWidth - viewport.clientWidth;
  const pad = (n: number) => String(n).padStart(2, '0');

  // Primera aparición: la tarjeta sube más rápido que el scroll y crece hacia arriba (desde su borde
  // de abajo) hasta llenar la pantalla justo cuando la sección se fija; de paso empuja el bento hacia
  // arriba, que se encoge y se apaga. Luego empieza el paso lateral
  const enter = gsap.timeline({
    scrollTrigger: { trigger: root, start: 'top bottom', end: 'top top', scrub: 0.6, invalidateOnRefresh: true },
  });
  enter
    .fromTo(viewport, { scale: 0.55, transformOrigin: '50% 100%' }, { scale: 1, ease: 'none' }, 0)
    .fromTo(viewport, { y: () => -window.innerHeight * 0.48 }, { y: 0, ease: 'power2.in' }, 0);
  const above = root.previousElementSibling;
  if (above instanceof HTMLElement) {
    enter.to(
      above,
      { y: () => -window.innerHeight * 0.12, scale: 0.92, opacity: 0.25, transformOrigin: '50% 100%', ease: 'power1.in' },
      0,
    );
  }

  // La fila avanza lo mismo que se baja: arriba del todo, primera tarjeta al centro; abajo, la última
  const slide = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: ({ progress }) => {
        if (bar) bar.style.transform = `scaleX(${progress})`;
        if (counter) counter.textContent = pad(Math.round(progress * (cards.length - 1)) + 1);
      },
    },
  });

  // La tarjeta del centro, completa; las que se acercan o se van, más chicas y tenues
  cards.forEach((card) => {
    gsap
      .timeline({
        scrollTrigger: { trigger: card, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true },
      })
      .fromTo(card, { scale: 0.86, opacity: 0.4 }, { scale: 1, opacity: 1, ease: 'none' })
      .to(card, { scale: 0.86, opacity: 0.4, ease: 'none' });
  });

  // Con teclado (Tab), al llegar a una tarjeta que está fuera de la pantalla, la página baja hasta ella
  const onFocus = (event: FocusEvent) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-anim="card"]');
    const trigger = slide.scrollTrigger;
    if (!card || !trigger) return;
    const index = cards.indexOf(card);
    const top = trigger.start + (index / Math.max(1, cards.length - 1)) * (trigger.end - trigger.start);
    window.scrollTo({ top, behavior: 'instant' });
  };
  root.addEventListener('focusin', onFocus);

  // Enlaces a secciones del otro lado de esta (Sobre mí, Contacto, Saltar…): en vez de recorrer todo el
  // paso lateral, la página salta al otro extremo de la sección y desde ahí se desliza hasta el destino
  const onLinkClick = (event: MouseEvent) => {
    const trigger = slide.scrollTrigger;
    if (!trigger || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest('a[href*="#"]');
    if (!(link instanceof HTMLAnchorElement) || link.target === '_blank') return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target || root.contains(target)) return;

    const from = window.scrollY;
    const to = target.getBoundingClientRect().top + from;
    const down = to > from;
    const crosses = down ? from < trigger.end && to > trigger.end : from > trigger.start && to < trigger.start;
    if (!crosses) return;

    event.preventDefault();
    window.scrollTo({ top: down ? trigger.end : trigger.start, behavior: 'instant' });
    // Sin el retraso del scrub: la fila queda de una vez en su última (o primera) tarjeta
    ScrollTrigger.update();
    for (const animation of [slide, enter]) animation.scrollTrigger?.getTween()?.progress(1);
    history.pushState(null, '', url.hash);
    target.scrollIntoView({ behavior: 'smooth' });
  };
  document.addEventListener('click', onLinkClick);

  return () => {
    root.removeEventListener('focusin', onFocus);
    document.removeEventListener('click', onLinkClick);
  };
};

const SCREENS: ScreenScenes = { '(min-width: 821px)': horizontalScene };
