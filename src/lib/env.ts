// Variables de entorno del sitio, validadas en un solo lugar.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// El dominio real se usa en la URL canónica, el sitemap y las tarjetas para redes:
// sin él, Google indexaría direcciones equivocadas. Por eso el build de producción se detiene si falta.
if (!siteUrl && process.env.NODE_ENV === 'production') {
  throw new Error(
    'Falta NEXT_PUBLIC_SITE_URL (ej. https://tudominio.com). Ponla en .env.production o como variable de build en Dokploy.',
  );
}

/** Dominio público, sin "/" al final. En desarrollo: localhost */
export const SITE_URL = (siteUrl ?? 'http://localhost:3000').replace(/\/$/, '');
