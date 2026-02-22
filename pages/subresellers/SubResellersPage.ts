/**
 * Page object for the Sub-Partners (subresellers) list page (#/partner/subresellers).
 * Columns: Name, Email, Assigned Devices, Activated Devices.
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { SUBRESELLERS_PATH } from '../../constants/routes';

export class SubResellersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to Sub-Partners and wait for the "Assigned Devices" column to render. */
  async goto(): Promise<void> {
    await this.page.goto(SUBRESELLERS_PATH);
    await this.page.locator('thead').getByText('Assigned Devices').waitFor();
  }

  // ── Column search inputs (aria-label = field name) ────────────────────────

  get searchName() {
    return this.page.getByRole('textbox', { name: 'name', exact: true });
  }

  get searchEmail() {
    return this.page.getByRole('textbox', { name: 'email', exact: true });
  }

  get searchAssignedDevices() {
    return this.page.getByRole('textbox', { name: 'assignedDevicesCount' });
  }

  get searchActivatedDevices() {
    return this.page.getByRole('textbox', { name: 'activatedDeviceCount' });
  }

  // ── Column headers ────────────────────────────────────────────────────────

  get colName() {
    return this.colHeader('Name');
  }

  get colEmail() {
    return this.colHeader('Email');
  }

  get colAssignedDevices() {
    return this.colHeader('Assigned Devices');
  }

  get colActivatedDevices() {
    return this.colHeader('Activated Devices');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async filterByName(name: string): Promise<void> {
    await this.searchName.fill(name);
  }

  async filterByEmail(email: string): Promise<void> {
    await this.searchEmail.fill(email);
  }
}
