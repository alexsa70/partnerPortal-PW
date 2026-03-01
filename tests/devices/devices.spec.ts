/**
 * Smoke tests: DevicesPage — verifies the Devices list page loads correctly.
 */
import { DEVICES_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';

test.describe('Devices Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEVICES_PATH);
  });

  test('devices page loads and shows Device Name column', async ({ devicesPage }) => {
    await expect(devicesPage.colDeviceName).toBeVisible();
    console.log('devices page loads and shows Device Name column PASS successfully');
  });

  test('devices page shows key table columns', async ({ devicesPage }) => {
    await expect(devicesPage.colImei).toBeVisible();
    await expect(devicesPage.colBillingStatus).toBeVisible();
    await expect(devicesPage.colOrganization).toBeVisible();
    console.log('devices page shows key table columns PASS successfully');
  });

  test('devices page has Device Name search input', async ({ devicesPage }) => {
    await expect(devicesPage.searchDeviceName).toBeVisible();
    console.log('devices page has Device Name search input PASS successfully');
  });

  test('devices page has IMEI search input', async ({ devicesPage }) => {
    await expect(devicesPage.searchImei).toBeVisible();
    console.log('devices page has IMEI search input PASS successfully');
  });

  test('devices page URL is correct after goto', async ({ page }) => {
    await expect(page).toHaveURL(/partner\/devices/);
    console.log('devices page URL is correct after goto PASS successfully');
  });
});
