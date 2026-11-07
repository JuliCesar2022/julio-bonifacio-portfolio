'use client';

import type { ComponentProps } from 'react';

import { useScrollScene, type SceneSetup } from '@/components/motion/useScrollScene';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/** Portada con sus animaciones: las tarjetas se abren al bajar y se turnan solas */
export function HeroScene(props: ComponentProps<'section'>) {
  const ref = useScrollScene<HTMLElement>(heroScene);
  return <section ref={ref} {...props} />;
}

const heroScene: SceneSetup = ({ root, q }) => {
  // Mientras la vitrina sube, las tarjetas se abren en abanico y el título se aleja
  gsap
    .timeline({
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      defaults: { ease: 'none' },
    })
    .to(q('stack'), { '--spread': 1.9, '--lift': '46px', '--twist': '5deg' }, 0)
    .to(q('stack-inner'), { y: -150 }, 0)
    .to(q('foreground'), { y: -380, rotate: -14 }, 0)
    .to(q('copy'), { y: -40, scale: 0.94, opacity: 0.2, transformOrigin: 'left bottom' }, 0);

  return cycleCards(root, q('card'));
};

/**
 * Las tarjetas se turnan: la de adelante sale volando hacia arriba a la izquierda, las demás
 * avanzan un puesto y la que salió reaparece al fondo. Devuelve la función que lo detiene.
 */
function cycleCards(root: HTMLElement, cards: HTMLElement[]) {
  const deck = [...cards]; // deck[0] = la de adelante
  if (!deck.length) return;

  let visible = true;
  ScrollTrigger.create({
    trigger: root,
    start: 'top bottom',
    end: 'bottom 30%',
    onToggle: (self) => {
      visible = self.isActive;
    },
  });

  // Las llamadas que se programan solas no quedan registradas en el contexto de GSAP:
  // se guardan aquí para cortarlas al salir
  let next: gsap.core.Tween | null = null;

  const nextCard = () => {
    if (visible) {
      const front = deck.shift()!;
      deck.push(front);
      const back = deck.length - 1;

      // Capas primero y todas en el mismo cuadro: la que sale encima de todo, las demás según su
      // nuevo puesto. Si una cambia antes que otra, por un cuadro se dibuja la de atrás encima (parpadeo)
      gsap.set(front, { zIndex: 11 });
      deck.forEach((card, pos) => {
        if (card !== front) gsap.set(card, { zIndex: 10 - pos });
      });

      // Primero se aleja y solo al final se desvanece, para que no se vea transparente encima de la nueva
      gsap
        .timeline()
        .to(front, {
          '--ex': () => `${-0.22 * innerWidth}px`,
          '--ey': () => `${-0.16 * innerHeight}px`,
          '--es': 1.12,
          duration: 0.6,
          ease: 'power2.in',
        })
        .to(front, { opacity: 0, duration: 0.2, ease: 'none' }, 0.4)
        .set(front, { '--i': back, zIndex: 10 - back, '--ex': '0px', '--ey': '60px', '--es': 0.9 })
        .to(front, { '--ey': '0px', '--es': 1, opacity: 1, duration: 0.7, ease: 'power3.out' });

      deck.forEach((card, pos) => {
        if (card !== front) gsap.to(card, { '--i': pos, duration: 0.9, delay: 0.15, ease: 'power3.inOut' });
      });
    }
    next = gsap.delayedCall(3.2, nextCard);
  };

  // Empieza cuando terminó la entrada; se quita la animación CSS para que GSAP pueda moverlas
  next = gsap.delayedCall(4, () => {
    gsap.set(cards, { animation: 'none', zIndex: (i: number) => 10 - i });
    nextCard();
  });

  return () => {
    next?.kill();
    gsap.killTweensOf(cards);
    // Deja cada tarjeta en su puesto original (el de React) por si la portada vuelve a mostrarse
    cards.forEach((card, i) => {
      ['z-index', 'opacity', 'animation', '--ex', '--ey', '--es'].forEach((prop) => card.style.removeProperty(prop));
      card.style.setProperty('--i', String(i));
    });
  };
}
