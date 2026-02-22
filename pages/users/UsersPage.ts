/**
 * Page object for the Users list page (#/partner/users).
 * Columns: Name, Email.
 */
import type { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { USERS_PATH } from '../../constants/routes';

export class UsersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate to Users and wait for the Name column to render. */
  async goto(): Promise<void> {
    await this.page.goto(USERS_PATH);
    await this.page.waitForURL('**/partner/users**');
    await this.page.locator('thead').getByText('Name').waitFor();
  }

  // ── Column search inputs (aria-label = field name) ────────────────────────

  get searchName() {
    return this.page.getByRole('textbox', { name: 'name', exact: true });
  }

  get searchEmail() {
    return this.page.getByRole('textbox', { name: 'email', exact: true });
  }

  // ── Column headers ────────────────────────────────────────────────────────

  get colName() {
    return this.colHeader('Name');
  }

  get colEmail() {
    return this.colHeader('Email');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async filterByName(name: string): Promise<void> {
    await this.searchName.fill(name);
  }

  async filterByEmail(email: string): Promise<void> {
    await this.searchEmail.fill(email);
  }
}
