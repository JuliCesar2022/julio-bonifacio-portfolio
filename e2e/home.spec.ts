import { expect, test, type Page } from '@playwright/test';

// La portada y sus animaciones. Los selectores usan roles, textos e ids (no clases CSS),
// así los tests siguen sirviendo aunque cambien los estilos.

const opacity = (page: Page, selector: string, text: string) =>
  page.locator(selector, { hasText: text }).evaluate((el) => Number(getComputedStyle(el).opacity));

test('el título se escribe solo hasta completar la frase', async ({ page }) => {
  await page.goto('/');
  const title = page.getByRole('heading', { level: 1, name: 'Convierto ideas en productos que se usan.' });
  // innerText ignora el texto invisible que reserva el espacio: es lo que se ve
  await expect
    .poll(() => title.evaluate((h) => (h as HTMLElement).innerText.replace(/\s+/g, ' ').trim()), { timeout: 8000 })
    .toBe('Convierto ideas en pr✳ductos que se usan.');
});

test('las tarjetas de la portada se turnan', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#inicio [style*="--i"]');
  expect(await cards.count()).toBeGreaterThanOrEqual(5);
  const order = () => cards.evaluateAll((els) => els.map((el) => (el as HTMLElement).style.getPropertyValue('--i')).join());
  const initial = await order();
  await expect.poll(order, { timeout: 10_000 }).not.toBe(initial);
});

test('las tarjetas del bento aparecen al hacer scroll', async ({ page }) => {
  await page.goto('/');
  const featured = '#proyectos article';
  expect(await opacity(page, featured, 'Proyecto destacado')).toBeLessThan(0.5);
  await page.locator(featured, { hasText: 'Proyecto destacado' }).scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 300);
  await expect.poll(() => opacity(page, featured, 'Proyecto destacado'), { timeout: 6000 }).toBeGreaterThan(0.95);
});

test('los videos se descargan recién al llegar a la vitrina', async ({ page }) => {
  await page.goto('/');
  const videos = page.locator('video');
  await expect(videos).toHaveCount(2);
  expect(await videos.evaluateAll((els) => els.map((v) => v.getAttribute('src')))).toEqual([null, null]);

  await videos.first().scrollIntoViewIfNeeded();
  await expect
    .poll(() => videos.evaluateAll((els) => els.every((v) => (v as HTMLVideoElement).src.includes('/videos/camila'))))
    .toBe(true);
  await expect
    .poll(() => videos.evaluateAll((els) => els.every((v) => !(v as HTMLVideoElement).paused)), { timeout: 8000 })
    .toBe(true);
});

test('la galería abre la foto en grande y se cierra con Esc', async ({ page }) => {
  await page.goto('/#sobre-mi');
  await page.getByRole('button', { name: 'Ampliar foto: demo del proyecto' }).click();
  const dialog = page.getByRole('dialog', { name: 'Foto ampliada' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img')).toHaveAttribute('alt', /demo de un panel web/);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('las imágenes usan versiones de su tamaño', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#inicio img').first()).toHaveAttribute('srcset', /\/_img\/[a-z-]+-\d+\.webp \d+w/);
});

for (const path of ['/', '/historia', '/proyectos']) {
  test(`sin errores en la consola: ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(path);
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1500);
    expect(errors).toEqual([]);
  });
}
