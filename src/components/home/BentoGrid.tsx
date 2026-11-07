'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Cuadrícula del bento con brillo que sigue al mouse (solo con mouse y sin "reducir movimiento").
 * Cada tarjeta recibe la posición del cursor relativa a ella (--mx/--my), así el borde de las
 * vecinas también se ilumina.
 */
export function BentoGrid({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const tiles = [...grid.querySelectorAll<HTMLElement>('.tile')];
    let pending: PointerEvent | null = null;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pending = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!pending) return;
        const { clientX, clientY } = pending;
        tiles.forEach((tile) => {
          const r = tile.getBoundingClientRect();
          tile.style.setProperty('--mx', `${clientX - r.left}px`);
          tile.style.setProperty('--my', `${clientY - r.top}px`);
        });
        pending = null;
      });
    };
    const onEnter = () => grid.classList.add('glow');
    const onLeave = () => grid.classList.remove('glow');

    grid.addEventListener('pointermove', onMove);
    grid.addEventListener('pointerenter', onEnter);
    grid.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      grid.removeEventListener('pointermove', onMove);
      grid.removeEventListener('pointerenter', onEnter);
      grid.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="bento" ref={gridRef}>
      {children}
    </div>
  );
}
