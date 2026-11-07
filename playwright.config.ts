import { defineConfig, devices } from '@playwright/test';

// Tests de punta a punta sobre el sitio compilado (out/), igual al que se publica.
// Antes: `npm run build`. En tu PC usa Edge (ya instalado); en GitHub Actions, Chromium.
const PORT = 4173;
const CI = Boolean(process.env.CI);
const channel = CI ? undefined : 'msedge';

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, channel } },
    // SEO y menú no cambian con la pantalla (y en celular el menú oculta sus enlaces): solo en escritorio
    { name: 'celular', use: { ...devices['Pixel 7'], channel }, testIgnore: /(seo|navigation)\.spec\.ts$/ },
  ],
  webServer: {
    command: `node scripts/serve-out.mjs ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !CI,
  },
});
