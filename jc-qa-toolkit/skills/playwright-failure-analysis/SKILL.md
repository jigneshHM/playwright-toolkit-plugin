---
name: playwright-failure-analysis
description: "Use when a Playwright run failed, when asked why tests failed, to summarise or triage failures, or to read reports/results.json or any Playwright JSON report."
---
# Playwright failure analysis

## Steps
1. If there is no recent report, run `npm test` (or the project the user named) so the JSON reporter writes `reports/results.json`.
2. Use the report tools `tests_last_run_summary`, `tests_list_failures`, and `tests_find_flaky`, passing the absolute path to the active workspace's `reports/results.json` as `reportPath`. If the workspace path is unknown, ask for it. The bundled `summarize-report.cjs` is available beside this SKILL.md for clients that can execute files from the installed skill directory.
3. Group the failures by likely cause:
   - **Application bug**: a correct test and a response that contradicts the story (check `docs/stories/`).
   - **Test bug**: wrong expectation, stale selector, shared state, hard wait.
   - **Environment**: app not running, port busy, browser missing, timeouts on every test.
   - **Flaky**: a test that passed and failed in the same run.
4. For each group give the evidence (status codes, message, file and line) and the next action.
5. Never edit `app/` or weaken an assertion to turn a run green.

## Output
A table of groups with counts, then a short list per group. Put confirmed facts before guesses.
