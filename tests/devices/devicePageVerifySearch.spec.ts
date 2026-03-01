/**
 * Verify the Devices page search functionality.
 */
import { DEVICES_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';
import { DevicesPage } from '../../pages/devices/DevicesPage';

test.describe('Devices Page Search', () => {
  let devicesPage: DevicesPage;
  const { TEST_DEVICE_NAME, TEST_IMEI, TEST_SIM_NUMBER } = process.env;
  test.beforeEach(async ({ page }) => {
    devicesPage = new DevicesPage(page);
    await devicesPage.goto();
  });
  test('devices page has Device Name search input', async ({  }) => {
    const searchDeviceName = devicesPage.searchDeviceName;
    await expect(searchDeviceName).toBeVisible();
    await devicesPage.filterByDeviceName(TEST_DEVICE_NAME!);
    await expect(await devicesPage.firstResultDeviceName()).toHaveText(TEST_DEVICE_NAME!);
    console.log('devices page has Device Name search input PASS successfully');
  });

  test('devices page has IMEI search input', async ({  }) => {
    const searchDeviceImei = devicesPage.searchImei;
    await expect(searchDeviceImei).toBeVisible();
    await devicesPage.filterByImei(TEST_IMEI!);
    await expect(await devicesPage.firstResultImei()).toHaveText(TEST_IMEI!);
    console.log('devices page has IMEI search input PASS successfully');
  });

  test('devices page has Sim Number search input', async ({  }) => {
    const searchSimNumber = devicesPage.searchSimNumber;
    await expect(searchSimNumber).toBeVisible();
    await devicesPage.filterBySimNumber(TEST_SIM_NUMBER!);
    await expect(await devicesPage.firstResultSimNumber()).toHaveText(TEST_SIM_NUMBER!);
    console.log('devices page has Sim Number search input PASS successfully');
  });
});