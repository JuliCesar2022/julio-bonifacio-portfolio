'use client';

import type { ComponentProps } from 'react';

import { useScrollScene, type SceneSetup } from '@/components/motion/useScrollScene';

/** Letras gigantes que se deslizan de derecha a izquierda mientras pasan por la pantalla */
export function MarqueeScene(props: ComponentProps<'section'>) {
  const ref = useScrollScene<HTMLElement>(marqueeScene);
  return <section ref={ref} {...props} />;
}

const marqueeScene: SceneSetup = ({ root, q, gsap }) => {
  const [track] = q('track');
  gsap.to(track, {
    x: () => -(track.scrollWidth - root.clientWidth),
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true },
  });
};
