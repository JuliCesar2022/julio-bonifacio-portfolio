# Portafolio — Julio Bonifacio

Sitio personal hecho con **Next.js 16** (App Router + TypeScript) y animaciones con **GSAP**.
Se exporta como **sitio estático**: `npm run build` genera HTML listo en `out/`, que en producción sirve Nginx.

## Comandos

```bash
npm install          # una vez
npm run dev          # desarrollo en http://localhost:3000
npm run build        # genera el sitio en out/ (necesita NEXT_PUBLIC_SITE_URL, ver abajo)
npm run preview      # mira out/ como quedará publicado
npm run lint         # revisa el código
npm run typecheck    # revisa los tipos
```

## Dónde cambiar cada cosa

| Quiero cambiar…                                  | Archivo                                   |
| ------------------------------------------------ | ----------------------------------------- |
| Nombre, correo, WhatsApp, redes, CV, descripción | `src/content/site.ts`                     |
| Textos, capturas, videos y datos de proyectos    | `src/content/projects.tsx`                |
| Fotos de la galería y sus textos                 | `src/content/gallery.ts`                  |
| Tecnologías del bloque "Stack"                   | `src/content/stack.ts`                    |
| Capítulos de "Mi historia"                       | `src/app/historia/page.tsx`               |
| Imagen al compartir en redes (1200×630)          | `src/app/opengraph-image.jpg` (+ `.alt.txt`) |

Los comentarios `EDITA` marcan dónde falta algo tuyo. Un enlace vacío (Instagram, CV, repositorio)
no se muestra hasta que lo llenes.

**Imágenes:** van en `src/assets/` y se importan en el archivo de contenido. Si falta una, el build
falla y te dice cuál. Al correr `npm run dev` o `npm run build` se generan solas sus versiones más
pequeñas (`scripts/image-variants.mjs` → `public/_img/`), y cada pantalla descarga la que necesita.
Si agregas una imagen nueva, ponle `sizes` (el ancho que ocupa en pantalla) en su `<Image>`.
**Videos:** van en `public/videos/` y se enlazan con su ruta (`/videos/…`).

## Estructura

```
src/
  app/                 páginas (/, /historia, /proyectos), 404, sitemap, robots, SEO
  components/
    layout/            menú, pie, botón de WhatsApp
    home/              secciones de la portada (+ HomeScenes: animaciones GSAP)
    story/             piezas de las páginas internas
    projects/          caso de estudio de cada proyecto
    ui/                íconos, logo y piezas compartidas
    motion/            aparición al hacer scroll (.reveal)
  content/             todos los textos y datos del sitio
  lib/seo.ts           metadatos por página y datos estructurados (JSON-LD)
  lib/image-loader.ts  elige la versión de cada imagen según la pantalla
scripts/               generador de versiones de imágenes (corre solo antes de dev y build)
  styles/              CSS por sección (el orden de importación está en app/globals.css)
```

## SEO incluido

- HTML completo generado al compilar (Google lo lee sin ejecutar JavaScript).
- Título, descripción y URL canónica por página; Open Graph y Twitter para las vistas previas.
- `sitemap.xml`, `robots.txt` y datos estructurados: `Person` y `WebSite` en la portada,
  `ProfilePage` en Mi historia e `ItemList` de proyectos.
- Fuente servida desde el mismo sitio (`next/font`) e imágenes con tamaño reservado (sin saltos al cargar).
- Las direcciones viejas `historia.html` y `proyectos.html` redirigen (301) a las nuevas.

## Rendimiento (Lighthouse, 6 nov 2026)

| Página               | Celular | Escritorio | Accesibilidad | SEO |
| -------------------- | ------- | ---------- | ------------- | --- |
| Portada              | 90–91   | 100        | 100           | 100 |
| Mi historia          | 97      | —          | 100           | 100 |
| Proyectos            | 99      | —          | 100           | 100 |

- La portada pesa ~380 KB al abrir: los videos de la vitrina se descargan recién cuando se ven.
- Imágenes responsivas (versiones de 256 a 1080 px) y portadas de video en WebP.
- Lo que más pesa en celular es el primer cálculo de las animaciones de scroll de GSAP.

## Publicar en Dokploy

1. Pon tu dominio en `.env.production` (copia `.env.example`):
   `NEXT_PUBLIC_SITE_URL=https://tudominio.com`.
   También puedes ponerlo en Dokploy como *Build-time Argument*.
2. En Dokploy, en una aplicación con **Build Type: Dockerfile** y el puerto **80**: sube el proyecto
   en un zip sin `node_modules`, `.next` ni `out` (Drop) o conéctalo a GitHub.
3. Deploy. El `Dockerfile` compila con Node 24 y sirve `out/` con Nginx (`nginx.conf`).
4. En Google Search Console, agrega el dominio y envía `https://tudominio.com/sitemap.xml`.

## Notas

- Los cambios de página usan enlaces normales (`<a>`), no `next/link`. Si la portada se monta
  de nuevo sin recargar, ScrollTrigger deja congeladas las animaciones de scroll.
- Con "reducir movimiento" activado en el sistema, todo se muestra sin animaciones.
- Los videos de Camila AI se hacen con Remotion en `C:\dev\video-camila`.
