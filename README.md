# Surfsight Partner Portal — Playwright E2E Tests

Playwright + TypeScript test suite for the [Surfsight Partner staging app](https://partner.stage2.surfsight.net), using the **Page Object Model (POM)** pattern.

## Stack

- [Playwright](https://playwright.dev/) — browser automation
- TypeScript — type-safe selectors and page objects
- Chromium (Desktop Chrome)

## Project structure

```
├── pages/
│   ├── BasePage.ts                  # Navigation links + user menu (base for all pages)
│   ├── login/LoginPage.ts           # Login page (terms checkbox, full login flow)
│   ├── dashboard/DashboardPage.ts   # Partner dashboard
│   ├── devices/DevicesPage.ts       # Devices list
│   ├── device-health/               # Device Health (tabs: Device health / SD card / RMA)
│   ├── device-alarms/               # Device Alarms (tabs: Alarms / Alarms Beta)
│   ├── organizations/               # Organizations list
│   ├── subresellers/                # Sub-Partners list
│   └── users/                       # Users list
├── tests/
│   ├── login.spec.ts
│   ├── dashboard.spec.ts
│   ├── devices.spec.ts
│   ├── device-health.spec.ts
│   ├── device-alarms.spec.ts
│   ├── organizations.spec.ts
│   ├── subresellers.spec.ts
│   └── users.spec.ts
├── fixtures/index.ts                # Custom test with auth page + 7 POM fixtures
├── playwright/global-setup.ts       # One-time login → saves .auth/user.json
├── config/endpoints.ts              # APP_URL
├── constants/routes.ts              # Route path constants
├── constants/timeouts.ts            # DEFAULT_TIMEOUT_MS
└── docs/                            # Selector reference docs
```

## Setup

```bash
npm install
npm run install-browsers   # install Playwright's Chromium (run once)
```

Copy `.env.example` and fill in credentials:

```bash
cp .env.example .env
```

```env
TEST_EMAIL=your@email.com
TEST_PASSWORD=yourpassword
```

## Running tests

```bash
# All tests
npm test

# Single spec
npx playwright test tests/devices.spec.ts

# Headed browser (useful for debugging)
npx playwright test --headed

# TypeScript check (no emit)
npm run type-check
```

## Authentication

Tests use a **global setup** (`playwright/global-setup.ts`) that logs in once before all tests and saves the browser storage state to `.auth/user.json`. Each test then reuses this auth state via a custom `page` fixture — no per-test login required.

The `.auth/` directory is git-ignored. It is created automatically on first run.

## Fixtures

All specs import `test` and `expect` from `fixtures/index.ts` instead of `@playwright/test`. This provides pre-authenticated page object fixtures for every section of the app:

| Fixture | Page object |
|---|---|
| `dashboardPage` | `DashboardPage` |
| `devicesPage` | `DevicesPage` |
| `deviceHealthPage` | `DeviceHealthPage` |
| `deviceAlarmsPage` | `DeviceAlarmsPage` |
| `organizationsPage` | `OrganizationsPage` |
| `subResellersPage` | `SubResellersPage` |
| `usersPage` | `UsersPage` |

Each spec uses `test.describe` with a `beforeEach` that navigates to the page and waits for a stable element before assertions run:

```typescript
import { DEVICES_PATH } from '../constants/routes';
import { test, expect } from '../fixtures';

test.describe('Devices Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DEVICES_PATH);
  });

  test('shows Device Name column', async ({ devicesPage }) => {
    await expect(devicesPage.colDeviceName).toBeVisible();
  });
});
```

## Page objects

All authenticated page objects extend `BasePage`, which provides:

| Getter / Method | Description |
|---|---|
| `navDashboard` … `navUsers` | Top nav link locators |
| `openUserMenu()` | Click the user dropdown |
| `logout()` | Open menu → click "Log out" |
| `clickChangePassword()` | Open menu → click "Change password" |
| `colHeader(name)` | `<thead>` column header by exact text |

### LoginPage

```typescript
const login = new LoginPage(page);
await login.goto();
await login.login(email, password); // fills, accepts terms, submits, waits for nav
```

## App notes

- Uses **hash routing** (`#/partner/dashboard`, `#/partner/devices`, etc.)
- AngularJS — no `data-testid` attributes; selectors use `getByPlaceholder`, `getByRole`, `getByText`
- Login requires accepting a Terms & Conditions checkbox before submitting
- Sortable `<th>` columns have `role="button"` (not `columnheader`); headers are located via `locator('thead').getByText(name, { exact: true })`
- Column filter inputs have `aria-label` matching their field name, targeted via `getByRole('textbox', { name: fieldName, exact: true })`
