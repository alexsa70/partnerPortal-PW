---
name: gen-page-object
description: Scaffold a new Playwright Page Object class following the project's POM conventions
---

The user will invoke this as `/gen-page-object <feature/ClassName>`, e.g. `/gen-page-object devices/AlarmDetailPage`.

Steps:
1. Read `pages/BasePage.ts` to understand the base class interface
2. Read `docs/login-page-selectors.md` for selector conventions
3. Read an existing page object (e.g. `pages/login/LoginPage.ts`) as a structural reference
4. Create `pages/<feature>/<ClassName>.ts` with:
   - Class extending `BasePage`
   - Selectors using only `getByRole`, `getByPlaceholder`, or `getByText`
   - A `goto()` method that navigates to the correct hash route and waits for a stable element
5. Create a matching test stub at `tests/<feature>/<ClassName>.spec.ts` with a `test.describe` block and `beforeEach` calling `page.goto`
