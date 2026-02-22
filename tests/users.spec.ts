/**
 * Smoke tests: UsersPage — verifies the Users list page loads correctly.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { UsersPage } from '../pages/users/UsersPage';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(EMAIL, PASSWORD);
});

test('users page loads and shows Name column', async ({ page }) => {
  const users = new UsersPage(page);
  await users.goto();
  await expect(users.colName).toBeVisible();
});

test('users page shows Email column', async ({ page }) => {
  const users = new UsersPage(page);
  await users.goto();
  await expect(users.colEmail).toBeVisible();
});

test('users page has name and email search inputs', async ({ page }) => {
  const users = new UsersPage(page);
  await users.goto();
  await expect(users.searchName).toBeVisible();
  await expect(users.searchEmail).toBeVisible();
});

test('users page URL is correct after goto', async ({ page }) => {
  const users = new UsersPage(page);
  await users.goto();
  await expect(page).toHaveURL(/partner\/users/);
});
