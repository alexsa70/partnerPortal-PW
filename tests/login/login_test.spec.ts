import { test, expect, type Locator } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage';

test.describe('Login Page', () => {
  let login: LoginPage;
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('login page displays all key elements', async () => {
    const elements: [string, Locator][] = [
      ['email input', login.emailInput],
      ['password input', login.passwordInput],
      ['submit button', login.submitButton],
      ['forgot password link', login.forgotPasswordLink],
    ];
    for (const [name, element] of elements) {
      await expect(element, `${name} should be visible`).toBeVisible();
    }
    console.log('login page displays all key elements PASS successfully');
  });
});
