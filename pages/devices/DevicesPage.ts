/**
 * Page object for the Devices list page (#/partner/devices).
 *
 * Inline column-filter inputs are identified by their aria-label, which matches
 * the ng-model field name set by the app.
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DEVICES_PATH } from '../../constants/routes';

export class DevicesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to Devices and wait for the Device Name column to render. */
  async goto(): Promise<void> {
    await this.page.goto(DEVICES_PATH);
    await this.page.locator('thead').getByText('Device Name').waitFor();
  }

  // ── Column search inputs (aria-label = field name) ────────────────────────

  get searchDeviceName() {
    return this.page.getByRole('textbox', { name: 'deviceName' });
  }

  get searchImei() {
    return this.page.getByRole('textbox', { name: 'device_id' });
  }

  get searchSimNumber() {
    return this.page.getByRole('textbox', { name: 'simNumber' });
  }

  get searchModel() {
    return this.page.getByRole('textbox', { name: 'productType' });
  }

  get searchOrganization() {
    return this.page.getByRole('textbox', { name: 'organizationName' });
  }

  get searchDataProfile() {
    return this.page.getByRole('textbox', { name: 'dataProfileName' });
  }

  get searchPartner() {
    return this.page.getByRole('textbox', { name: 'resellerName' });
  }

  get searchAuxCams() {
    return this.page.getByRole('textbox', { name: 'auxiliaryCamerasCount' });
  }

  get searchPartnerDatabase() {
    return this.page.getByRole('textbox', { name: 'geotabDatabase' });
  }

  get searchVersion() {
    return this.page.getByRole('textbox', { name: 'semanticVersion' });
  }

  get searchSerialNumber() {
    return this.page.getByRole('textbox', { name: 'serialNumber' });
  }

  // ── Column headers ────────────────────────────────────────────────────────

  get colDeviceName() {
    return this.colHeader('Device Name');
  }

  // ── Result rows ───────────────────────────────────────────────────────────

  /** Device name cell in the first result row (tbody). Use after filtering. */
  get firstResultDeviceName() {
    return this.page.locator('tbody tr').first().locator('td').first();
  }

  get colImei() {
    return this.colHeader('IMEI');
  }

  get colBillingStatus() {
    return this.colHeader('Billing Status');
  }

  get colOrganization() {
    return this.colHeader('Organization');
  }

  get colModel() {
    return this.colHeader('Model');
  }

  get colVersion() {
    return this.colHeader('Version');
  }

  get colSerialNumber() {
    return this.colHeader('Serial Number');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async filterByDeviceName(name: string): Promise<void> {
    await this.searchDeviceName.fill(name);
  }

  async filterByImei(imei: string): Promise<void> {
    await this.searchImei.fill(imei);
  }

  async filterByOrganization(orgName: string): Promise<void> {
    await this.searchOrganization.fill(orgName);
  }
}
