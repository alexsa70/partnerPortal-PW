/**
 * Smoke test: LoginPage page object loads the login page and key elements are visible.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';

test.describe('Login Page', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('login page loads with correct URL', async ({page}) => {
    await expect(page).toHaveURL(/login/);
    console.log('login page loads with correct URL PASS successfully');
  });

  test('login page loads and key elements are visible', async () => {
    await expect(login.emailInput).toBeVisible();
    await expect(login.passwordInput).toBeVisible();
    await expect(login.submitButton).toBeVisible();
    await expect(login.forgotPasswordLink).toBeVisible();
    console.log('login page loads and key elements are visible PASS successfully');
  });
  });
   