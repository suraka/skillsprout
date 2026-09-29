import { defineConfig } from '@playwright/test';
import { loadStagingConfig } from './scripts/staging-test-config.mjs';

const staging = loadStagingConfig(process.env);

export default defineConfig({
  testDir: './tests/staging',
  testMatch: 'auth.spec.ts',
  fullyParallel: false,
  use: {
    baseURL: staging.baseURL,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
