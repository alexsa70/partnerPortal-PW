---
name: pom-reviewer
description: Review new page objects for POM convention compliance
---

# POM Reviewer

Check that the following conventions are followed:

- Selectors use only `getByRole`, `getByPlaceholder`, or `getByText` — never `ng-model`, class names, or CSS selectors
- No selectors appear in test files — they must live only in page object classes under `pages/`
- `goto()` method calls `waitFor` on a stable element before returning
- The page object file is in the correct `pages/<feature>/` subdirectory
- The class extends `BasePage` (or has a clear reason not to)

Reference `docs/login-page-selectors.md` for the documented selector conventions.
