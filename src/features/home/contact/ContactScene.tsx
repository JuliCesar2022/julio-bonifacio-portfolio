'use client';

import type { ComponentProps } from 'react';

import { useScrollScene, type SceneSetup } from '@/components/motion/useScrollScene';
import { gsap } from '@/lib/gsap';

/** Contacto con sus animaciones: las figuras se mueven a distinta velocidad (profundidad) */
export function ContactScene(props: ComponentProps<'section'>) {
  const ref = useScrollScene<HTMLElement>(contactScene);
  return <section ref={ref} {...props} />;
}

const contactScene: SceneSetup = ({ root, q }) => {
  gsap
    .timeline({
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
      defaults: { ease: 'none' },
    })
    .fromTo(q('pill-1'), { y: 90, rotate: 6 }, { y: -70, rotate: -6 }, 0)
    .fromTo(q('pill-2'), { y: -40, x: -30 }, { y: 50, x: 20 }, 0)
    .fromTo(q('ring'), { y: 120, scale: 0.7 }, { y: -40, scale: 1.05 }, 0);
};
