/**
 * Base page class with shared navigation and user-menu actions.
 * All authenticated page objects extend this class.
 */
import type { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  // ── Top navigation links ──────────────────────────────────────────────────

  get navDashboard() {
    return this.page.getByRole('link', { name: 'Dashboard', exact: true }).first();
  }

  get navDevices() {
    return this.page.getByRole('link', { name: 'Devices', exact: true }).first();
  }

  get navDeviceHealth() {
    return this.page.getByRole('link', { name: 'Device Health', exact: true });
  }

  get navDeviceAlarms() {
    return this.page.getByRole('link', { name: 'Device Alarms', exact: true });
  }

  get navOrganizations() {
    return this.page.getByRole('link', { name: 'Organizations', exact: true });
  }

  get navSubPartners() {
    return this.page.getByRole('link', { name: 'Sub-Partners', exact: true });
  }

  get navUsers() {
    return this.page.getByRole('link', { name: 'Users', exact: true });
  }

  // ── User account menu ─────────────────────────────────────────────────────

  /**
   * The user-account dropdown button (top-right toolbar).
   * Identified by aria-haspopup="true" — the only such button in the toolbar.
   */
  get userMenuButton() {
    return this.page.locator('button[aria-haspopup="true"]').first();
  }

  /** Opens the user dropdown menu. */
  async openUserMenu(): Promise<void> {
    await this.userMenuButton.click();
  }

  /** Returns the current user email shown in the user-menu button label. */
  async getUserEmail(): Promise<string> {
    return (await this.userMenuButton.getAttribute('aria-label')) ?? '';
  }

  /** Opens the user menu and clicks "Log out". */
  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.page.getByText('Log out').click();
  }

  /** Opens the user menu and clicks "Change password". */
  async clickChangePassword(): Promise<void> {
    await this.openUserMenu();
    await this.page.getByText('Change password').click();
  }

  /**
   * Returns a locator for a table column header by its visible text.
   * Scoped to <thead> to avoid matching data cells with the same text.
   * Handles sortable columns that have role="button" on the <th> element.
   */
  protected colHeader(name: string) {
    return this.page.locator('thead').getByText(name, { exact: true });
  }
}
