import { expect, test } from '@playwright/test';

// Lo que Google y las redes leen de cada página
const pages = [
  { path: '/', title: /^Julio Bonifacio — Desarrollador full stack/, jsonLd: ['Person', 'WebSite'] },
  { path: '/historia', title: 'Mi historia — Julio Bonifacio', jsonLd: ['ProfilePage'] },
  { path: '/proyectos', title: 'Proyectos — Julio Bonifacio', jsonLd: ['ItemList'] },
  ...[
    ['camila-ai', 'Camila AI'],
    ['bloqui', 'Bloqui'],
    ['cecar', 'Cecar y Asociados'],
    ['crm-cecar', 'CRM Cecar'],
    ['eduplay', 'EduPlay'],
  ].map(([slug, name]) => ({
    path: `/proyectos/${slug}`,
    title: `${name} — Julio Bonifacio`,
    jsonLd: ['CreativeWork', 'BreadcrumbList'],
  })),
];

for (const { path, title, jsonLd } of pages) {
  test(`SEO de ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{60,}/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical ?? '').pathname.replace(/\/$/, '')).toBe(path.replace(/\/$/, ''));
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\.(jpg|png|webp)/);
    await expect(page.locator('h1')).toHaveCount(1);

    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? '{}')['@type']));
    expect(types).toEqual(jsonLd);
  });
}

test('sitemap.xml y robots.txt', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const { path } of pages) expect(sitemap).toContain(`${path === '/' ? '' : path}</loc>`);

  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/Allow: \//);
  expect(robots).toMatch(/Sitemap: .+\/sitemap\.xml/);
});

test('página 404 propia y sin indexar', async ({ page }) => {
  const response = await page.goto('/esta-pagina-no-existe');
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle(/Página no encontrada/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});
