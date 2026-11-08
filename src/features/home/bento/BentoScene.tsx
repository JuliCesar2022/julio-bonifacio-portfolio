'use client';

import type { ComponentProps } from 'react';

import { useScrollScene, type SceneSetup, type ScreenScenes } from '@/components/motion/useScrollScene';

/** Proyectos y habilidades con sus animaciones: las tarjetas llegan desde afuera y cambian de tamaño */
export function BentoScene(props: ComponentProps<'section'>) {
  const ref = useScrollScene<HTMLElement>(tilesScene, { byScreen: SCREENS });
  return <section ref={ref} {...props} />;
}

// Cada tarjeta llega desde afuera (según su columna) y se acomoda en su lugar.
// Se mide con la cuadrícula (que no se mueve) para que las tarjetas animadas no alteren el cálculo
const tilesScene: SceneSetup = ({ q, gsap }) => {
  const [grid] = q('grid');
  if (!grid) return;

  q('tile').forEach((tile) => {
    const fromCenter = () => tile.offsetLeft + tile.offsetWidth / 2 - grid.clientWidth / 2;
    gsap.from(tile, {
      x: () => fromCenter() * 0.4,
      y: 140,
      rotate: () => gsap.utils.clamp(-7, 7, fromCenter() / 40),
      scale: 0.85,
      opacity: 0,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: grid,
        start: () => `top+=${tile.offsetTop} bottom`,
        end: () => `top+=${tile.offsetTop} 55%`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  // Las barras del bloque "Backend" crecen
  const [bars] = q('bars');
  const backend = bars?.closest<HTMLElement>('[data-anim="tile"]');
  if (bars && backend) {
    gsap.from(bars.children, {
      scaleY: 0,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: grid,
        start: () => `top+=${backend.offsetTop} 80%`,
        end: () => `top+=${backend.offsetTop} 30%`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }
};

// Solo escritorio: al bajar, las tarjetas de los lados cambian de tamaño.
// Las filas b, c y d siempre suman lo mismo, así la columna del centro no se mueve
const resizeScene: SceneSetup = ({ q, gsap }) => {
  const [grid] = q('grid');
  gsap.to(grid, {
    '--rb': '130px',
    '--rc': '260px',
    '--rd': '110px',
    ease: 'none',
    // Cuando la cuadrícula ya está casi toda en pantalla y las tarjetas terminaron de entrar
    scrollTrigger: { trigger: grid, start: 'top 15%', end: 'top -35%', scrub: 1 },
  });
};

const SCREENS: ScreenScenes = { '(min-width: 901px)': resizeScene };
