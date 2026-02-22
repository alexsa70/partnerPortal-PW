# Project structure

Use this layout consistently for future development.

| Directory | Purpose |
|-----------|---------|
| **config/** | Base URLs and API endpoints (e.g. `endpoints.ts`). |
| **constants/** | Timeouts, route paths, and other shared constants (e.g. `timeouts.ts`, `routes.ts`). |
| **pages/** | Page objects (e.g. `pages/login/LoginPage.ts`). No `src/` prefix. |
| **tests/** | Playwright specs (e.g. `tests/login.spec.ts`). |
| **docs/** | Selector docs and project docs (e.g. `docs/login-page-selectors.md`, `docs/project-structure.md`). |

- **Page objects** use routes from `constants/routes.ts` and base URL from `config/endpoints.ts` when relevant.
- **Tests** import page objects from `../pages/...` (relative to `tests/`).
- **Timeouts** for tests and page objects come from `constants/timeouts.ts` (or `constants/index.ts`). Playwright config uses `DEFAULT_TIMEOUT_MS` as the test timeout.
- **Base URL** is defined once in `config/endpoints.ts` (`APP_URL`); `playwright.config.ts` imports it so there is a single source of truth.
