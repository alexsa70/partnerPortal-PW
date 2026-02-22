# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test                  # Run all Playwright tests
npm run type-check        # TypeScript type check (no emit)
npm run install-browsers  # Install Playwright browsers (run once after npm install)
```

Run a single test file:
```bash
npx playwright test tests/login.spec.ts
```

Run with headed browser (useful for debugging):
```bash
npx playwright test --headed
```

## Architecture

This is a **Playwright + TypeScript E2E test suite** for the Surfsight Partner staging app (`https://partner.stage2.surfsight.net`), using the **Page Object Model (POM)** pattern.

### Key directories

- `pages/` — Page object classes. Each page/feature gets its own subdirectory (e.g. `pages/login/LoginPage.ts`). `BasePage.ts` is a base class for future inheritance.
- `tests/` — Playwright test specs that import and use page objects.
- `config/endpoints.ts` — Single source of truth for `APP_URL` (base URL).
- `constants/routes.ts` — Route path constants (e.g. `LOGIN_PATH = '/#/login'`).
- `constants/timeouts.ts` — Shared timeout values (`DEFAULT_TIMEOUT_MS = 30_000`).
- `docs/` — Selector documentation and project structure notes. Read these before adding new selectors.

### Page object conventions

- Selectors live only in page objects, never in test files.
- Use `getByPlaceholder`, `getByRole`, or `getByText` — the target app (AngularJS) has no `data-testid` attributes and no `<label>` elements, so `getByLabel` does not work.
- Do **not** use Angular-specific attributes (`ng-model`, etc.) or fragile class names.
- Page objects `waitFor` a stable element in `goto()` to guard against delayed rendering.
- See `docs/login-page-selectors.md` for the full documented selector reference for the login page.

### Target app notes

- Uses **hash routing** — navigate with `page.goto('/#/login')`, not `/login`.
- Password field has `maxlength="20"` — keep test credentials within this limit.
- Auth error selectors after a failed login are not yet verified; see the `uncertain` note in `docs/login-page-selectors.md`.

### Playwright config highlights

- Single browser project: **Chromium** (Desktop Chrome).
- `baseURL` is set from `config/endpoints.ts`; tests navigate relative to it.
- CI mode: 2 retries, 1 worker. Local: unlimited parallel workers.
- Reporter: HTML (`playwright-report/`). Traces collected on first retry.
