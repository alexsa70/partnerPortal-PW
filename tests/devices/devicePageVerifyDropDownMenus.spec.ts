/**
 * Verify the Devices page drop-down menus functionality.
 */
import { DEVICES_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';
import { DevicesPage } from '../../pages/devices/DevicesPage';

test.describe('Devices Page Drop-Down Menus', () => {
  let devicesPage: DevicesPage;
  const { TEST_DEVICE_NAME, TEST_IMEI, TEST_SIM_NUMBER, TEST_MODEL, TEST_VERSION, TEST_ORGANIZATION, TEST_PARTNER } = process.env;
  test.beforeEach(async ({ page }) => {
    devicesPage = new DevicesPage(page);
    await devicesPage.goto();
  });
  test('devices page has Billing Status drop-down menu', async ({  }) => {
    await expect(await devicesPage.dropdownBillingStatus()).toBeVisible();
    await (await devicesPage.dropdownBillingStatus()).click();
    await expect(devicesPage.dropdownOption('Pending Activation')).toBeVisible();
    await expect(devicesPage.dropdownOption('Activated')).toBeVisible();
    await expect(devicesPage.dropdownOption('Deactivated')).toBeVisible();
    await expect(devicesPage.dropdownOption('Suspended')).toBeVisible();
    console.log('devices page has Billing Status drop-down menu PASS successfully');
  });
});