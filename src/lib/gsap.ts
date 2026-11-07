'use client';

// GSAP con sus plugins registrados una sola vez. Las animaciones importan desde aquí, no desde 'gsap'.
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
