/**
 * Smoke tests: DevicesPage — verifies the Devices list page loads correctly.
 */
import { test, expect } from '../fixtures';

test('devices page loads and shows Device Name column', async ({ devicesPage }) => {
  await devicesPage.goto();
  await expect(devicesPage.colDeviceName).toBeVisible();
});

test('devices page shows key table columns', async ({ devicesPage }) => {
  await devicesPage.goto();
  await expect(devicesPage.colImei).toBeVisible();
  await expect(devicesPage.colBillingStatus).toBeVisible();
  await expect(devicesPage.colOrganization).toBeVisible();
});

test('devices page has Device Name search input', async ({ devicesPage }) => {
  await devicesPage.goto();
  await expect(devicesPage.searchDeviceName).toBeVisible();
});

test('devices page has IMEI search input', async ({ devicesPage }) => {
  await devicesPage.goto();
  await expect(devicesPage.searchImei).toBeVisible();
});

test('devices page URL is correct after goto', async ({ devicesPage, page }) => {
  await devicesPage.goto();
  await expect(page).toHaveURL(/partner\/devices/);
});
