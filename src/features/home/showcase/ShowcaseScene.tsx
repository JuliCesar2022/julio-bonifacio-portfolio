'use client';

import type { ComponentProps } from 'react';

import { useScrollScene, type SceneSetup } from '@/components/motion/useScrollScene';
import { gsap } from '@/lib/gsap';

/** Vitrina con sus animaciones: el PC sube y crece, el celular entra girando, los textos llegan de los lados */
export function ShowcaseScene(props: ComponentProps<'section'>) {
  const ref = useScrollScene<HTMLElement>(showcaseScene);
  return <section ref={ref} {...props} />;
}

const showcaseScene: SceneSetup = ({ root, q }) => {
  const [left] = q('left');
  const [right] = q('right');

  gsap.from(q('devices'), {
    y: () => (window.innerWidth > 820 ? 180 : 80),
    scale: 0.78,
    ease: 'none',
    scrollTrigger: { trigger: root, scrub: 1, start: 'top bottom', end: 'top top', invalidateOnRefresh: true },
  });
  gsap.from(q('phone'), {
    xPercent: 50,
    yPercent: 30,
    rotate: 18,
    ease: 'none',
    scrollTrigger: { trigger: root, scrub: 1, start: 'top 75%', end: 'top top' },
  });
  gsap.from(left, {
    x: -100,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: left, start: 'top bottom', end: 'top 45%', scrub: 1 },
  });
  gsap.from(right, {
    x: 100,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: right, start: 'top bottom', end: 'top 45%', scrub: 1 },
  });

  // Las flechas se dibujan
  const arrows = q('arrow').flatMap((svg) => [...svg.querySelectorAll('path')]);
  gsap.fromTo(
    arrows,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: root, scrub: 1, start: 'top 40%', end: 'top -15%' } },
  );
};
