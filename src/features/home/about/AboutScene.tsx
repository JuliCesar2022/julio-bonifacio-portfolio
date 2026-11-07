'use client';

import type { ComponentProps } from 'react';

import { useScrollScene, type SceneSetup } from '@/components/motion/useScrollScene';
import { gsap } from '@/lib/gsap';

/** Sobre mí con sus animaciones: el título se enciende palabra por palabra y las fotos suben */
export function AboutScene(props: ComponentProps<'section'>) {
  const ref = useScrollScene<HTMLElement>(aboutScene);
  return <section ref={ref} {...props} />;
}

const aboutScene: SceneSetup = ({ root, q }) => {
  gsap.from(q('word'), {
    opacity: 0.1,
    y: 30,
    stagger: 0.25,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top 80%', end: 'top 15%', scrub: 1 },
  });
  gsap.from(q('card'), {
    y: 140,
    rotate: 3,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top 70%', end: 'top 5%', scrub: 1 },
  });

  // Galería: las fotos suben escalonadas y la imagen se mueve un poco dentro del marco
  const [gallery] = q('gallery');
  const photos = q('photo');
  gsap.from(photos, {
    y: 100,
    opacity: 0,
    scale: 0.92,
    rotate: (i: number) => (i % 2 ? 3 : -3),
    stagger: 0.15,
    ease: 'none',
    scrollTrigger: { trigger: gallery, start: 'top 95%', end: 'top 35%', scrub: 1 },
  });
  gsap.fromTo(
    photos.map((photo) => photo.querySelector('img')),
    { yPercent: -2.5 },
    { yPercent: 2.5, ease: 'none', scrollTrigger: { trigger: gallery, start: 'top bottom', end: 'bottom top', scrub: true } },
  );
};
