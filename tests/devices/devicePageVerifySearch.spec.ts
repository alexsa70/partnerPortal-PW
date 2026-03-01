/**
 * Verify the Devices page search functionality.
 */
import { DEVICES_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';
import { DevicesPage } from '../../pages/devices/DevicesPage';

test.describe('Devices Page Search', () => {
  let devicesPage: DevicesPage;
  test.beforeEach(async ({ page }) => {
    devicesPage = new DevicesPage(page);
    await devicesPage.goto();
  });
  test('devices page has Device Name search input', async ({  }) => {
    const searchDeviceName = devicesPage.searchDeviceName;
    await expect(searchDeviceName).toBeVisible();
    await devicesPage.filterByDeviceName('Test device');
    await expect(devicesPage.firstResultDeviceName).toHaveText('Test device');
      });
  test('devices page has IMEI search input', async ({ devicesPage }) => {
    await expect(devicesPage.searchImei).toBeVisible();
  });
  test('devices page has Sim Number search input', async ({ devicesPage }) => {
    await expect(devicesPage.searchSimNumber).toBeVisible();
  });
});