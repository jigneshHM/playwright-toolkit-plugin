---
description: Investigate a failing Playwright spec and complete the QA Mart bug-report template.
argument-hint: spec path, for example tests/seeded/stock-limit.spec.ts
agent: agent
tools: ['read', 'search', 'execute']
---
Spec to investigate: ${input:spec:tests/seeded/stock-limit.spec.ts}

Do not edit files.

1. Run the spec with `npx playwright test <spec> --project=seeded`; use the default project if it is outside `tests/seeded/`.
2. Read the test and failure, then find the relevant story and acceptance criterion in `docs/stories/`.
3. Classify the result as an application bug, test bug, environment issue, or unconfirmed. A failing test alone is not proof of an app defect.
4. Complete `docs/templates/bug-report.md` with exact status codes, messages, amounts, command, and file references.
5. Keep confirmed facts separate from assumptions.

Output only the completed report.