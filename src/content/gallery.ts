// Galería de "Sobre mí". Para agregar una foto: guárdala en src/assets/galeria y ponla aquí.
// area = a (grande), b, c (vertical) o d; focus mueve el encuadre (X% Y%) para no cortar caras.
import demoProyecto from '@/assets/galeria/demo-proyecto.webp';
import encuentroSemilleros from '@/assets/galeria/encuentro-semilleros.webp';
import posterBloqui from '@/assets/galeria/poster-bloqui.webp';
import posterCamila from '@/assets/galeria/poster-camila-ai.webp';
import type { Photo } from '@/types/content';

// EDITA: los textos de cada foto con el proyecto y el evento reales
export const gallery: Photo[] = [
  {
    area: 'a',
    image: demoProyecto,
    alt: 'Grupo frente a la demo de un panel web proyectada en la pared',
    label: 'demo del proyecto',
    caption: 'Presentando la demo del proyecto · 2026',
    // Encuadre a la izquierda para que se vea todo el grupo
    focus: '29% 35%',
  },
  {
    area: 'c',
    image: posterBloqui,
    alt: 'Presentación de un proyecto junto al póster y la demo en el portátil',
    label: 'feria universitaria',
    caption: 'Presentando nuestro proyecto · Feria universitaria',
    focus: '36% 35%',
  },
  {
    area: 'b',
    image: posterCamila,
    alt: 'Dos personas junto al póster de un proyecto',
    label: 'exposición de proyecto',
    caption: 'Exposición de proyecto · 2026',
  },
  {
    area: 'd',
    image: encuentroSemilleros,
    alt: 'Tres personas junto al póster de un proyecto en un evento',
    label: 'encuentro de semilleros',
    caption: 'Encuentro de semilleros · 2026',
  },
];
