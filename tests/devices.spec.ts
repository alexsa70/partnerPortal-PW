/**
 * Smoke tests: DevicesPage — verifies the Devices list page loads correctly.
 */
import { DEVICES_PATH } from '../constants/routes';
import { test, expect } from '../fixtures';

test.describe('Devices Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEVICES_PATH);
  });

  test('devices page loads and shows Device Name column', async ({ devicesPage }) => {
    await expect(devicesPage.colDeviceName).toBeVisible();
  });

  test('devices page shows key table columns', async ({ devicesPage }) => {
    await expect(devicesPage.colImei).toBeVisible();
    await expect(devicesPage.colBillingStatus).toBeVisible();
    await expect(devicesPage.colOrganization).toBeVisible();
  });

  test('devices page has Device Name search input', async ({ devicesPage }) => {
    await expect(devicesPage.searchDeviceName).toBeVisible();
  });

  test('devices page has IMEI search input', async ({ devicesPage }) => {
    await expect(devicesPage.searchImei).toBeVisible();
  });

  test('devices page URL is correct after goto', async ({ page }) => {
    await expect(page).toHaveURL(/partner\/devices/);
  });
});
