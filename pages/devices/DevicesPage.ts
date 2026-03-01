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
  get searchBillingStatus() {
    return this.page.getByRole('textbox', { name: 'billingStatus' });
  }

  // ── Column headers ────────────────────────────────────────────────────────

  get colDeviceName() {
    return this.colHeader('Device Name');
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
  // ── Result rows ───────────────────────────────────────────────────────────

  /**
   * Returns the td cell in the first tbody row that corresponds to the given
   * column header text. Scopes to thead's first row to skip filter-input rows.
   */
  private async firstRowCellByColumn(columnName: string) {
    const headers = this.page.locator('thead tr').first().locator('th');
    const count = await headers.count();
    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).textContent();
      if (text?.trim() === columnName) {
        return this.page.locator('tbody tr').first().locator('td').nth(i);
      }
    }
    throw new Error(`Column "${columnName}" not found in table`);
  }

  async firstResultDeviceName() { return this.firstRowCellByColumn('Device Name'); }
  async firstResultImei() { return this.firstRowCellByColumn('IMEI'); }
  async firstResultBillingStatus() { return this.firstRowCellByColumn('Billing Status'); }
  async firstResultSimNumber() { return this.firstRowCellByColumn('Sim Number'); }
  async firstResultModel() { return this.firstRowCellByColumn('Model'); }
  async firstResultOrganization() { return this.firstRowCellByColumn('Organization'); }
  async firstResultDataProfile() { return this.firstRowCellByColumn('Data Profile'); }
  async firstResultPartner() { return this.firstRowCellByColumn('Partner/Sub-Partner'); }
  async firstResultAuxCams() { return this.firstRowCellByColumn('Aux cams: last month'); }
  async firstResultPartnerDatabase() { return this.firstRowCellByColumn('Partner Database'); }
  async firstResultVersion() { return this.firstRowCellByColumn('Version'); }
  async firstResultSerialNumber() { return this.firstRowCellByColumn('Serial Number'); }

  // ── Dropdown filter triggers ──────────────────────────────────────────────

  /**
   * Returns the md-menu-bar dropdown trigger in the filter row (thead tr nth(1))
   * for the given column. Resolves column index from the header row.
   */
  private async dropdownFilterByColumn(columnName: string) {
    const headers = this.page.locator('thead tr').first().locator('th');
    const count = await headers.count();
    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).textContent();
      if (text?.trim() === columnName) {
        return this.page.locator('thead tr').nth(1).locator('th').nth(i).locator('md-menu-bar');
      }
    }
    throw new Error(`Column "${columnName}" not found in table`);
  }

  /** Billing Status dropdown trigger. Options: Pending Activation | Activated | Deactivated | Suspended */
  async dropdownBillingStatus() { return this.dropdownFilterByColumn('Billing Status'); }

  /** Aux Billing dropdown trigger. Options: Enabled | Disabled */
  async dropdownAuxBilling() { return this.dropdownFilterByColumn('Aux Billing'); }

  /** ADAS Calibration Type dropdown trigger.
   *  Options: Calibrated (auto) | Calibrated (manual) | Calibrated (auto recalibrated) | Calibrated (AI-14) | Not Calibrated */
  async dropdownAdasCalibrationType() { return this.dropdownFilterByColumn('ADAS Calibration Type'); }

  /** ADAS Calibration Status dropdown trigger.
   *  Options: Not Started | Pending | Completed | Failed */
  async dropdownAdasCalibrationStatus() { return this.dropdownFilterByColumn('ADAS Calibration Status'); }

  /** Returns a dropdown option button by label. Call after opening a dropdown. */
  dropdownOption(optionText: string) {
    return this.page.locator('.md-open-menu-container[aria-hidden="false"]')
      .getByRole('button', { name: optionText, exact: true });
  }

  /** Select an option from a dropdown filter column. Opens the dropdown then clicks the option. */
  async selectDropdownFilter(columnName: string, optionText: string): Promise<void> {
    await (await this.dropdownFilterByColumn(columnName)).click();
    await this.dropdownOption(optionText).click();
  }

  // ── Date of Activation filter ─────────────────────────────────────────────

  /** Date range picker for Date of Activation. Click to open the calendar. */
  get filterDateOfActivation() {
    return this.page.locator('[aria-label="activationDate"]');
  }

  // ── Row action menu ───────────────────────────────────────────────────────

  /**
   * Returns the ⋮ action menu button for a given row (0-based index).
   * Click it to open the action list, then use rowActionItem().
   */
  rowActionMenuButton(rowIndex = 0) {
    return this.page.locator('tbody tr').nth(rowIndex).getByRole('button', { name: 'Device information' });
  }

  /**
   * Returns a row action menu item by name. Call after clicking rowActionMenuButton().
   * Available items: Device information | Data usage | Reboot camera | Format SD card |
   *   Reset PIN | Reset Factory Settings | Update AUX billing | Access Organization
   */
  rowActionItem(itemName: string) {
    return this.page.getByRole('menuitem', { name: itemName, exact: true });
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

  async filterBySimNumber(simNumber: string): Promise<void> {
    await this.searchSimNumber.fill(simNumber);
  }

  async filterByModel(model: string): Promise<void> {
    await this.searchModel.fill(model);
  }

  async filterByVersion(version: string): Promise<void> {
    await this.searchVersion.fill(version);
  } 

  async filterBySerialNumber(serialNumber: string): Promise<void> {
    await this.searchSerialNumber.fill(serialNumber);
  }

  async filterByDataProfile(dataProfile: string): Promise<void> {
    await this.searchDataProfile.fill(dataProfile);
  }

  async filterByPartner(partner: string): Promise<void> {
    await this.searchPartner.fill(partner);
  }
}
