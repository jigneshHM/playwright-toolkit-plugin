---
description: Turn a QA Mart story into a test-case table and a first Playwright spec.
argument-hint: story id, for example US-103
agent: agent
---
Story id: ${input:story:US-103}

1. Read the matching story in `docs/stories/`. If no file matches, say so and stop.
2. Create a test-case table using `docs/templates/test-case.md`: include every acceptance criterion plus negative and boundary cases. Name the technique and identify whether each row is UI or API.
3. Implement the highest-priority cases in `tests/lab/<story-id-lowercase>.spec.ts`. Reuse `tests/fixtures.ts` and `tests/test-data.ts`; include the story id and AC number in test titles.
4. Run `npm run typecheck`, `npm run lint:specs`, and the new spec.
5. If a test fails because the app contradicts the story, keep the test and report the defect. Do not weaken assertions or edit `app/`.

Finish with the table, spec path, and failing tests mapped to the story criteria they violate.