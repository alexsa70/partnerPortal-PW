/**
 * Page object for the Surfsight Partner login page.
 * Selectors from docs/login-page-selectors.md and live inspection.
 */
import type { Page } from '@playwright/test';
import { LOGIN_PATH } from '../../constants/routes';

export class LoginPage {
  constructor(private readonly page: Page) {}

  /** Navigate to the login page (baseURL + LOGIN_PATH). Waits for form to be ready. */
  async goto(): Promise<void> {
    await this.page.goto(LOGIN_PATH);
    await this.page.getByPlaceholder('Email').waitFor();
  }

  /** Fill email and password using getByPlaceholder selectors. */
  async fillCredentials(email: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
  }

  /**
   * Accept the Terms & Conditions checkbox (md-checkbox).
   * Must be checked before Log In can succeed.
   */
  async acceptTerms(): Promise<void> {
    const checkbox = this.page.locator('md-checkbox').first();
    if ((await checkbox.getAttribute('aria-checked')) !== 'true') {
      await checkbox.click();
    }
  }

  /** Click the "Log In" submit button. */
  async submit(): Promise<void> {
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  /**
   * Full login flow: fill credentials, accept terms, submit, and wait for
   * the app to redirect away from the login page.
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillCredentials(email, password);
    await this.acceptTerms();
    await this.submit();
    // Hash-route changes don't fire a page load event, so wait for a stable
    // post-login element (the "Dashboard" nav link) instead of waitForURL.
    await this.page
      .getByRole('link', { name: 'Dashboard', exact: true })
      .first()
      .waitFor({ timeout: 30_000 });
  }

  /** Click the "Forgot Password ?" link. */
  async clickForgotPassword(): Promise<void> {
    await this.page.getByText('Forgot Password ?').click();
  }

  /**
   * Returns visible validation error text (e.g. "This is required.")
   * or terms-and-conditions error ("Please accept the terms and conditions.").
   */
  async getErrorMessage(): Promise<string> {
    // Inline field validation errors
    const fieldError = this.page.locator('.input-field-error').first();
    if (await fieldError.isVisible()) {
      return (await fieldError.textContent())?.trim() ?? '';
    }
    // Terms & conditions or server errors
    const toastError = this.page.locator('.errorMsg').first();
    if (await toastError.isVisible()) {
      return (await toastError.textContent())?.trim() ?? '';
    }
    return '';
  }

  /** Email input locator (for tests that need to assert visibility). */
  get emailInput() {
    return this.page.getByPlaceholder('Email');
  }

  /** Password input locator (for tests that need to assert visibility). */
  get passwordInput() {
    return this.page.getByPlaceholder('Password');
  }

  /** Terms & Conditions checkbox. */
  get termsCheckbox() {
    return this.page.locator('md-checkbox').first();
  }

  /** Log In button. */
  get submitButton() {
    return this.page.getByRole('button', { name: 'Log In' });
  }

  /** Forgot password link. */
  get forgotPasswordLink() {
    return this.page.getByText('Forgot Password ?');
  }
}
