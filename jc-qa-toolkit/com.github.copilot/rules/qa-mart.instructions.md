---
name: QA Mart project context
description: Use when working with QA Mart tests, its API, seeded stories, or Playwright workflows.
applyTo: "**"
---
# QA Mart project context

- QA Mart is a small shop app. Its base URL is `http://localhost:3000`; its server is started with `npm start` in the QA Mart repository.
- Main pages are `/login`, `/products`, `/cart`, `/checkout`, and `/confirmation`. APIs include `/api/login`, `/api/products`, `/api/coupons/validate`, and `/api/orders`.
- The repository uses Playwright Test with TypeScript. The default project is Chromium; `npm run test:v2` exercises the redesigned UI while preserving accessible names.
- Shared fixtures are in `tests/fixtures.ts`; credentials and test data are in `tests/test-data.ts`.
- A failing test can expose a seeded application defect. Compare behavior with `docs/stories/`, preserve valid assertions, and report app defects. Do not edit the application to make tests pass.
- Keep secrets out of specs, reports, prompts, and plugin configuration.