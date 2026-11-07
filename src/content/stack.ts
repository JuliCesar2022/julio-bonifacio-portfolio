// Tecnologías del bento "Stack". Logos de Devicon (licencia MIT) en src/assets/stack.
import type { StaticImageData } from 'next/image';

import angular from '@/assets/stack/angular.svg';
import figma from '@/assets/stack/figma.svg';
import nestjs from '@/assets/stack/nestjs.svg';
import nodejs from '@/assets/stack/nodejs.svg';
import postgresql from '@/assets/stack/postgresql.svg';
import react from '@/assets/stack/react.svg';
import typescript from '@/assets/stack/typescript.svg';

export const stack: { name: string; logo: StaticImageData }[] = [
  { name: 'React', logo: react },
  { name: 'Angular', logo: angular },
  { name: 'TypeScript', logo: typescript },
  { name: 'Node.js', logo: nodejs },
  { name: 'NestJS', logo: nestjs },
  { name: 'PostgreSQL', logo: postgresql },
  { name: 'Figma', logo: figma },
];
