/**
 * Smoke tests: DeviceHealthPage — verifies the Device Health page and tabs load correctly.
 */
import { DEVICE_HEALTH_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';

test.describe('Device Health Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEVICE_HEALTH_PATH);
  });

  test('device health page loads and shows tabs', async ({ deviceHealthPage }) => {
    await expect(deviceHealthPage.tabDeviceHealth).toBeVisible();
    await expect(deviceHealthPage.tabSdCardRetention).toBeVisible();
    await expect(deviceHealthPage.tabRmaDevices).toBeVisible();
    console.log('device health page loads and shows tabs PASS successfully');
  });

  test('device health tab is selected by default', async ({ deviceHealthPage }) => {
    await expect(deviceHealthPage.tabDeviceHealth).toHaveAttribute('aria-selected', 'true');
    console.log('device health tab is selected by default PASS successfully');
  });

  test('device health page shows Device Name column', async ({ deviceHealthPage }) => {
    await expect(deviceHealthPage.colDeviceName).toBeVisible();
    console.log('device health page shows Device Name column PASS successfully');
  });

  test('device health page shows key table columns', async ({ deviceHealthPage }) => {
    await expect(deviceHealthPage.colImei).toBeVisible();
    await expect(deviceHealthPage.colOrganization).toBeVisible();
    await expect(deviceHealthPage.colLastConnectedAt).toBeVisible();
    console.log('device health page shows key table columns PASS successfully');
  });

  test('device health page has Device Name search input', async ({ deviceHealthPage }) => {
    await expect(deviceHealthPage.searchDeviceName).toBeVisible();
    console.log('device health page has Device Name search input PASS successfully');
  });

  test('clicking SD card retention tab changes selection', async ({ deviceHealthPage }) => {
    await deviceHealthPage.clickTab('SD card retention');
    await expect(deviceHealthPage.tabSdCardRetention).toHaveAttribute('aria-selected', 'true');
    console.log('clicking SD card retention tab changes selection PASS successfully');
  });
});
