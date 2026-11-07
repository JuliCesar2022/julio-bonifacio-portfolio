'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Animaciones de la portada ligadas al scroll: avanzan y retroceden con la rueda del mouse.
 * scrub: 1 = siguen al scroll con un segundo de suavizado.
 * Con "reducir movimiento" no se crea ninguna y todo queda quieto y visible.
 * useGSAP las deshace al salir de la página.
 */
export function HomeScenes() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Portada: mientras la vitrina sube, las tarjetas se abren en abanico y el título se aleja
      gsap
        .timeline({
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
          defaults: { ease: 'none' },
        })
        .to('.stack', { '--spread': 1.9, '--lift': '46px', '--twist': '5deg' }, 0)
        .to('.stack-inner', { y: -150 }, 0)
        .to('.fg-wrap', { y: -380, rotate: -14 }, 0)
        .to('.hero-copy', { y: -40, scale: 0.94, opacity: 0.2, transformOrigin: 'left bottom' }, 0);

      const stopDeck = cycleHeroCards();

      // Vitrina: el PC sube y crece, el celular entra girando, los textos llegan de los lados
      const showcase = { trigger: '.showcase', scrub: 1 };
      gsap.from('.devices', {
        y: () => (window.innerWidth > 820 ? 180 : 80),
        scale: 0.78,
        ease: 'none',
        scrollTrigger: { ...showcase, start: 'top bottom', end: 'top top', invalidateOnRefresh: true },
      });
      gsap.from('.phone', {
        xPercent: 50,
        yPercent: 30,
        rotate: 18,
        ease: 'none',
        scrollTrigger: { ...showcase, start: 'top 75%', end: 'top top' },
      });
      gsap.from('.showcase-left', {
        x: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.showcase-left', start: 'top bottom', end: 'top 45%', scrub: 1 },
      });
      gsap.from('.showcase-right', {
        x: 100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.showcase-right', start: 'top bottom', end: 'top 45%', scrub: 1 },
      });
      gsap.fromTo(
        '.arrow path',
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { ...showcase, start: 'top 40%', end: 'top -15%' } },
      );

      // Bento: cada tarjeta llega desde afuera (según su columna) y se acomoda en su lugar.
      // Se mide con la cuadrícula (que no se mueve) para que las tarjetas animadas no alteren el cálculo
      const bento = document.querySelector<HTMLElement>('.bento');
      if (bento) {
        gsap.utils.toArray<HTMLElement>('.tile').forEach((tile) => {
          const fromCenter = () => tile.offsetLeft + tile.offsetWidth / 2 - bento.clientWidth / 2;
          gsap.from(tile, {
            x: () => fromCenter() * 0.4,
            y: 140,
            rotate: () => gsap.utils.clamp(-7, 7, fromCenter() / 40),
            scale: 0.85,
            opacity: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: bento,
              start: () => `top+=${tile.offsetTop} bottom`,
              end: () => `top+=${tile.offsetTop} 55%`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });

        const back = bento.querySelector<HTMLElement>('.tile-back');
        if (back) {
          gsap.from('.bars span', {
            scaleY: 0,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: bento,
              start: () => `top+=${back.offsetTop} 80%`,
              end: () => `top+=${back.offsetTop} 30%`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Sobre mí: las palabras del título se encienden una a una y la tarjeta sube
      gsap.from('.about-title .w', {
        opacity: 0.1,
        y: 30,
        stagger: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top 80%', end: 'top 15%', scrub: 1 },
      });
      gsap.from('.about-card', {
        y: 140,
        rotate: 3,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top 70%', end: 'top 5%', scrub: 1 },
      });

      // Galería: las fotos suben escalonadas y la imagen se mueve un poco dentro del marco
      gsap.from('.photo', {
        y: 100,
        opacity: 0,
        scale: 0.92,
        rotate: (i) => (i % 2 ? 3 : -3),
        stagger: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.gallery', start: 'top 95%', end: 'top 35%', scrub: 1 },
      });
      gsap.fromTo(
        '.photo img',
        { yPercent: -2.5 },
        {
          yPercent: 2.5,
          ease: 'none',
          scrollTrigger: { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );

      // Letras gigantes que se deslizan
      const track = document.querySelector<HTMLElement>('[data-marquee]');
      const marquee = track?.parentElement;
      if (track && marquee) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - marquee.clientWidth),
          ease: 'none',
          scrollTrigger: { trigger: marquee, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true },
        });
      }

      // Contacto: las figuras se mueven a distinta velocidad (profundidad)
      gsap
        .timeline({
          scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 },
          defaults: { ease: 'none' },
        })
        .fromTo('.p1', { y: 90, rotate: 6 }, { y: -70, rotate: -6 }, 0)
        .fromTo('.p2', { y: -40, x: -30 }, { y: 50, x: 20 }, 0)
        .fromTo('.ring', { y: 120, scale: 0.7 }, { y: -40, scale: 1.05 }, 0);

      return stopDeck;
    });

    // Proyectos (solo escritorio): al bajar, las tarjetas de los lados cambian de tamaño.
    // Las filas b, c y d siempre suman lo mismo, así la columna del centro no se mueve
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to('.bento', {
        '--rb': '130px',
        '--rc': '260px',
        '--rd': '110px',
        ease: 'none',
        // Cuando la cuadrícula ya está casi toda en pantalla y las tarjetas terminaron de entrar
        scrollTrigger: { trigger: '.bento', start: 'top 15%', end: 'top -35%', scrub: 1 },
      });
    });

    // No hace falta llamar a ScrollTrigger.refresh(): lo hace solo al terminar de cargar la página
    // (fuente e imágenes incluidas). Cada refresh recalcula todo y en celular bloquea ~0,5 s.

    return () => mm.revert();
  });

  return null;
}

/**
 * Portada: las tarjetas se turnan. La de adelante sale volando hacia arriba a la izquierda,
 * las demás avanzan un puesto y la que salió reaparece al fondo. Devuelve la función que lo detiene.
 */
function cycleHeroCards() {
  const cards = gsap.utils.toArray<HTMLElement>('.stack .card3d');
  const deck = [...cards]; // deck[0] = la de adelante
  if (!deck.length) return () => {};

  let heroVisible = true;
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top bottom',
    end: 'bottom 30%',
    onToggle: (self) => {
      heroVisible = self.isActive;
    },
  });

  // Las llamadas que se programan solas no quedan registradas en el contexto de useGSAP:
  // se guardan aquí para cortarlas al salir
  let next: gsap.core.Tween | null = null;

  const nextCard = () => {
    if (heroVisible) {
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
