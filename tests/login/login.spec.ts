/**
 * Smoke test: LoginPage page object loads the login page and key elements are visible.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';

test('login page loads and email input is visible', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await expect(login.emailInput).toBeVisible();
});
