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
    console.log('organizations page loads and shows Organization column PASS successfully');
  });

  test('organizations page shows all table columns', async ({ organizationsPage }) => {
    await expect(organizationsPage.colSubPartnerName).toBeVisible();
    await expect(organizationsPage.colNumberOfDevices).toBeVisible();
    console.log('organizations page shows all table columns PASS successfully');
  });

  test('organizations page has name search input', async ({ organizationsPage }) => {
    await expect(organizationsPage.searchName).toBeVisible();
    console.log('organizations page has name search input PASS successfully');
  });

  test('organizations page URL is correct after goto', async ({ page }) => {
    await expect(page).toHaveURL(/partner\/organizations/);
    console.log('organizations page URL is correct after goto PASS successfully');
  });
});
