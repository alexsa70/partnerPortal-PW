/**
 * One-off inspection: capture login page DOM for selector documentation.
 * Run: npx playwright test tests/inspect-login-page.spec.ts
 */
import { test } from '@playwright/test';

test('inspect login page DOM and log selectors', async ({ page }) => {
  await page.goto('/#/login');
  await page.waitForLoadState('domcontentloaded');

  // Wait for form to be visible
  await page.waitForSelector('input[type="text"], input[type="email"], input[placeholder="Email"]', {
    timeout: 10000,
  }).catch(() => {});

  const html = await page.content();
  const emailInput = await page.locator('input').first();
  const passwordInput = await page.locator('input[type="password"]').first();
  const submitButton = await page.locator('button[type="submit"], button:has-text("Log In"), button:has-text("Log in")').first();
  const forgotLink = await page.locator('a:has-text("Forgot"), a:has-text("forgot")').first();
  const errorContainer = await page.locator('[role="alert"], .error, [class*="error"], [data-testid*="error"]').first();

  const getAttrs = async (loc: ReturnType<typeof page.locator>) => {
    const count = await loc.count();
    if (count === 0) return null;
    const el = loc.first();
    const tag = await el.evaluate((e) => e.tagName);
    const attrs = await el.evaluate((e) => {
      const a: Record<string, string> = {};
      for (const attr of Array.from(e.attributes)) a[attr.name] = attr.value;
      return a;
    });
    const visibleText = await el.evaluate((e) => (e as HTMLElement).innerText?.slice(0, 80) || '');
    const ariaLabel = attrs['aria-label'];
    const id = attrs['id'];
    const name = attrs['name'];
    const type = attrs['type'];
    const placeholder = attrs['placeholder'];
    const dataTestId = attrs['data-testid'];
    const role = attrs['role'];
    return { tag, id, name, type, placeholder, 'aria-label': ariaLabel, 'data-testid': dataTestId, role, visibleText, allAttrs: attrs };
  };

  const emailAttrs = await getAttrs(emailInput);
  const passwordAttrs = await getAttrs(passwordInput);
  const submitAttrs = await getAttrs(submitButton);
  const forgotAttrs = forgotLink ? await getAttrs(forgotLink) : null;
  const errorAttrs = errorContainer ? await getAttrs(errorContainer) : null;

  // Also try getByRole/getByLabel to confirm they resolve
  const byLabelEmail = page.getByLabel(/email/i);
  const byLabelPassword = page.getByLabel(/password/i);
  const byRoleButton = page.getByRole('button', { name: /log\s*in/i });
  const byPlaceholderEmail = page.getByPlaceholder(/email/i);
  const byPlaceholderPassword = page.getByPlaceholder(/password/i);

  const byLabelEmailCount = await byLabelEmail.count();
  const byLabelPasswordCount = await byLabelPassword.count();
  const byRoleButtonCount = await byRoleButton.count();
  const byPlaceholderEmailCount = await byPlaceholderEmail.count();
  const byPlaceholderPasswordCount = await byPlaceholderPassword.count();

  // Log for documentation (visible in test output when run with --reporter=list or default)
  console.log('=== LOGIN PAGE INSPECTION ===');
  console.log('URL:', page.url());
  console.log('\n--- Email input ---');
  console.log(JSON.stringify(emailAttrs, null, 2));
  console.log('getByLabel(/email/i) count:', byLabelEmailCount);
  console.log('getByPlaceholder(/email/i) count:', byPlaceholderEmailCount);
  console.log('\n--- Password input ---');
  console.log(JSON.stringify(passwordAttrs, null, 2));
  console.log('getByLabel(/password/i) count:', byLabelPasswordCount);
  console.log('getByPlaceholder(/password/i) count:', byPlaceholderPasswordCount);
  console.log('\n--- Submit button ---');
  console.log(JSON.stringify(submitAttrs, null, 2));
  console.log('getByRole(button, { name: /log\\s*in/i }) count:', byRoleButtonCount);
  console.log('\n--- Forgot password link ---');
  console.log(JSON.stringify(forgotAttrs, null, 2));
  console.log('\n--- Error container (if any) ---');
  console.log(JSON.stringify(errorAttrs, null, 2));

  // Extract a small snippet of HTML containing form for reference
  const formSnippet = await page.locator('form, [role="form"], .login-form, main, [class*="login"]').first().evaluate((el) => el?.outerHTML?.slice(0, 3000) || 'no form container').catch(() => 'no form');
  console.log('\n--- Form container snippet (first 3000 chars) ---');
  console.log(formSnippet);
});
