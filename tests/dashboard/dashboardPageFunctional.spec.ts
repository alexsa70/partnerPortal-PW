
import { DEVICE_ALARMS_PATH, DEVICE_HEALTH_PATH, ORGANIZATIONS_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';

test.describe('Dashboard Page', () => {
  let dashboardPage: DashboardPage;
  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });
  test('dashboard page loads and verify show all organizations link', async ({ page }) => {
    await expect(dashboardPage.pageHeading).toBeVisible();
    const showAllOrg = dashboardPage.showAllOrganizations;
    await expect(showAllOrg).toHaveText('Show all');
    await showAllOrg.click();
    await page.waitForURL(new RegExp(ORGANIZATIONS_PATH));
    console.log('dashboard page loads and verify show all organizations link PASS successfully');
  });

  test('dashboard check the alarms by organization table', async ({page}) => {
    await expect(dashboardPage.alarmsByOrgSection).toBeVisible();
    const showAllAlarmsByOrg = dashboardPage.showAllAlarmsByOrg;
    await expect(showAllAlarmsByOrg).toHaveText('Show all');
    await showAllAlarmsByOrg.click();
    await page.waitForURL(new RegExp(DEVICE_ALARMS_PATH));
    console.log('dashboard check the alarms by organization table PASS successfully');
  });

  test('dashboard check the recording health report table', async ({page}) => {
    const showAllRecordingHealth = dashboardPage.showAllRecordingHealth;
    await expect(showAllRecordingHealth).toHaveText('Show all');
    await showAllRecordingHealth.click();
    await page.waitForURL(new RegExp(DEVICE_HEALTH_PATH));
    console.log('dashboard check the recording health report table PASS successfully');
  });

  test('dashboard check the alarms by type table', async ({page}) => {
    const showAllAlarmsByType = dashboardPage.showAllAlarmsByType;
    await expect(showAllAlarmsByType).toHaveText('Show all');
    await showAllAlarmsByType.click();
    await page.waitForURL(new RegExp(DEVICE_ALARMS_PATH));
    console.log('dashboard check the alarms by type table PASS successfully');
  });

  test('dashboard check the adas calibration table', async ({page}) => {
    const showAllAdasCalibration = dashboardPage.adasCalibrationSection;
    await expect(showAllAdasCalibration).toHaveText('ADAS calibration');
    console.log('dashboard check the adas calibration table PASS successfully');
  });
});
