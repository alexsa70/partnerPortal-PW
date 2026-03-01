/**
 * Smoke tests: DeviceAlarmsPage — verifies the Device Alarms page and tabs load correctly.
 */
import { DEVICE_ALARMS_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';

test.describe('Device Alarms Page', () => {
  test.describe.configure({mode: 'serial'})
  test.beforeEach(async ({ page }) => {
    await page.goto(DEVICE_ALARMS_PATH);
    await page.getByRole('tab', { name: 'Alarms', exact: true }).waitFor();
  });

  test('device alarms page loads and shows tabs', async ({ deviceAlarmsPage }) => {
    await expect(deviceAlarmsPage.tabAlarms).toBeVisible();
    await expect(deviceAlarmsPage.tabAlarmsBeta).toBeVisible();
    console.log('device alarms page loads and shows tabs PASS successfully');
  });

  test('alarms tab is selected by default', async ({ deviceAlarmsPage }) => {
    await expect(deviceAlarmsPage.tabAlarms).toHaveAttribute('aria-selected', 'true');
    console.log('alarms tab is selected by default PASS successfully');
  });

  test('device alarms page shows key table columns', async ({ deviceAlarmsPage }) => {
    await expect(deviceAlarmsPage.colSeverity).toBeVisible();
    await expect(deviceAlarmsPage.colName).toBeVisible();
    await expect(deviceAlarmsPage.colImei).toBeVisible();
    await expect(deviceAlarmsPage.colCreationDate).toBeVisible();
    console.log('device alarms page shows key table columns PASS successfully');
  });

  test('device alarms page has search inputs', async ({ deviceAlarmsPage }) => {
    await expect(deviceAlarmsPage.searchDeviceName).toBeVisible();
    await expect(deviceAlarmsPage.searchSerialNumber).toBeVisible();
    console.log('device alarms page has search inputs PASS successfully');
  });

  test('clicking Alarms Beta tab changes selection', async ({ deviceAlarmsPage }) => {
    await deviceAlarmsPage.clickTab('Alarms Beta');
    await expect(deviceAlarmsPage.tabAlarmsBeta).toHaveAttribute('aria-selected', 'true');
    console.log('clicking Alarms Beta tab changes selection PASS successfully');
  });
});
