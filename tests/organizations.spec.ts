/**
 * Smoke tests: OrganizationsPage — verifies the Organizations list page loads correctly.
 */
import { test, expect } from '../fixtures';

test('organizations page loads and shows Organization column', async ({ organizationsPage }) => {
  await organizationsPage.goto();
  await expect(organizationsPage.colPartnerDb).toBeVisible();
});

test('organizations page shows all table columns', async ({ organizationsPage }) => {
  await organizationsPage.goto();
  await expect(organizationsPage.colSubPartnerName).toBeVisible();
  await expect(organizationsPage.colNumberOfDevices).toBeVisible();
});

test('organizations page has name search input', async ({ organizationsPage }) => {
  await organizationsPage.goto();
  await expect(organizationsPage.searchName).toBeVisible();
});

test('organizations page URL is correct after goto', async ({ organizationsPage, page }) => {
  await organizationsPage.goto();
  await expect(page).toHaveURL(/partner\/organizations/);
});
