---
name: Playwright specs
description: Use when writing or changing Playwright spec files for QA Mart in tests/.
applyTo: "tests/**/*.spec.ts"
---
# Playwright specs

- Import `test` and `expect` from `tests/fixtures.ts` when using the `api` or `signedInPage` fixtures; otherwise use `@playwright/test`.
- Put the story id and acceptance criterion in relevant test titles, such as `US-101 AC3: FLAT100 at exactly ₹500`.
- Read test emails, passwords, and prices from `tests/test-data.ts`.
- Use `test.step` for stages in a multi-step flow. Keep one behavior per test and isolate test state.
- If a correct test fails because the app contradicts the story, keep the assertion and report the bug. Do not edit `app/` or weaken assertions.
- Before finishing, run `npm run typecheck` and `npm run lint:specs`.