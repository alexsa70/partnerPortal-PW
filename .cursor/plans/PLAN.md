# Plan: Surfsight Partner Login Page Object

## Goal and scope

- **Goal:** Inspect the Surfsight Partner staging login page and create a Playwright page object `LoginPage.ts` for use in tests.
- **Scope:** Minimal Playwright + TypeScript setup (no existing config or .ts files), one target URL (`https://partner.stage2.surfsight.net/#/login`), and a single page object file based on the actual DOM/selectors of that page.

## Prerequisites and assumptions

- Node.js and npm (or equivalent) are available.
- The login page at the URL is reachable and renders a form (username/email, password, submit).
- The workspace may have no `package.json`; if so, it will be created.
- Selectors will be derived from the live page (no prior DOM documentation).

## Ordered subtasks

| ID | Title | Summary |
|----|--------|--------|
| 01 | Minimal Playwright setup | Add Playwright, TypeScript, and config so tests and page objects can run. |
| 02 | Inspect login page | Open the login URL, capture and document DOM selectors for the form and key elements. |
| 03 | Create LoginPage.ts page object | Implement the page object using the documented selectors and standard Playwright patterns. |

## Subtask output artifacts

- **01:** `package.json`, `playwright.config.ts`, optionally `tsconfig.json`; folder structure: page objects in `src/pages/`, tests in `tests/`.
- **02:** Selector documentation (e.g. `.cursor/plans/subtasks/02-selectors.md` or `docs/login-page-selectors.md`) for use in 03.
- **03:** `LoginPage.ts` page object; optionally one smoke test file.

## Cross-cutting concerns

- **Testing:** No full test suite is in scope; the deliverable is the page object. A minimal smoke test (e.g. load page and locate one element) may be added in 03 to verify setup.
- **Docs:** Selectors and any assumptions are documented in subtask 02 output for use in 03.
- **Deployment:** N/A; local and CI execution only.
