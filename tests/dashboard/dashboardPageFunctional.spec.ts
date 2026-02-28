
import { ORGANIZATIONS_PATH } from '../../constants/routes';
import { test, expect } from '../../fixtures';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';

test.describe('Dashboard Page', () => {
  let dashboardPage: DashboardPage;
  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test('dashboard page loads and shows summary heading', async ({ page }) => {
    await expect(dashboardPage.pageHeading).toBeVisible();
    const showAllOrg = dashboardPage.showAllOrganizations;
    await expect(showAllOrg).toHaveText('Show all');
    await showAllOrg.click();
    await page.waitForURL(new RegExp(ORGANIZATIONS_PATH));
  });

  test('dashboard check the devices by organization table', async () => {
    await expect(dashboardPage.devicesByOrgSection).toBeVisible();
  });

  test('dashboard check the alarms by organization table', async () => {
    await expect(dashboardPage.alarmsByOrgSection).toBeVisible();
  });

  test('dashboard check the recording health report table', async () => {
    await expect(dashboardPage.recordingHealthSection).toBeVisible();
  });

  test('dashboard check the alarms by type table', async () => {
    await expect(dashboardPage.alarmsByTypeSection).toBeVisible();
  });
});
