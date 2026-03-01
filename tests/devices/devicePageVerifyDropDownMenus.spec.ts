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
    const dropdownBillingStatus = await devicesPage.dropdownBillingStatus();
    await expect(dropdownBillingStatus).toBeVisible();
    await (dropdownBillingStatus).click();
    await expect(devicesPage.dropdownOption('Pending Activation')).toBeVisible();
    await expect(devicesPage.dropdownOption('Activated')).toBeVisible();
    await expect(devicesPage.dropdownOption('Deactivated')).toBeVisible();
    await expect(devicesPage.dropdownOption('Suspended')).toBeVisible();
    console.log('devices page has Billing Status drop-down menu PASS successfully');
  });
  test('devices page has Aux Billing drop-down menu', async ({  }) => {
    const dropdownAuxBilling = await devicesPage.dropdownAuxBilling();
    await expect(dropdownAuxBilling).toBeVisible();
    await (dropdownAuxBilling).click();
    await expect(devicesPage.dropdownOption('Enabled')).toBeVisible();
    await expect(devicesPage.dropdownOption('Disabled')).toBeVisible();
    console.log('devices page has Aux Billing drop-down menu PASS successfully');
  });
  test('devices page has ADAS Calibration Type drop-down menu', async ({  }) => {
    const dropdownAdasCalibrationType = await devicesPage.dropdownAdasCalibrationType();
    await expect(dropdownAdasCalibrationType).toBeVisible();
    await (dropdownAdasCalibrationType).click();
    await expect(devicesPage.dropdownOption('Calibrated (auto)')).toBeVisible();
    await expect(devicesPage.dropdownOption('Calibrated (manual)')).toBeVisible();
    await expect(devicesPage.dropdownOption('Calibrated (auto recalibrated)')).toBeVisible();
    await expect(devicesPage.dropdownOption('Calibrated (AI-14)')).toBeVisible();
    await expect(devicesPage.dropdownOption('Not Calibrated')).toBeVisible();
    console.log('devices page has ADAS Calibration Type drop-down menu PASS successfully');
  });
  test('devices page has ADAS Calibration Status drop-down menu', async ({  }) => {
    const dropdownAdasCalibrationStatus = await devicesPage.dropdownAdasCalibrationStatus();
    await expect(dropdownAdasCalibrationStatus).toBeVisible();
    await (dropdownAdasCalibrationStatus).click();
    await expect(devicesPage.dropdownOption('Not Started')).toBeVisible();
    await expect(devicesPage.dropdownOption('Pending')).toBeVisible();
    await expect(devicesPage.dropdownOption('Completed')).toBeVisible();
    await expect(devicesPage.dropdownOption('Failed')).toBeVisible();
    console.log('devices page has ADAS Calibration Status drop-down menu PASS successfully');
  });
  test('devices page has date of activation drop-down menu', async ({  }) => {
    const dateOfActivationDropdown = await devicesPage.filterDateOfActivation;
    await expect(dateOfActivationDropdown).toBeVisible();
    await (dateOfActivationDropdown).click();
    await expect(devicesPage.datePickerOption('Today')).toBeVisible();
    await expect(devicesPage.datePickerOption('Yesterday')).toBeVisible();
    await expect(devicesPage.datePickerOption('This Week')).toBeVisible();
    await expect(devicesPage.datePickerOption('Last Week')).toBeVisible();
    await expect(devicesPage.datePickerOption('This Month')).toBeVisible();
    await expect(devicesPage.datePickerOption('Last Month')).toBeVisible();
    await expect(devicesPage.datePickerOption('This Year')).toBeVisible();
    await expect(devicesPage.datePickerOption('Last Year')).toBeVisible();
    console.log('devices page has date of activation drop-down menu PASS successfully');
  });  

});