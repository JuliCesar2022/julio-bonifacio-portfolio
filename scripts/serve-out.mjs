// Sirve el sitio compilado (out/) igual que el Nginx de producción: /historia -> historia.html,
// 404.html para lo que no existe y soporte de rangos para los videos.
// Uso: node scripts/serve-out.mjs [puerto]   (lo usan `npm run preview` y los tests)
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const ROOT = 'out';
const port = Number(process.argv[2] ?? 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
};

const isFile = (path) => {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
};

createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  const base = join(ROOT, normalize(pathname).replace(/^([/\\])+/, ''));
  const found = [base, `${base}.html`, join(base, 'index.html')].find(isFile);
  const file = found ?? join(ROOT, '404.html');
  const size = statSync(file).size;
  const headers = { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream', 'Accept-Ranges': 'bytes' };
  const range = found && req.headers.range?.match(/bytes=(\d+)-(\d*)/);

  if (range) {
    const start = Number(range[1]);
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    createReadStream(file, { start, end }).pipe(res);
  } else {
    res.writeHead(found ? 200 : 404, { ...headers, 'Content-Length': size });
    createReadStream(file).pipe(res);
  }
}).listen(port, () => console.log(`Sitio compilado en http://localhost:${port}`));
