import { expect, test } from '@playwright/test';

test('del inicio a Mi historia y de vuelta a Proyectos', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Mi historia' }).click();
  await expect(page).toHaveURL(/\/historia$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Un poco de');
  await expect(page.getByRole('link', { name: 'Mi historia' })).toHaveAttribute('aria-current', 'page');

  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Proyectos' }).click();
  await expect(page).toHaveURL(/\/#proyectos$/);
  // El salto al ancla ocurre al terminar de cargar la portada (puede tardar con la CPU ocupada)
  await expect(page.locator('#proyectos')).toBeInViewport({ timeout: 10_000 });
});

test('volver al portafolio desde Proyectos', async ({ page }) => {
  await page.goto('/proyectos');
  await page.getByRole('link', { name: /Volver al portafolio/ }).click();
  await expect(page).toHaveURL(/\/#proyectos$/);
});

test('redes y contacto en el pie y el botón flotante', async ({ page }) => {
  await page.goto('/');
  const social = page.getByRole('list', { name: 'Redes y contacto' });
  await expect(social.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/JuliCesar2022');
  await expect(social.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', /linkedin\.com\/in\//);
  await expect(social.getByRole('link', { name: 'Correo' })).toHaveAttribute('href', 'mailto:juliobonifacio53@gmail.com');
  await expect(page.getByRole('link', { name: 'Escríbeme por WhatsApp' })).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/573026736193\?text=/,
  );
});
