// Genera versiones más pequeñas de las imágenes de src/assets (para que el celular no descargue
// una captura de 1400 px si la muestra a 210 px). next/image elige la adecuada para cada pantalla
// con src/lib/image-loader.ts. Corre solo antes de `npm run dev` y `npm run build`.
//
// Salida (no se guarda en git, se vuelve a generar):
//   public/_img/<nombre>-<ancho>.webp   las versiones
//   src/lib/image-variants.json         qué anchos tiene cada imagen
import { mkdir, readdir, stat, utimes, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = 'src/assets';
const OUTPUT = 'public/_img';
const MANIFEST = 'src/lib/image-variants.json';
const WIDTHS = [256, 384, 640, 828, 1080];
const QUALITY = 75;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // og/: imagen para compartir en redes, se usa entera
      if (entry.name !== 'og') yield* walk(full);
    } else if (/\.(webp|png|jpe?g)$/i.test(entry.name)) yield full;
  }
}

// Cada versión lleva la fecha de modificación de su original. Si no coinciden, se rehace: así también
// se rehace cuando una foto se reemplaza o se renombra (al renombrar, el archivo conserva su fecha vieja)
const isFresh = async (output, sourceMs) => {
  try {
    return Math.trunc((await stat(output)).mtimeMs) === Math.trunc(sourceMs);
  } catch {
    return false;
  }
};

await mkdir(OUTPUT, { recursive: true });
const manifest = {};
let created = 0;

for await (const file of walk(SOURCE)) {
  const name = path.parse(file).name;
  if (manifest[name]) throw new Error(`Dos imágenes se llaman "${name}" en ${SOURCE}: cámbiale el nombre a una`);

  const { width } = await sharp(file).metadata();
  const { mtime, mtimeMs } = await stat(file);
  // Solo versiones más pequeñas que el original (nunca se agranda)
  const widths = WIDTHS.filter((w) => w < width);
  manifest[name] = widths;

  for (const w of widths) {
    const output = path.join(OUTPUT, `${name}-${w}.webp`);
    if (await isFresh(output, mtimeMs)) continue;
    await sharp(file).resize({ width: w }).webp({ quality: QUALITY }).toFile(output);
    await utimes(output, new Date(), mtime);
    created += 1;
  }
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Imágenes: ${Object.keys(manifest).length} originales, ${created} versiones nuevas en ${OUTPUT}`);
