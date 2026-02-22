/**
 * Page object for the Partner Dashboard page (#/partner/dashboard).
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DASHBOARD_PATH } from '../../constants/routes';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to the dashboard and wait for the summary heading. */
  async goto(): Promise<void> {
    await this.page.goto(DASHBOARD_PATH);
    await this.page.getByText('Summary').waitFor();
  }

  /** Page heading that reads "<Partner Name> / Summary". */
  get pageHeading() {
    return this.page.getByText('Summary');
  }

  /** Page title span (shows the partner name). */
  get pageTitle() {
    return this.page.getByText('/ Summary');
  }

  // ── Growth Trends table ───────────────────────────────────────────────────

  get growthTrendsTable() {
    return this.page.locator('.partner-dahboard-trends-table');
  }

  // ── Summary sections ──────────────────────────────────────────────────────

  get deviceBillingStatusSection() {
    return this.page.getByText('Device Billing Status');
  }

  get devicesByOrgSection() {
    return this.page.getByText('Devices by organization');
  }

  get alarmsByOrgSection() {
    return this.page.getByText('Alarms by organization');
  }

  get recordingHealthSection() {
    return this.page.getByText('Recording health report');
  }

  get alarmsByTypeSection() {
    return this.page.getByText('Alarms by type');
  }

  get adasCalibrationSection() {
    return this.page.getByText('ADAS calibration');
  }

  // ── Quick-links ────────────────────────────────────────────────────────────

  /** "Show all" link under Devices by organization. Navigates to Organizations. */
  get showAllOrganizations() {
    return this.page.getByRole('link', { name: 'Show all' }).first();
  }

  /** "Show all" link under Device Alarms. */
  get showAllAlarms() {
    return this.page.getByRole('link', { name: 'Show all' }).nth(1);
  }

  /** "Show all" link under Device Health. */
  get showAllDeviceHealth() {
    return this.page.getByRole('link', { name: 'Show all' }).nth(2);
  }
}
