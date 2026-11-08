'use client';

// GSAP con ScrollTrigger registrado. No se importa directo: useScrollScene lo carga con import()
// después del arranque, así no pesa en la carga inicial (y con "reducir movimiento" ni se descarga).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
