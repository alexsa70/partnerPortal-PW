/**
 * Smoke tests: DevicesPage — verifies the Devices list page loads correctly.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { DevicesPage } from '../pages/devices/DevicesPage';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(EMAIL, PASSWORD);
});

test('devices page loads and shows Device Name column', async ({ page }) => {
  const devices = new DevicesPage(page);
  await devices.goto();
  await expect(devices.colDeviceName).toBeVisible();
});

test('devices page shows key table columns', async ({ page }) => {
  const devices = new DevicesPage(page);
  await devices.goto();
  await expect(devices.colImei).toBeVisible();
  await expect(devices.colBillingStatus).toBeVisible();
  await expect(devices.colOrganization).toBeVisible();
});

test('devices page has Device Name search input', async ({ page }) => {
  const devices = new DevicesPage(page);
  await devices.goto();
  await expect(devices.searchDeviceName).toBeVisible();
});

test('devices page has IMEI search input', async ({ page }) => {
  const devices = new DevicesPage(page);
  await devices.goto();
  await expect(devices.searchImei).toBeVisible();
});

test('devices page URL is correct after goto', async ({ page }) => {
  const devices = new DevicesPage(page);
  await devices.goto();
  await expect(page).toHaveURL(/partner\/devices/);
});
