# Subtask 01: Minimal Playwright setup

## Purpose

Establish a minimal Playwright + TypeScript environment so that a page object (`LoginPage.ts`) and future tests can be written and run. The workspace has no existing Playwright config or TypeScript files.

## Acceptance criteria

- [ ] `package.json` exists with Playwright and TypeScript dependencies (e.g. `@playwright/test`, `typescript`; `@types/node` if needed).
- [ ] `playwright.config.ts` exists with a base URL or project config suitable for `https://partner.stage2.surfsight.net` (or equivalent so tests can use relative paths / same origin).
- [ ] TypeScript compiles without errors (e.g. `tsc --noEmit` or `npx playwright test` runs).
- [ ] Playwright browsers can be used (e.g. `npx playwright install` is documented or run; config uses default or explicit browser).
- [ ] A simple folder structure is in place for page objects and optionally tests (e.g. `src/pages/`, `tests/`, or as chosen and documented in the plan).

## Relevant paths

- Repository root: `package.json`, `tsconfig.json` (if created), `playwright.config.ts`
- Optional: `tests/`, `src/`, or `e2e/` for test and page-object locations (decide and keep consistent with subtask 03)

## Dependencies

- None (first subtask).

## Rough scope

- Add or create `package.json` with scripts such as `test` (e.g. `playwright test`) and `build` or type-check if useful.
- Add `playwright.config.ts` with at least one project, base URL pointing at `https://partner.stage2.surfsight.net`, and TypeScript support.
- Add `tsconfig.json` if not present, with module/target suitable for Playwright and strictness appropriate for the project.
- Do **not** implement the login page object or real login tests in this subtask; only setup.

## Notes

- Use `@playwright/test` so the same runner is used for tests and for any small smoke run.
- If the app uses hash routing (`#/login`), ensure base URL does not include the hash; the page object will navigate to `#/login` explicitly.
