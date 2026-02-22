/**
 * Page object for the Device Alarms page (#/partner/devices-alarms).
 * Has two tabs: "Alarms" and "Alarms Beta".
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DEVICE_ALARMS_PATH } from '../../constants/routes';

export type DeviceAlarmsTab = 'Alarms' | 'Alarms Beta';

export class DeviceAlarmsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to Device Alarms and wait for the tab bar. */
  async goto(): Promise<void> {
    await this.page.goto(DEVICE_ALARMS_PATH);
    await this.page.getByRole('tab', { name: 'Alarms', exact: true }).waitFor();
  }

  // ── Tabs ──────────────────────────────────────────────────────────────────

  get tabAlarms() {
    return this.page.getByRole('tab', { name: 'Alarms', exact: true });
  }

  get tabAlarmsBeta() {
    return this.page.getByRole('tab', { name: 'Alarms Beta' });
  }

  async clickTab(tab: DeviceAlarmsTab): Promise<void> {
    await this.page.getByRole('tab', { name: tab, exact: tab === 'Alarms' }).click();
  }

  // ── Column search inputs (aria-label = field name) ────────────────────────

  /** Filters by device/edge name. */
  get searchDeviceName() {
    return this.page.getByRole('textbox', { name: 'edgeName' });
  }

  /** Filters by serial number. */
  get searchSerialNumber() {
    return this.page.getByRole('textbox', { name: 'serialNumber' });
  }

  /** Filters by alarm definition name. */
  get searchAlarmType() {
    return this.page.getByRole('textbox', { name: 'alarmDefinitionName' });
  }

  // ── Column headers ────────────────────────────────────────────────────────

  get colSeverity() {
    return this.colHeader('Severity');
  }

  get colName() {
    return this.colHeader('Name');
  }

  get colImei() {
    return this.colHeader('IMEI');
  }

  get colOrganization() {
    return this.colHeader('Organization/Partner');
  }

  get colCreationDate() {
    return this.colHeader('Creation Date');
  }

  get colAlarm() {
    return this.colHeader('Alarm');
  }

  get colAction() {
    return this.colHeader('Action');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async filterByDeviceName(name: string): Promise<void> {
    await this.searchDeviceName.fill(name);
  }

  async filterByAlarmType(alarmType: string): Promise<void> {
    await this.searchAlarmType.fill(alarmType);
  }
}
