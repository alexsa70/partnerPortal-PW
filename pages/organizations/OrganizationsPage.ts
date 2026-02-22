/**
 * Page object for the Organizations list page (#/partner/organizations).
 * Columns: Organization, Partner DB, Sub Partner Name, Number of devices,
 *          Device Retention Minutes, Purge Days.
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ORGANIZATIONS_PATH } from '../../constants/routes';

export class OrganizationsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to Organizations and wait for the table header to render. */
  async goto(): Promise<void> {
    await this.page.goto(ORGANIZATIONS_PATH);
    // "Partner DB" is unique to this page's table — avoids matching "ORGANIZATION"
    // headers that appear in the dashboard's summary tables.
    await this.page.locator('thead').getByText('Partner DB', { exact: true }).waitFor();
  }

  // ── Column search inputs (aria-label = field name) ────────────────────────

  get searchName() {
    return this.page.getByRole('textbox', { name: 'name', exact: true });
  }

  get searchPartnerDatabase() {
    return this.page.getByRole('textbox', { name: 'geotabDatabase' });
  }

  get searchSubPartnerName() {
    return this.page.getByRole('textbox', { name: 'subResellerName' });
  }

  get searchDeviceCount() {
    return this.page.getByRole('textbox', { name: 'deviceCount' });
  }

  get searchDeviceRetentionMinutes() {
    return this.page.getByRole('textbox', { name: 'deviceRetentionMinutes' });
  }

  get searchPurgeDays() {
    return this.page.getByRole('textbox', { name: 'purgeDays' });
  }

  // ── Column headers ────────────────────────────────────────────────────────

  get colOrganization() {
    return this.colHeader('Organization');
  }

  get colPartnerDb() {
    return this.colHeader('Partner DB');
  }

  get colSubPartnerName() {
    return this.colHeader('Sub Partner Name');
  }

  get colNumberOfDevices() {
    return this.colHeader('Number of devices');
  }

  get colDeviceRetentionMinutes() {
    return this.colHeader('Device Retention Minutes');
  }

  get colPurgeDays() {
    return this.colHeader('Purge Days');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async filterByName(name: string): Promise<void> {
    await this.searchName.fill(name);
  }

  async filterByPartnerDatabase(db: string): Promise<void> {
    await this.searchPartnerDatabase.fill(db);
  }
}
