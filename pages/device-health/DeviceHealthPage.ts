/**
 * Page object for the Device Health page (#/partner/devices-health).
 * Has three tabs: "Device health", "SD card retention", "RMA devices".
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DEVICE_HEALTH_PATH } from '../../constants/routes';

export type DeviceHealthTab = 'Device health' | 'SD card retention' | 'RMA devices';

export class DeviceHealthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to Device Health and wait for the tab bar. */
  async goto(): Promise<void> {
    await this.page.goto(DEVICE_HEALTH_PATH);
    await this.page.getByRole('tab', { name: 'Device health' }).waitFor();
  }

  // ── Tabs ──────────────────────────────────────────────────────────────────

  get tabDeviceHealth() {
    return this.page.getByRole('tab', { name: 'Device health' });
  }

  get tabSdCardRetention() {
    return this.page.getByRole('tab', { name: 'SD card retention' });
  }

  get tabRmaDevices() {
    return this.page.getByRole('tab', { name: 'RMA devices' });
  }

  async clickTab(tab: DeviceHealthTab): Promise<void> {
    await this.page.getByRole('tab', { name: tab }).click();
  }

  // ── Column search inputs (aria-label = field name) ────────────────────────

  get searchDeviceName() {
    return this.page.getByRole('textbox', { name: 'edgeName' });
  }

  get searchImei() {
    return this.page.getByRole('textbox', { name: 'device_id' });
  }

  get searchOrganization() {
    return this.page.getByRole('textbox', { name: 'organizationName' });
  }

  get searchDataProfile() {
    return this.page.getByRole('textbox', { name: 'dataProfileName' });
  }

  get searchVersion() {
    return this.page.getByRole('textbox', { name: 'semanticVersion' });
  }

  get searchPartnerDatabase() {
    return this.page.getByRole('textbox', { name: 'geotabDatabase' });
  }

  get searchAuxCams() {
    return this.page.getByRole('textbox', { name: 'auxiliaryCamerasCount' });
  }

  // ── Column headers ────────────────────────────────────────────────────────

  get colDeviceName() {
    return this.colHeader('Device Name');
  }

  get colImei() {
    return this.colHeader('IMEI');
  }

  get colOrganization() {
    return this.colHeader('Organization');
  }

  get colLastConnectedAt() {
    return this.colHeader('Last Connected At');
  }

  get colRecordingHealth() {
    return this.colHeader('Recording Health');
  }

  get colBillingStatus() {
    return this.colHeader('Billing Status');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async filterByDeviceName(name: string): Promise<void> {
    await this.searchDeviceName.fill(name);
  }

  async filterByOrganization(orgName: string): Promise<void> {
    await this.searchOrganization.fill(orgName);
  }
}
