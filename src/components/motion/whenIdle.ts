'use client';

// Cola de trabajos que esperan a que la página termine de cargar y el navegador quede libre.
// Se hacen de a uno por vez (sin trabar la página) y, si la persona empieza a usarla antes
// (scroll, toque, tecla), se hacen todos de inmediato para que nada llegue tarde.

type Job = () => void;

const queue: Job[] = [];
const INTERACTIONS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
let pending = false;

const idle = (fn: () => void) =>
  'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 150);

function stop() {
  INTERACTIONS.forEach((type) => window.removeEventListener(type, flushAll, true));
}

function flushAll() {
  stop();
  while (queue.length) queue.shift()!();
}

function runNext() {
  queue.shift()?.();
  if (queue.length) idle(runNext);
  else {
    pending = false;
    stop();
  }
}

function start() {
  if (pending) return;
  pending = true;
  INTERACTIONS.forEach((type) => window.addEventListener(type, flushAll, { capture: true, passive: true }));
  const begin = () => idle(runNext);
  if (document.readyState === 'complete') begin();
  else window.addEventListener('load', begin, { once: true });
}

/** Agenda un trabajo para cuando el navegador esté libre. Devuelve la función que lo cancela */
export function whenIdle(job: Job) {
  queue.push(job);
  start();
  return () => {
    const i = queue.indexOf(job);
    if (i >= 0) queue.splice(i, 1);
  };
}
