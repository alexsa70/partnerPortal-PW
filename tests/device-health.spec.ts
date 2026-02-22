/**
 * Smoke tests: DeviceHealthPage — verifies the Device Health page and tabs load correctly.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { DeviceHealthPage } from '../pages/device-health/DeviceHealthPage';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(EMAIL, PASSWORD);
});

test('device health page loads and shows tabs', async ({ page }) => {
  const deviceHealth = new DeviceHealthPage(page);
  await deviceHealth.goto();
  await expect(deviceHealth.tabDeviceHealth).toBeVisible();
  await expect(deviceHealth.tabSdCardRetention).toBeVisible();
  await expect(deviceHealth.tabRmaDevices).toBeVisible();
});

test('device health tab is selected by default', async ({ page }) => {
  const deviceHealth = new DeviceHealthPage(page);
  await deviceHealth.goto();
  await expect(deviceHealth.tabDeviceHealth).toHaveAttribute('aria-selected', 'true');
});

test('device health page shows Device Name column', async ({ page }) => {
  const deviceHealth = new DeviceHealthPage(page);
  await deviceHealth.goto();
  await expect(deviceHealth.colDeviceName).toBeVisible();
});

test('device health page shows key table columns', async ({ page }) => {
  const deviceHealth = new DeviceHealthPage(page);
  await deviceHealth.goto();
  await expect(deviceHealth.colImei).toBeVisible();
  await expect(deviceHealth.colOrganization).toBeVisible();
  await expect(deviceHealth.colLastConnectedAt).toBeVisible();
});

test('device health page has Device Name search input', async ({ page }) => {
  const deviceHealth = new DeviceHealthPage(page);
  await deviceHealth.goto();
  await expect(deviceHealth.searchDeviceName).toBeVisible();
});

test('clicking SD card retention tab changes selection', async ({ page }) => {
  const deviceHealth = new DeviceHealthPage(page);
  await deviceHealth.goto();
  await deviceHealth.clickTab('SD card retention');
  await expect(deviceHealth.tabSdCardRetention).toHaveAttribute('aria-selected', 'true');
});
