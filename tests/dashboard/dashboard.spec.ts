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
  });

  test('dashboard shows Growth Trends table', async ({ dashboardPage }) => {
    await expect(dashboardPage.growthTrendsTable).toBeVisible();
  });

  test('dashboard shows Device Billing Status section', async ({ dashboardPage }) => {
    await expect(dashboardPage.deviceBillingStatusSection).toBeVisible();
  });

  test('dashboard nav links are all visible', async ({ dashboardPage }) => {
    await expect(dashboardPage.navDevices).toBeVisible();
    await expect(dashboardPage.navDeviceHealth).toBeVisible();
    await expect(dashboardPage.navDeviceAlarms).toBeVisible();
    await expect(dashboardPage.navOrganizations).toBeVisible();
    await expect(dashboardPage.navSubPartners).toBeVisible();
    await expect(dashboardPage.navUsers).toBeVisible();
  });

  test.describe('"Show all" quick-links', () => {
    test('Show all organizations navigates to Organizations page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllOrganizations.click();
      await expect(page).toHaveURL(new RegExp(ORGANIZATIONS_PATH));
    });

    test('Show all alarms by org navigates to Device Alarms page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllAlarmsByOrg.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_ALARMS_PATH));
    });

    test('Show all failed recording health navigates to Device Health page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllFailedRecordingHealth.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_HEALTH_PATH));
    });

    test('Show all recording health report navigates to Device Health page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllRecordingHealth.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_HEALTH_PATH));
    });

    test('Show all alarms by type navigates to Device Alarms page', async ({ page, dashboardPage }) => {
      await dashboardPage.showAllAlarmsByType.click();
      await expect(page).toHaveURL(new RegExp(DEVICE_ALARMS_PATH));
    });
  });
});
