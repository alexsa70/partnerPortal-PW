# Login Page Selectors

**Source:** Live inspection of `https://partner.stage2.surfsight.net/#/login` (Subtask 02).  
**Purpose:** Use these selectors in `LoginPage.ts` (Subtask 03) without re-inspecting the page.

---

## Preferred selector strategy

- **Prefer role + name or placeholder-based locators** — The page has no `<label>` elements (so `getByLabel` does not resolve). Use `getByPlaceholder(...)` or `getByRole('textbox', { name: '...' })` for inputs, and `getByRole('button', { name: '...' })` / `getByRole('link', { name: '...' })` for buttons and links.
- **Avoid** relying on Angular-specific attributes (`ng-model`, `ng-required`), inline styles, or fragile class names (e.g. `ng-pristine`, `field-input-width`) for stability.
- **No `data-testid`** — The app does not expose test IDs; use role/placeholder/name only.

---

## Required elements

### Username / Email input

- **Preferred:** `page.getByPlaceholder('Email')` or `page.getByRole('textbox', { name: 'Email' })`
- **Fallback (by name):** `page.locator('input[name="email"]')`
- **Attributes observed:** `name="email"`, `type="text"` or `type="email"`, `placeholder="Email"`, `required`, no `id`. No associated `<label>` (getByLabel does not match).

### Password input

- **Preferred:** `page.getByPlaceholder('Password')` (password inputs have no implicit `textbox` role; do not use `getByRole('textbox', …)` for password)
- **Fallback (by name/type):** `page.locator('input[name="password"]')` or `page.locator('input[type="password"]')`
- **Attributes observed:** `name="password"`, `type="password"`, `placeholder="Password"`, `required`, `maxlength="20"`, no `id`.

### Submit / Sign-in button

- **Preferred:** `page.getByRole('button', { name: 'Log In' })` or `page.getByRole('button', { name: /log\s*in/i })`
- **Fallback:** `page.locator('button[type="submit"]')` (unique on this form)
- **Attributes observed:** `type="submit"`, visible text "Log In", no `data-testid`.

---

## Optional elements

### Forgot password link

- **Preferred:** `page.getByText('Forgot Password ?')` (anchor has no `href`, so it may not expose `link` role; use text for reliability)
- **Fallback:** `page.locator('a:has-text("Forgot Password")')`
- **Attributes observed:** No `id` or `href` in inspection; text "Forgot Password ?", `ng-click="toggleForgotPassword()"`.

### Error message container(s)

- **Field-level validation (e.g. "This is required."):** Shown when a field is touched and empty. Container: `page.locator('.input-field-error')` or by message text, e.g. `page.getByText('This is required.')`. The form uses `ng-messages` and `ng-show`; the div has class `input-field-error`.
- **Auth / login failure message:** Not triggered during inspection. When the page shows an error after submitting invalid credentials, prefer `page.getByRole('alert')` if the app uses it, or a stable text/container selector once the actual DOM is known. **Mark as uncertain** until verified with a failed login.

---

## Quirks and notes

1. **No labels** — Inputs use only placeholders; `getByLabel('Email')` / `getByLabel('Password')` return 0. Use `getByPlaceholder` or `getByRole('textbox', { name: '...' })`.
2. **Hash routing** — Full path is `/#/login`; with `baseURL: 'https://partner.stage2.surfsight.net'`, use `page.goto('/#/login')` or equivalent in the page object.
3. **AngularJS** — Page uses AngularJS (ng-model, ng-required, etc.). No dynamic `id` on form fields observed; avoid relying on generated IDs.
4. **Password maxlength** — Input has `maxlength="20"`; keep in mind for test data.
5. **No iframes** — Form is in the main document.
6. **Delayed rendering** — Form was present after normal load; if needed, wait for an input or the submit button before interacting (e.g. `page.getByPlaceholder('Email').waitFor()`).

---

## Summary for LoginPage.ts

| Element            | Preferred locator                                              |
|--------------------|----------------------------------------------------------------|
| Email input        | `getByPlaceholder('Email')` or `getByRole('textbox', { name: 'Email' })` |
| Password input     | `getByPlaceholder('Password')` (do not use getByRole('textbox') for password) |
| Submit button      | `getByRole('button', { name: 'Log In' })`                      |
| Forgot password    | `getByText('Forgot Password ?')` (anchor has no href; link role may not apply) |
| Validation error   | `.input-field-error` or `getByText('This is required.')`       |
| Auth error         | To be refined when page is accessible after failed login (e.g. `getByRole('alert')` or by visible error text) |
