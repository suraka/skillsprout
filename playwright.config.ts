import { defineConfig } from 'playwright/test';
export default defineConfig({
  testDir: './tests/browser', fullyParallel: false,
  use: { baseURL: 'http://localhost:5173', trace: 'retain-on-failure' },
  webServer: { command: 'pnpm dev', url: 'http://localhost:5173', reuseExistingServer: !process.env.CI, timeout: 120_000 },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
