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
    console.log('successful login with credentials provided PASS successfully');
  });

  test('unsuccessful login with invalid credentials',async ({ page }) => {
    const email = 'invalid@example.com';
    const password = 'invalidpassword';
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with invalid credentials PASS successfully');
  });
  test('unsuccessful login with empty credentials',async ({ page }) => {
    const email = '';
    const password = '';
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with empty credentials PASS successfully');
  });
  test('unsuccessful login with invalid email',async ({ page }) => {
    const email = 'invalidemail';
    const password = process.env.TEST_PASSWORD!;
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with invalid email PASS successfully');
  });
  test('unsuccessful login with invalid password',async ({ page }) => {
    const email = process.env.TEST_EMAIL!;
    const password = 'invalidpassword';
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with invalid password PASS successfully');
  });
  test('unsuccessful login with empty password',async ({ page }) => {
    const email = process.env.TEST_EMAIL!;
    const password = '';
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with empty password PASS successfully');
  });
  test('unsuccessful login with empty email',async ({ page }) => {
    const email = '';
    const password = process.env.TEST_PASSWORD!;
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with empty email PASS successfully');
  });
  test('unsuccessful login with empty email and password',async ({ page }) => {
    const email = '';
    const password = '';
    await login.fillCredentials(email, password);
    await login.acceptTerms();
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with empty email and password PASS successfully');
  });   

  test('unsuccessful login with valid email and password without accepting terms',async ({ page }) => {
    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;
    await login.fillCredentials(email, password);
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with valid email and password without accepting terms PASS successfully');
  });
  test('unsuccessful login with invalid email and password without accepting terms',async ({ page }) => {
    const email = 'invalidemail';
    const password = 'invalidpassword';
    await login.fillCredentials(email, password);
    await login.submit();
    await expect(page).toHaveURL(/login/);
    console.log('unsuccessful login with invalid email and password without accepting terms PASS successfully');
  });
});