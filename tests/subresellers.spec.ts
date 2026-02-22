/**
 * Smoke tests: SubResellersPage — verifies the Sub-Partners list page loads correctly.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { SubResellersPage } from '../pages/subresellers/SubResellersPage';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(EMAIL, PASSWORD);
});

test('sub-partners page loads and shows Assigned Devices column', async ({ page }) => {
  const subResellers = new SubResellersPage(page);
  await subResellers.goto();
  await expect(subResellers.colAssignedDevices).toBeVisible();
});

test('sub-partners page shows all table columns', async ({ page }) => {
  const subResellers = new SubResellersPage(page);
  await subResellers.goto();
  await expect(subResellers.colName).toBeVisible();
  await expect(subResellers.colEmail).toBeVisible();
  await expect(subResellers.colActivatedDevices).toBeVisible();
});

test('sub-partners page has name and email search inputs', async ({ page }) => {
  const subResellers = new SubResellersPage(page);
  await subResellers.goto();
  await expect(subResellers.searchName).toBeVisible();
  await expect(subResellers.searchEmail).toBeVisible();
});

test('sub-partners page URL is correct after goto', async ({ page }) => {
  const subResellers = new SubResellersPage(page);
  await subResellers.goto();
  await expect(page).toHaveURL(/partner\/subresellers/);
});
