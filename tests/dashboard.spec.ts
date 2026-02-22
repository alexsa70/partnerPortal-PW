/**
 * Smoke tests: DashboardPage — verifies the partner dashboard loads correctly.
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';

const EMAIL = process.env.TEST_EMAIL ?? '';
const PASSWORD = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(EMAIL, PASSWORD);
});

test('dashboard loads and shows summary heading', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await expect(dashboard.pageHeading).toBeVisible();
});

test('dashboard shows Growth Trends table', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await expect(dashboard.growthTrendsTable).toBeVisible();
});

test('dashboard shows Device Billing Status section', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await expect(dashboard.deviceBillingStatusSection).toBeVisible();
});

test('dashboard nav links are all visible', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.goto();
  await expect(dashboard.navDevices).toBeVisible();
  await expect(dashboard.navDeviceHealth).toBeVisible();
  await expect(dashboard.navDeviceAlarms).toBeVisible();
  await expect(dashboard.navOrganizations).toBeVisible();
  await expect(dashboard.navSubPartners).toBeVisible();
  await expect(dashboard.navUsers).toBeVisible();
});
