/**
 * Smoke tests: DashboardPage — verifies the partner dashboard loads correctly.
 */
import { DASHBOARD_PATH, ORGANIZATIONS_PATH, DEVICE_ALARMS_PATH, DEVICE_HEALTH_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DASHBOARD_PATH);
  });

  test('dashboard loads and shows summary heading', async ({ dashboardPage }) => {
    await expect(dashboardPage.pageHeading).toBeVisible();
    console.log('dashboard loads and shows summary heading PASS successfully');
  });

  test('dashboard shows Growth Trends table', async ({ dashboardPage }) => {
    await expect(dashboardPage.growthTrendsTable).toBeVisible();
    console.log('dashboard shows Growth Trends table PASS successfully');
  });

  test('dashboard shows Device Billing Status section', async ({ dashboardPage }) => {
    await expect(dashboardPage.deviceBillingStatusSection).toBeVisible();
    console.log('dashboard shows Device Billing Status section PASS successfully');
  });

  test('dashboard nav links are all visible', async ({ dashboardPage }) => {
    await expect(dashboardPage.navDevices).toBeVisible();
    await expect(dashboardPage.navDeviceHealth).toBeVisible();
    await expect(dashboardPage.navDeviceAlarms).toBeVisible();
    await expect(dashboardPage.navOrganizations).toBeVisible();
    await expect(dashboardPage.navSubPartners).toBeVisible();
    await expect(dashboardPage.navUsers).toBeVisible();
    console.log('dashboard nav links are all visible PASS successfully');
  });

  test.describe('"Show all" quick-links', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(DASHBOARD_PATH);
    });
    test('Show all organizations navigates to Organizations page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllOrganizations.click();
      await expect(page).toHaveURL(new RegExp(ORGANIZATIONS_PATH));
      console.log('Show all organizations navigates to Organizations page PASS successfully');
    });

    test('Show all alarms by org navigates to Device Alarms page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllAlarmsByOrg.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_ALARMS_PATH));
      console.log('Show all alarms by org navigates to Device Alarms page PASS successfully');
    });

    test('Show all failed recording health navigates to Device Health page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllFailedRecordingHealth.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_HEALTH_PATH));
      console.log('Show all failed recording health navigates to Device Health page PASS successfully');
    });

    test('Show all recording health report navigates to Device Health page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllRecordingHealth.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_HEALTH_PATH));
      console.log('Show all recording health report navigates to Device Health page PASS successfully');
    });

    test('Show all alarms by type navigates to Device Alarms page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllAlarmsByType.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_ALARMS_PATH));
      console.log('Show all alarms by type navigates to Device Alarms page PASS successfully');
    });
  });
});
