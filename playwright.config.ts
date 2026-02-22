import { defineConfig, devices } from '@playwright/test';
import { APP_URL } from './config/endpoints';
import { DEFAULT_TIMEOUT_MS } from './constants/timeouts';

// Load .env so TEST_EMAIL / TEST_PASSWORD are available in tests (Node 20.12+).
process.loadEnvFile?.();

/**
 * Playwright config for Surfsight Partner staging.
 * Base URL has no hash; page objects (e.g. LoginPage) navigate to #/login explicitly.
 * Page objects: pages/; tests: tests/.
 */
export default defineConfig({
  testDir: './tests',
  timeout: DEFAULT_TIMEOUT_MS,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: APP_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
