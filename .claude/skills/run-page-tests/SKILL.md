---
name: run-page-tests
description: Run Playwright tests for a specific page subdirectory (e.g. /run-page-tests login)
---

Run the following command, replacing `{args}` with the subdirectory name provided by the user:

```
npx playwright test tests/{args}/ --reporter=line
```

Example: `/run-page-tests login` runs `npx playwright test tests/login/ --reporter=line`
