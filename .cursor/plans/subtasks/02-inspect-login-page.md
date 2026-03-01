# Subtask 02: Inspect login page

## Purpose

Capture the actual DOM structure and selectors of the Surfsight Partner login page so that the page object in subtask 03 is based on real elements, not placeholders.

## Acceptance criteria

- [ ] The login page at `https://partner.stage2.surfsight.net/#/login` has been opened and inspected (via browser DevTools, Playwright trace/snapshot, or Cursor browser tools).
- [ ] The following are documented with concrete selectors (id, name, data-testid, role+label, or CSS/XPath that targets the element reliably):
  - **Username/email input** (or equivalent primary identifier field).
  - **Password input**.
  - **Submit / Sign-in button** (or equivalent primary action).
  - Optional: "Forgot password" link, error message container, or other relevant UI if present.
- [ ] Documentation is written to a file that subtask 03 can use (e.g. `.cursor/plans/subtasks/02-selectors.md` or an "Inspection notes" section appended to this subtask file, or a short `docs/login-page-selectors.md`). Include:
  - Selector strategy preferred (e.g. role + name, test ids, name attributes).
  - Exact selector strings or locator descriptions for each element.
- [ ] Any notable quirks are noted (e.g. iframe, dynamic IDs, delayed rendering, duplicate labels).

## Relevant paths

- Output: `.cursor/plans/subtasks/02-selectors.md` or `docs/login-page-selectors.md` (or as specified in the plan overview).
- Optionally: this file (02-inspect-login-page.md) with an "Inspection notes" section added after the fact.

## Dependencies

- **01** (Minimal Playwright setup) must be done so that Playwright can be used to open the page and run `page.locator(...)` or similar to verify selectors, if desired.

## Rough scope

- Navigate to `https://partner.stage2.surfsight.net/#/login`.
- Identify form fields and buttons (inspect HTML: `id`, `name`, `aria-label`, `data-testid`, `type`, placeholder, associated `<label>`).
- Prefer selectors that are stable (e.g. `getByRole('button', { name: 'Sign in' })`, `getByLabel('Email')`, or `data-testid` if the app provides them). Avoid fragile class names or deep DOM paths unless necessary.
- Write the selector list and strategy to the chosen documentation file so the worker for 03 can implement `LoginPage.ts` without re-inspecting.

## Notes

- If the page is behind auth or CAPTCHA and cannot be fully inspected, document what was visible and mark "Submit" or other elements as "to be refined when page is accessible."
- Hash routing: the path is `#/login`; ensure the documented URL and any base URL usage are consistent with 01.
