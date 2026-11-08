'use client';

import { useEffect, useRef } from 'react';

import { whenIdle } from './whenIdle';

const MOTION_OK = '(prefers-reduced-motion: no-preference)';

type GsapModule = typeof import('@/lib/gsap');

export type SceneContext = {
  /** Elemento raíz de la sección */
  root: HTMLElement;
  /** Busca dentro de la sección por su gancho de animación: q('card') = [data-anim="card"] */
  q: <T extends HTMLElement = HTMLElement>(name: string) => T[];
  gsap: GsapModule['gsap'];
  ScrollTrigger: GsapModule['ScrollTrigger'];
};

/** Crea las animaciones; si devuelve una función, se llama al deshacerlas */
export type SceneSetup = (scene: SceneContext) => void | (() => void);

/** Animaciones extra para un tamaño de pantalla, ej. { '(min-width: 901px)': fn }. Definir fuera del componente */
export type ScreenScenes = Record<string, SceneSetup>;

const NO_SCREENS: ScreenScenes = {};

/**
 * Animaciones de scroll de una sección. Cada sección tiene las suyas y solo toca sus propios
 * elementos, marcados con data-anim="…" (no clases CSS: así cambiar estilos no rompe animaciones).
 * - GSAP se descarga aparte (import()), sin pesar en la carga inicial.
 * - defer (por defecto): se preparan cuando la página terminó de cargar y el navegador está libre,
 *   o al primer scroll. Cada animación mide la página al crearse; hacerlas todas al cargar traba la
 *   entrada en celulares. defer: false para lo que se ve apenas abre la página.
 * - Con "reducir movimiento" no se crea ninguna, y se deshacen solas al salir de la página.
 * Devuelve la ref que va en el elemento raíz de la sección.
 */
export function useScrollScene<T extends HTMLElement = HTMLElement>(
  setup: SceneSetup,
  { byScreen = NO_SCREENS, defer = true }: { byScreen?: ScreenScenes; defer?: boolean } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia(MOTION_OK).matches) return;

    let active = true;
    let mm: ReturnType<GsapModule['gsap']['matchMedia']> | undefined;

    const build = async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      if (!active) return;
      const scene: SceneContext = {
        root,
        q: <E extends HTMLElement>(name: string) => [...root.querySelectorAll<E>(`[data-anim="${name}"]`)],
        gsap,
        ScrollTrigger,
      };
      mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => setup(scene));
      for (const [query, extra] of Object.entries(byScreen)) mm.add(`${MOTION_OK} and ${query}`, () => extra(scene));
    };

    const cancel = defer ? whenIdle(() => void build()) : (void build(), undefined);
    return () => {
      active = false;
      cancel?.();
      mm?.revert();
    };
  }, [setup, byScreen, defer]);

  return ref;
}
