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
  });

  test('devices page has all devices option', async ({  }) => {
    
    await expect(devicesPage.rowActionItem('Device information')).toBeAttached();
    await expect(devicesPage.rowActionItem('Data usage')).toBeAttached();
    await expect(devicesPage.rowActionItem('Reboot camera')).toBeAttached();
    await expect(devicesPage.rowActionItem('Format SD card')).toBeAttached();
    await expect(devicesPage.rowActionItem('Reset PIN')).toBeAttached();
    await expect(devicesPage.rowActionItem('Reset Factory Settings')).toBeAttached();
    await expect(devicesPage.rowActionItem('Update AUX billing')).toBeAttached();
    await expect(devicesPage.rowActionItem('Access Organization')).toBeAttached();
    console.log('devices page has all devices option PASS successfully');
  });

//   test('example: verify and click all row action options', async ({ page }) => {
//     const menuOptions = [
//       'Device information',
//       'Data usage',
//       'Reboot camera',
//       'Format SD card',
//       'Reset PIN',
//       'Reset Factory Settings',
//       'Update AUX billing',
//       'Access Organization',
//     ];

//     // Step 1: The menu is already open after filtering, so we can verify options directly
//     // If menu needs to be opened first, uncomment these lines:
//     // const menuButton = devicesPage.rowActionMenuButton();
//     // await expect(menuButton).toBeVisible();
//     // await menuButton.click();

//     // Step 2: Check all options are attached (they exist in DOM)
//     for (const option of menuOptions) {
//       await expect(devicesPage.rowActionItem(option)).toBeAttached();
//     }

//     // Step 3: Click an option using JavaScript (bypasses visibility check)
//     await devicesPage.rowActionItem('Device information').evaluate((el) => (el as HTMLElement).click());
//     console.log('devices page has all devices option PASS successfully');
//   });
});