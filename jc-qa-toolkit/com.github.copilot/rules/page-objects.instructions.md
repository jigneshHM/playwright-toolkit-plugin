---
name: Page Objects
description: Use when creating or editing Page Object classes for QA Mart in pages/.
applyTo: "pages/**/*.ts"
---
# Page Objects

- Create one named-export class per page in `pages/<Name>Page.ts`.
- Accept a Playwright `Page` in the constructor. Define locators as readonly properties and expose user actions as async methods.
- Prefer role, label, and accessible text locators; use test IDs when needed. Avoid XPath, CSS classes, and positional selectors.
- Keep assertions in specs, not Page Objects. Never use `waitForTimeout`.
- Do not hard-code credentials or base URLs. Accept values as arguments and navigate using relative paths.
- Accessible names are stable across the v1 and v2 designs; prefer them for selectors that should work in both.