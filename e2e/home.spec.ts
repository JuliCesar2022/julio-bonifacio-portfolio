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
  // Las animaciones de las secciones de abajo se preparan cuando la página termina de cargar
  await expect.poll(() => opacity(page, featured, 'Proyecto destacado')).toBeLessThan(0.5);
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

for (const path of ['/', '/historia', '/proyectos', '/proyectos/camila-ai']) {
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

test('los proyectos pasan de lado al hacer scroll (escritorio) o se deslizan (celular)', async ({ page }, testInfo) => {
  await page.goto('/');
  const reel = page.locator('#mis-proyectos');
  const track = reel.locator('[data-anim="track"]');
  await expect(track.getByRole('link', { name: /Ver proyecto: Camila AI/ })).toHaveAttribute('href', '/proyectos/camila-ai');

  if (testInfo.project.name === 'escritorio') {
    // La sección es alta: el scroll vertical por ella mueve la fila en horizontal
    const box = (await reel.boundingBox())!;
    const translateX = () => track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
    await page.evaluate((y) => window.scrollTo(0, y), box.y + 1200);
    await expect.poll(translateX, { timeout: 8000 }).toBeLessThan(-600);
    await expect(reel.locator('[data-anim="counter"]')).not.toHaveText('01');
  } else {
    // En celular es un carrusel: se desliza con el dedo
    const viewport = reel.locator('[data-anim="viewport"]');
    await viewport.scrollIntoViewIfNeeded();
    expect(await viewport.evaluate((el) => el.scrollWidth > el.clientWidth * 3)).toBe(true);
    await viewport.evaluate((el) => el.scrollBy({ left: 400 }));
    await expect.poll(() => viewport.evaluate((el) => el.scrollLeft)).toBeGreaterThan(200);
  }
});

test('el menú salta el paso lateral de los proyectos en vez de recorrerlo', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'escritorio', 'En celular los proyectos no ocupan alto extra');
  await page.goto('/');
  const reel = page.locator('#mis-proyectos');
  // La animación de los proyectos ya está lista cuando su fila tiene transformación
  await expect
    .poll(() => reel.locator('[data-anim="viewport"]').evaluate((el) => getComputedStyle(el).transform))
    .not.toBe('none');
  const box = await reel.evaluate((el) => ({ top: el.getBoundingClientRect().top + scrollY, height: el.getBoundingClientRect().height }));

  // Anota cada posición del scroll desde el clic hasta llegar
  await page.evaluate(() => {
    const w = window as unknown as { positions: number[] };
    w.positions = [];
    addEventListener('scroll', () => w.positions.push(scrollY), { passive: true });
  });
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Sobre mí' }).click();
  await expect(page.locator('#sobre-mi')).toBeInViewport();

  const positions = await page.evaluate(() => (window as unknown as { positions: number[] }).positions);
  const screen = page.viewportSize()!.height;
  const throughTheMiddle = positions.filter((y) => y > box.top + screen && y < box.top + box.height - 2 * screen);
  expect(throughTheMiddle).toEqual([]);
});
