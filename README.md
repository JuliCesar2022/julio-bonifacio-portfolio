# Portafolio — Julio Bonifacio

Sitio personal hecho con **Next.js 16** (App Router + TypeScript), animaciones con **GSAP** y estilos con
**CSS Modules**. Se exporta como **sitio estático**: `npm run build` genera HTML listo en `out/`, que en
producción sirve Nginx.

## Comandos

```bash
npm install          # una vez (y `npx playwright install msedge` o `chromium` para los tests)
npm run dev          # desarrollo en http://localhost:3000
npm run build        # genera el sitio en out/ (necesita NEXT_PUBLIC_SITE_URL, ver abajo)
npm run preview      # sirve out/ igual que en producción (http://localhost:4173)
npm run lint         # revisa el código
npm run typecheck    # revisa los tipos
npm run test:e2e     # tests de punta a punta sobre out/ (antes: npm run build)
```

GitHub Actions corre lint, tipos, build y tests en cada push a `main` y en cada pull request
(`.github/workflows/ci.yml`). Si algo se rompe, el commit queda marcado en rojo.

## Dónde cambiar cada cosa

Todos los textos y datos están en `src/content/`: los componentes solo los muestran.

| Quiero cambiar…                                         | Archivo                         |
| ------------------------------------------------------- | ------------------------------- |
| Nombre, correo, WhatsApp, redes, CV, años de experiencia | `src/content/site.ts`           |
| Textos de la portada (título, bento, sobre mí, contacto) | `src/content/home.ts`           |
| Proyectos: textos, capturas, videos, datos              | `src/content/projects.ts`       |
| Capítulos de "Mi historia"                              | `src/content/story.ts`          |
| Textos de /proyectos y de la página 404                 | `src/content/pages.ts`          |
| Fotos de la galería y sus textos                        | `src/content/gallery.ts`        |
| Tecnologías del bloque "Stack"                          | `src/content/stack.ts`          |
| Direcciones de las páginas y secciones                  | `src/config/routes.ts`          |
| Imagen al compartir en redes (1200×630)                 | `src/assets/og/portafolio.jpg`  |

- **Formato de texto:** `**negrita**` y `[texto](/ruta o https://…)`. Nada de HTML.
- **Proyecto nuevo:** agrégalo a `projects.ts` y aparece solo en /proyectos, con su página
  (`/proyectos/<slug>`), el sitemap y los datos para Google.
- Los comentarios `EDITA` marcan dónde falta algo tuyo. Un enlace vacío (Instagram, CV, repositorio)
  no se muestra hasta que lo llenes.
- **Imágenes:** van en `src/assets/` y se importan en el archivo de contenido; si falta una, el build
  falla y dice cuál. Al correr `dev` o `build` se generan solas sus versiones más pequeñas
  (`scripts/image-variants.mjs` → `public/_img/`) y cada pantalla descarga la que necesita. Si agregas
  un `<Image>` nuevo, ponle `sizes` (el ancho que ocupa en pantalla).
- **Videos:** van en `public/videos/` y se enlazan con su ruta (`/videos/…`).

## Estructura

```
src/
  app/                    rutas: /, /historia, /proyectos, /proyectos/[slug], 404, sitemap, robots
  content/                todos los textos y datos (sin JSX)
  types/content.ts        la forma de esos datos
  config/routes.ts        direcciones del sitio
  features/
    home/<sección>/       cada sección de la portada en su carpeta:
                            Sección.tsx         el markup (componente de servidor)
                            SecciónScene.tsx    sus animaciones de scroll (GSAP)
                            sección.module.css  sus estilos (con sus ajustes de celular)
    page/                 piezas de las páginas internas (encabezado, cierre, ficha de datos)
    story/                capítulos de Mi historia
    projects/             caso de estudio, lista y anterior/siguiente de los proyectos
  components/
    layout/               menú, pie, botón de WhatsApp
    ui/                   íconos, logo, texto con formato, cifras, enlaces
    motion/               useScrollScene (base de las animaciones) y aparición al hacer scroll
  lib/                    SEO (metadatos y JSON-LD), GSAP, loader de imágenes, variables de entorno
  styles/                 base global (colores, tipografía) y piezas compartidas (botones, títulos)
e2e/                      tests de Playwright
scripts/                  generador de imágenes y servidor de vista previa
```

**Animaciones:** cada sección anima solo sus propios elementos, marcados con `data-anim="…"`
(no con clases CSS, así cambiar estilos no rompe animaciones). `useScrollScene` las crea solo si
el sistema permite movimiento y las deshace al salir. Para que la carga no se trabe en celulares:
- GSAP se descarga aparte (`import()`), fuera del JavaScript inicial.
- **Proyectos en scroll horizontal** (`features/home/reel`): la sección es alta y su escenario queda fijo
  con CSS `sticky` (la altura se reserva en CSS, así la página no salta ni se desfasan los `/#enlaces`);
  GSAP solo convierte el scroll en desplazamiento horizontal. En celular es un carrusel nativo.
- Las secciones de abajo preparan sus animaciones cuando la página terminó de cargar y el navegador
  está libre, una por vez (`whenIdle`), o al primer scroll. La portada las prepara al montar.

## SEO incluido

- HTML completo generado al compilar (Google lo lee sin ejecutar JavaScript).
- Título, descripción y URL canónica por página; Open Graph y Twitter con imagen en todas
  (cada proyecto usa su captura).
- Una página por proyecto, con datos estructurados `CreativeWork` y migas de pan.
- `sitemap.xml`, `robots.txt`, `Person` y `WebSite` en la portada, `ProfilePage` en Mi historia
  e `ItemList` en /proyectos.
- Las direcciones viejas redirigen: `historia.html` → `/historia` (Nginx) y `/proyectos#camila`
  → `/proyectos/camila-ai`.

## Rendimiento (Lighthouse)

| Página               | Celular | Escritorio | Accesibilidad | SEO |
| -------------------- | ------- | ---------- | ------------- | --- |
| Portada              | 99      | 100        | 100           | 100 |
| Mi historia          | 97      | —          | 100           | 100 |
| Proyectos            | 99      | —          | 100           | 100 |

- La portada pesa ~380 KB al abrir: los videos de la vitrina se descargan recién cuando se ven.
- Imágenes responsivas (versiones de 256 a 1080 px) y portadas de video en WebP.
- Bloqueo del procesador al cargar (celular simulado): ~90 ms (antes 1,7 s).
- La entrada de las tarjetas anima variables CSS a propósito: con transform directo la mueve la
  tarjeta gráfica, pero Chrome toma la captura como LCP recién al final (~6 s) y baja el puntaje.

## Publicar en Dokploy

1. Pon tu dominio en `.env.production` (copia `.env.example`):
   `NEXT_PUBLIC_SITE_URL=https://tudominio.com`.
   También puedes ponerlo en Dokploy como *Build-time Argument*.
2. En Dokploy, en una aplicación con **Build Type: Dockerfile** y el puerto **80**: conéctala a este
   repositorio de GitHub o sube el proyecto en un zip sin `node_modules`, `.next` ni `out` (Drop).
3. Deploy. El `Dockerfile` compila con Node 24 y sirve `out/` con Nginx (`nginx.conf`).
4. En Google Search Console, agrega el dominio y envía `https://tudominio.com/sitemap.xml`.

## Notas

- Los cambios de página usan enlaces normales (`<a>`), no `next/link`. Si la portada se monta
  de nuevo sin recargar, ScrollTrigger deja congeladas las animaciones de scroll.
- Con "reducir movimiento" activado en el sistema, todo se muestra sin animaciones.
- Los videos de Camila AI se hacen con Remotion en `C:\dev\video-camila`.
