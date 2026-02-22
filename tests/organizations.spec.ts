/**
 * Smoke tests: OrganizationsPage — verifies the Organizations list page loads correctly.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { OrganizationsPage } from '../pages/organizations/OrganizationsPage';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(EMAIL, PASSWORD);
});

test('organizations page loads and shows Organization column', async ({ page }) => {
  const orgs = new OrganizationsPage(page);
  await orgs.goto();
  await expect(orgs.colPartnerDb).toBeVisible();
});

test('organizations page shows all table columns', async ({ page }) => {
  const orgs = new OrganizationsPage(page);
  await orgs.goto();
  await expect(orgs.colPartnerDb).toBeVisible();
  await expect(orgs.colSubPartnerName).toBeVisible();
  await expect(orgs.colNumberOfDevices).toBeVisible();
});

test('organizations page has name search input', async ({ page }) => {
  const orgs = new OrganizationsPage(page);
  await orgs.goto();
  await expect(orgs.searchName).toBeVisible();
});

test('organizations page URL is correct after goto', async ({ page }) => {
  const orgs = new OrganizationsPage(page);
  await orgs.goto();
  await expect(page).toHaveURL(/partner\/organizations/);
});
