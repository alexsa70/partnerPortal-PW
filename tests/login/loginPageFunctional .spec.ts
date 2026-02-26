/**
 * Smoke test: LoginPage page object loads the login page and functional tests are performed.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';

test.describe('Login Page', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

 
  test('successful login with credentials provided',async ({ page }) => {
    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;   
    await login.login(email, password);
    await expect(page).not.toHaveURL(/login/);
  });

  test('unsuccessful login with invalid credentials',async ({ page }) => {
    const email = 'invalid@example.com';
    const password = 'invalidpassword';
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
  });
});