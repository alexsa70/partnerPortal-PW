/**
 * Smoke tests: OrganizationsPage — verifies the Organizations list page loads correctly.
 */
import { ORGANIZATIONS_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';

test.describe('Organizations Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ORGANIZATIONS_PATH);
  });

  test('organizations page loads and shows Organization column', async ({ organizationsPage }) => {
    await expect(organizationsPage.colPartnerDb).toBeVisible();
  });

  test('organizations page shows all table columns', async ({ organizationsPage }) => {
    await expect(organizationsPage.colSubPartnerName).toBeVisible();
    await expect(organizationsPage.colNumberOfDevices).toBeVisible();
  });

  test('organizations page has name search input', async ({ organizationsPage }) => {
    await expect(organizationsPage.searchName).toBeVisible();
  });

  test('organizations page URL is correct after goto', async ({ page }) => {
    await expect(page).toHaveURL(/partner\/organizations/);
  });
});
