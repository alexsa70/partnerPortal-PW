/**
 * Smoke tests: DeviceAlarmsPage — verifies the Device Alarms page and tabs load correctly.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { DeviceAlarmsPage } from '../pages/device-alarms/DeviceAlarmsPage';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(EMAIL, PASSWORD);
});

test('device alarms page loads and shows tabs', async ({ page }) => {
  const alarms = new DeviceAlarmsPage(page);
  await alarms.goto();
  await expect(alarms.tabAlarms).toBeVisible();
  await expect(alarms.tabAlarmsBeta).toBeVisible();
});

test('alarms tab is selected by default', async ({ page }) => {
  const alarms = new DeviceAlarmsPage(page);
  await alarms.goto();
  await expect(alarms.tabAlarms).toHaveAttribute('aria-selected', 'true');
});

test('device alarms page shows key table columns', async ({ page }) => {
  const alarms = new DeviceAlarmsPage(page);
  await alarms.goto();
  await expect(alarms.colSeverity).toBeVisible();
  await expect(alarms.colName).toBeVisible();
  await expect(alarms.colImei).toBeVisible();
  await expect(alarms.colCreationDate).toBeVisible();
});

test('device alarms page has search inputs', async ({ page }) => {
  const alarms = new DeviceAlarmsPage(page);
  await alarms.goto();
  await expect(alarms.searchDeviceName).toBeVisible();
  await expect(alarms.searchSerialNumber).toBeVisible();
});

test('clicking Alarms Beta tab changes selection', async ({ page }) => {
  const alarms = new DeviceAlarmsPage(page);
  await alarms.goto();
  await alarms.clickTab('Alarms Beta');
  await expect(alarms.tabAlarmsBeta).toHaveAttribute('aria-selected', 'true');
});
