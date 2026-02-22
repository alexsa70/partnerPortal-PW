/**
 * Global setup: logs in once before the test suite and saves the browser
 * storage state (cookies + localStorage) to .auth/user.json.
 *
 * All authenticated tests then reuse this state via the custom fixture in
 * fixtures/index.ts — eliminating repeated login on every test.
 */
import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export const AUTH_FILE = path.resolve('.auth/user.json');

export default async function globalSetup() {
  process.loadEnvFile?.();

  const email = process.env.TEST_EMAIL ?? '';
  const password = process.env.TEST_PASSWORD ?? '';

  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://partner.stage2.surfsight.net/#/login', {
    waitUntil: 'networkidle',
  });

  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);

  const checkbox = page.locator('md-checkbox').first();
  if ((await checkbox.getAttribute('aria-checked')) !== 'true') {
    await checkbox.click();
  }

  await page.getByRole('button', { name: 'Log In' }).click();
  await page
    .getByRole('link', { name: 'Dashboard', exact: true })
    .first()
    .waitFor({ timeout: 30_000 });

  await page.context().storageState({ path: AUTH_FILE });
  await browser.close();

  console.log('✅ Auth state saved to', AUTH_FILE);
}
