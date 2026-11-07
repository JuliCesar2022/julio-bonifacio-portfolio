'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';

const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export type SceneContext = {
  /** Elemento raíz de la sección */
  root: HTMLElement;
  /** Busca dentro de la sección por su gancho de animación: q('card') = [data-anim="card"] */
  q: <T extends HTMLElement = HTMLElement>(name: string) => T[];
};

/** Crea las animaciones; si devuelve una función, se llama al deshacerlas */
export type SceneSetup = (scene: SceneContext) => void | (() => void);

/**
 * Animaciones de scroll de una sección. Cada sección tiene las suyas y solo toca sus propios
 * elementos, marcados con data-anim="…" (no clases CSS: así cambiar estilos no rompe animaciones).
 * - `setup` corre en cualquier pantalla; `byScreen` agrega las de un tamaño, ej. { '(min-width: 901px)': fn }.
 * - Con "reducir movimiento" no se crea ninguna, y se deshacen solas al salir de la página.
 * Devuelve la ref que va en el elemento raíz de la sección.
 */
export function useScrollScene<T extends HTMLElement = HTMLElement>(
  setup: SceneSetup,
  byScreen: Record<string, SceneSetup> = {},
) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const scene: SceneContext = {
        root,
        q: <E extends HTMLElement>(name: string) => [...root.querySelectorAll<E>(`[data-anim="${name}"]`)],
      };
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => setup(scene));
      for (const [query, extra] of Object.entries(byScreen)) mm.add(`${MOTION_OK} and ${query}`, () => extra(scene));
      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
