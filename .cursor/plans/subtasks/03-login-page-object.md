# Subtask 03: Create LoginPage.ts page object

## Purpose

Implement a Playwright page object class for the Surfsight Partner login page, using the selectors documented in subtask 02, so that tests can reuse methods like `goto()`, `fillCredentials()`, and `submit()` instead of duplicating locators.

## Acceptance criteria

- [ ] A file `LoginPage.ts` exists in the agreed location (e.g. `src/pages/LoginPage.ts`, `pages/LoginPage.ts`, or under `tests/` as decided in 01).
- [ ] The page object class exposes:
  - **goto()**: navigates to the login page (e.g. `baseURL + '#/login'` or full URL).
  - **fillCredentials(username, password)** (or separate `fillEmail`/`fillPassword` if preferred): fills the username/email and password inputs using the selectors from 02.
  - **submit()** (or **clickSignIn()**): triggers the primary submit action (button click or form submit).
  - Optional: **getErrorMessage()**, **clickForgotPassword()** if those were documented and are useful.
- [ ] All locators used in the page object match the selectors documented in subtask 02 (no placeholder or guessed selectors).
- [ ] The class is usable from Playwright tests (e.g. `import { LoginPage } from '...'; const login = new LoginPage(page); await login.goto();`).
- [ ] TypeScript compiles and, if feasible, a minimal smoke test (e.g. open login page and assert one element is visible) passes to verify setup and page object.

## Relevant paths

- Page object: path chosen in 01, e.g. `src/pages/LoginPage.ts` or `tests/pages/LoginPage.ts`.
- Selector reference: `.cursor/plans/subtasks/02-selectors.md` or `docs/login-page-selectors.md` (from 02).
- Optional: one minimal test file (e.g. `tests/login.spec.ts`) that instantiates `LoginPage`, calls `goto()`, and performs one assertion.

## Dependencies

- **01** (Minimal Playwright setup): config and TypeScript in place.
- **02** (Inspect login page): selector documentation must exist; implement only using those documented selectors.

## Rough scope

- Create a class (e.g. `LoginPage`) that receives a Playwright `Page` in the constructor (or a `BrowserContext`/fixture, depending on project style).
- Implement `goto()`, `fillCredentials(username, password)`, and `submit()` using the exact selectors from 02. Use `page.getByRole()`, `page.getByLabel()`, `page.locator()`, etc., as appropriate.
- Do not add tests beyond one optional smoke check that the login page loads and a key element is visible.
- Export the class so it can be imported from tests.

## Notes

- If 02 documented that some selectors are uncertain, use the best available and add a short comment in code pointing to the inspection doc for future updates.
- Keep the page object free of test assertions; only actions and (if needed) getters for text/visibility.
