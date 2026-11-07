import { expect, test } from '@playwright/test';

// Con "reducir movimiento" activado en el sistema: mismo contenido, sin animaciones
test.use({ reducedMotion: 'reduce' });

test('todo se ve de una, sin animaciones ni videos', async ({ page }) => {
  await page.goto('/');

  const title = page.getByRole('heading', { level: 1 });
  await expect
    .poll(() => title.evaluate((h) => (h as HTMLElement).innerText.replace(/\s+/g, ' ').trim()), { timeout: 1500 })
    .toBe('Convierto ideas en pr✳ductos que se usan.');

  const featured = page.locator('#proyectos article', { hasText: 'Proyecto destacado' });
  expect(await featured.evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);

  const videos = page.locator('video');
  await videos.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  expect(await videos.evaluateAll((els) => els.map((v) => v.getAttribute('src')))).toEqual([null, null]);
});
