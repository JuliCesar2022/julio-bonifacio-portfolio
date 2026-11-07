// Tecnologías del bento "Stack". Logos de Devicon (licencia MIT) en src/assets/stack.
import angular from '@/assets/stack/angular.svg';
import figma from '@/assets/stack/figma.svg';
import nestjs from '@/assets/stack/nestjs.svg';
import nodejs from '@/assets/stack/nodejs.svg';
import postgresql from '@/assets/stack/postgresql.svg';
import react from '@/assets/stack/react.svg';
import typescript from '@/assets/stack/typescript.svg';
import type { Tech } from '@/types/content';

export const stack: Tech[] = [
  { name: 'React', logo: react },
  { name: 'Angular', logo: angular },
  { name: 'TypeScript', logo: typescript },
  { name: 'Node.js', logo: nodejs },
  { name: 'NestJS', logo: nestjs },
  { name: 'PostgreSQL', logo: postgresql },
  { name: 'Figma', logo: figma },
];
