/**
 * Verify the Devices page search functionality.
 */
import { DEVICES_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';
import { DevicesPage } from '../../pages/devices/DevicesPage';

test.describe('Devices Page Search', () => {
  let devicesPage: DevicesPage;
  const { TEST_DEVICE_NAME, TEST_IMEI, TEST_SIM_NUMBER, TEST_MODEL, TEST_VERSION, TEST_ORGANIZATION, TEST_PARTNER } = process.env;
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

  test('devices page has Model search input', async ({  }) => {
    const searchModel = devicesPage.searchModel;
    await expect(searchModel).toBeVisible();
    await devicesPage.filterByModel(TEST_MODEL!);   
    await expect(await devicesPage.firstResultModel()).toHaveText(TEST_MODEL!);
    console.log('devices page has Model search input PASS successfully');
  });

  test('devices page has Version search input', async ({  }) => {
    const searchVersion = devicesPage.searchVersion;
    await expect(searchVersion).toBeVisible();
    await devicesPage.filterByVersion(TEST_VERSION!);
    await expect(await devicesPage.firstResultVersion()).toHaveText(TEST_VERSION!);
    console.log('devices page has Version search input PASS successfully');
  }); 

/**
 *   Probably won't work on the stage2 environment due to lask of the Serial Numbers from DB
 * */
  //   test('devices page has Serial Number search input', async ({  }) => {
//     const searchSerialNumber = devicesPage.searchSerialNumber;
//     await expect(searchSerialNumber).toBeVisible();
//     await devicesPage.filterBySerialNumber(TEST_SERIAL_NUMBER!);
//     await expect(await devicesPage.firstResultSerialNumber()).toHaveText(TEST_SERIAL_NUMBER!);
//     console.log('devices page has Serial Number search input PASS successfully');
//   });

  test('devices page has Organization search input', async ({  }) => {
    const searchOrganization = devicesPage.searchOrganization;
    await expect(searchOrganization).toBeVisible();
    await devicesPage.filterByOrganization(TEST_ORGANIZATION!);
    await expect(await devicesPage.firstResultOrganization()).toHaveText(TEST_ORGANIZATION!);
    console.log('devices page has Organization search input PASS successfully');
  });

  test('devices page has Partner search input', async ({  }) => {
    const searchPartner = devicesPage.searchPartner;
    await expect(searchPartner).toBeVisible();
    await devicesPage.filterByPartner(TEST_PARTNER!);
    await expect(await devicesPage.firstResultPartner()).toHaveText(TEST_PARTNER!);
    console.log('devices page has Partner search input PASS successfully');
  });
});