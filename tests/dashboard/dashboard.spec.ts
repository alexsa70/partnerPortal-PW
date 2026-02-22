/**
 * Smoke tests: DashboardPage — verifies the partner dashboard loads correctly.
 */
import { DASHBOARD_PATH } from '../../constants/routes';       
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
});
