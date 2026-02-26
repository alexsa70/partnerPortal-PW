/**
 * Custom test fixture that extends Playwright's base `test` with:
 *  - An authenticated `page` (uses storage state from global setup)
 *  - Page object fixtures for every app section
 *
 * Usage in spec files:
 *   import { test, expect } from '../fixtures';
 *   test('...', async ({ devicesPage }) => { ... });
 */
import { test as base, expect } from '@playwright/test';
import { AUTH_FILE } from '../playwright/global-setup';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { DevicesPage } from '../pages/devices/DevicesPage';
import { DeviceHealthPage } from '../pages/device-health/DeviceHealthPage';
import { DeviceAlarmsPage } from '../pages/device-alarms/DeviceAlarmsPage';
import { OrganizationsPage } from '../pages/organizations/OrganizationsPage';
import { SubResellersPage } from '../pages/subresellers/SubResellersPage';
import { UsersPage } from '../pages/users/UsersPage';
import { LoginPage } from '../pages/login/LoginPage';

type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  devicesPage: DevicesPage;
  deviceHealthPage: DeviceHealthPage;
  deviceAlarmsPage: DeviceAlarmsPage;
  organizationsPage: OrganizationsPage;
  subResellersPage: SubResellersPage;
  usersPage: UsersPage;
};

export const test = base.extend<AppFixtures>({
  // Override `page` to start every test already authenticated.
  page: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: AUTH_FILE });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  devicesPage: async ({ page }, use) => {
    await use(new DevicesPage(page));
  },

  deviceHealthPage: async ({ page }, use) => {
    await use(new DeviceHealthPage(page));
  },

  deviceAlarmsPage: async ({ page }, use) => {
    await use(new DeviceAlarmsPage(page));
  },

  organizationsPage: async ({ page }, use) => {
    await use(new OrganizationsPage(page));
  },

  subResellersPage: async ({ page }, use) => {
    await use(new SubResellersPage(page));
  },

  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
});

export { expect };
