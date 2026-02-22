/**
 * Smoke tests: SubResellersPage — verifies the Sub-Partners list page loads correctly.
 */
import { SUBRESELLERS_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';

test.describe('Sub-Partners Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SUBRESELLERS_PATH);
  });

  test('sub-partners page loads and shows Assigned Devices column', async ({ subResellersPage }) => {
    await expect(subResellersPage.colAssignedDevices).toBeVisible();
  });

  test('sub-partners page shows all table columns', async ({ subResellersPage }) => {
    await expect(subResellersPage.colName).toBeVisible();
    await expect(subResellersPage.colEmail).toBeVisible();
    await expect(subResellersPage.colActivatedDevices).toBeVisible();
  });

  test('sub-partners page has name and email search inputs', async ({ subResellersPage }) => {
    await expect(subResellersPage.searchName).toBeVisible();
    await expect(subResellersPage.searchEmail).toBeVisible();
  });

  test('sub-partners page URL is correct after goto', async ({ page }) => {
    await expect(page).toHaveURL(/partner\/subresellers/);
  });
});
