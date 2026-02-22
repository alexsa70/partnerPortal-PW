/**
 * Smoke tests: DeviceAlarmsPage — verifies the Device Alarms page and tabs load correctly.
 */
import { test, expect } from '../fixtures';

test('device alarms page loads and shows tabs', async ({ deviceAlarmsPage }) => {
  await deviceAlarmsPage.goto();
  await expect(deviceAlarmsPage.tabAlarms).toBeVisible();
  await expect(deviceAlarmsPage.tabAlarmsBeta).toBeVisible();
});

test('alarms tab is selected by default', async ({ deviceAlarmsPage }) => {
  await deviceAlarmsPage.goto();
  await expect(deviceAlarmsPage.tabAlarms).toHaveAttribute('aria-selected', 'true');
});

test('device alarms page shows key table columns', async ({ deviceAlarmsPage }) => {
  await deviceAlarmsPage.goto();
  await expect(deviceAlarmsPage.colSeverity).toBeVisible();
  await expect(deviceAlarmsPage.colName).toBeVisible();
  await expect(deviceAlarmsPage.colImei).toBeVisible();
  await expect(deviceAlarmsPage.colCreationDate).toBeVisible();
});

test('device alarms page has search inputs', async ({ deviceAlarmsPage }) => {
  await deviceAlarmsPage.goto();
  await expect(deviceAlarmsPage.searchDeviceName).toBeVisible();
  await expect(deviceAlarmsPage.searchSerialNumber).toBeVisible();
});

test('clicking Alarms Beta tab changes selection', async ({ deviceAlarmsPage }) => {
  await deviceAlarmsPage.goto();
  await deviceAlarmsPage.clickTab('Alarms Beta');
  await expect(deviceAlarmsPage.tabAlarmsBeta).toHaveAttribute('aria-selected', 'true');
});
