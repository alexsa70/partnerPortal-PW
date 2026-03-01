/**
 * Verify the Devices options functionality.
 */
import { DEVICES_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';
import { DevicesPage } from '../../pages/devices/DevicesPage';

test.describe('Devices Page Options', () => {
  let devicesPage: DevicesPage;
  const { TEST_DEVICE_NAME, TEST_IMEI, TEST_SIM_NUMBER, TEST_MODEL, TEST_VERSION, TEST_ORGANIZATION, TEST_PARTNER } = process.env;
  test.beforeEach(async ({ page }) => {
    devicesPage = new DevicesPage(page);
    await devicesPage.goto();
    const searchDeviceName = devicesPage.searchDeviceName;
    await expect(searchDeviceName).toBeVisible();
    await devicesPage.filterByDeviceName(TEST_DEVICE_NAME!);
    await expect(await devicesPage.firstResultDeviceName()).toHaveText(TEST_DEVICE_NAME!);
    const menuButton = devicesPage.rowActionMenuButton();
    await expect(menuButton).toBeVisible();
    await menuButton.click()
    console.log('The device menu is opened -  PASS successfully');
  });

  test('device information option can be clicked', async ({  }) => {
    const deviceInformation = devicesPage.rowActionItem('Device information');
    await expect(deviceInformation).toBeAttached();
    await deviceInformation.click();    
    console.log('device information option can be clicked PASS successfully');
  });

  test('device data usage option can be clicked', async ({  }) => {
    const deviceDataUsage = devicesPage.rowActionItem('Data usage');
    await expect(deviceDataUsage).toBeAttached();
    await deviceDataUsage.click();
    console.log('device data usage option can be clicked PASS successfully');
  });
  test('device reboot camera option can be clicked', async ({  }) => {
    const deviceRebootCamera = devicesPage.rowActionItem('Reboot camera');
    await expect(deviceRebootCamera).toBeAttached();
    await deviceRebootCamera.click();
    console.log('device reboot camera option can be clicked PASS successfully');
  });
  test('device format SD card option can be clicked', async ({  }) => {
    const deviceFormatSDCard = devicesPage.rowActionItem('Format SD card');
    await expect(deviceFormatSDCard).toBeAttached();
    await deviceFormatSDCard.click();
    console.log('device format SD card option can be clicked PASS successfully');
  });
  test('device reset PIN option can be clicked', async ({  }) => {
    const deviceResetPIN = devicesPage.rowActionItem('Reset PIN');
    await expect(deviceResetPIN).toBeAttached();
    await deviceResetPIN.click();
    console.log('device reset PIN option can be clicked PASS successfully');
  });
  test('device reset factory settings option can be clicked', async ({  }) => {
    const deviceResetFactorySettings = devicesPage.rowActionItem('Reset Factory Settings');
    await expect(deviceResetFactorySettings).toBeAttached();
    await deviceResetFactorySettings.click();
    console.log('device reset factory settings option can be clicked PASS successfully');
  });
  test('device update AUX billing option can be clicked', async ({  }) => {
    const deviceUpdateAUXBilling = devicesPage.rowActionItem('Update AUX billing');
    await expect(deviceUpdateAUXBilling).toBeAttached();
    await deviceUpdateAUXBilling.click();
    console.log('device update AUX billing option can be clicked PASS successfully');
  });
  test('device access organization option can be clicked', async ({  }) => {
    const deviceAccessOrganization = devicesPage.rowActionItem('Access Organization');
    await expect(deviceAccessOrganization).toBeAttached();
    await deviceAccessOrganization.click();
    console.log('device access organization option can be clicked PASS successfully');
  });
});