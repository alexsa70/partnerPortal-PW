/**
 * Smoke tests: DeviceHealthPage — verifies the Device Health page and tabs load correctly.
 */
import { test, expect } from '../fixtures';

test('device health page loads and shows tabs', async ({ deviceHealthPage }) => {
  await deviceHealthPage.goto();
  await expect(deviceHealthPage.tabDeviceHealth).toBeVisible();
  await expect(deviceHealthPage.tabSdCardRetention).toBeVisible();
  await expect(deviceHealthPage.tabRmaDevices).toBeVisible();
});

test('device health tab is selected by default', async ({ deviceHealthPage }) => {
  await deviceHealthPage.goto();
  await expect(deviceHealthPage.tabDeviceHealth).toHaveAttribute('aria-selected', 'true');
});

test('device health page shows Device Name column', async ({ deviceHealthPage }) => {
  await deviceHealthPage.goto();
  await expect(deviceHealthPage.colDeviceName).toBeVisible();
});

test('device health page shows key table columns', async ({ deviceHealthPage }) => {
  await deviceHealthPage.goto();
  await expect(deviceHealthPage.colImei).toBeVisible();
  await expect(deviceHealthPage.colOrganization).toBeVisible();
  await expect(deviceHealthPage.colLastConnectedAt).toBeVisible();
});

test('device health page has Device Name search input', async ({ deviceHealthPage }) => {
  await deviceHealthPage.goto();
  await expect(deviceHealthPage.searchDeviceName).toBeVisible();
});

test('clicking SD card retention tab changes selection', async ({ deviceHealthPage }) => {
  await deviceHealthPage.goto();
  await deviceHealthPage.clickTab('SD card retention');
  await expect(deviceHealthPage.tabSdCardRetention).toHaveAttribute('aria-selected', 'true');
});
