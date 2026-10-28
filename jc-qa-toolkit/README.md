# jc-qa-toolkit

An Agent Plugins 1.0 package for QA Mart and Playwright. Its skills, agents, slash commands, rules, MCP servers, hook configuration, and hook scripts are all included in this folder.

## Included

| Type | Components |
| --- | --- |
| Skills | `playwright-failure-analysis`, `coupon-boundary-testing` |
| Agents | `test-reviewer`, `qamart-explorer` |
| Commands | `test-from-story`, `bug-report` |
| Rules | QA Mart overview, Playwright specs, Page Objects |
| MCP servers | Playwright and QA Mart |
| Hooks | Block focused-only tests, protect `app/`, lint and typecheck test edits |

## Install

In Copilot Chat, add the marketplace and install the plugin:

```text
/plugin marketplace add jigneshHM/playwright-toolkit-plugin
/plugin install jc-qa-toolkit@jc-qa-marketplace
```

The repository also recommends this plugin through `.github/copilot/settings.json`. Review and trust the marketplace when prompted. The plugin configures its own MCP servers and hooks; no workspace-specific MCP or hook files are required.

### Team recommendations

Publish the updated `.claude-plugin/marketplace.json` to `jigneshHM/playwright-toolkit-plugin` before sharing the new install command. The marketplace is named `jc-qa-marketplace` to avoid conflicting with the team's existing `qa-mart-lab` marketplace.

Merge the updated `.github/copilot/settings.json` into the team repository, preserving its existing marketplace and plugin recommendations. Teammates must pull that change, enable `chat.plugins.enabled` in a VS Code version that supports agent plugins, and send a message in Copilot Chat. Then search the Extensions view for `@agentPlugins @recommended` and install `jc-qa-toolkit`, accepting the marketplace trust prompt after review.

## Prerequisites

- Node.js 20 or newer.
- A QA Mart app running at `http://127.0.0.1:3000` for the `qamart` tools. In the QA Mart repository, start it with `npm start`.
- Run the Playwright suite in the QA Mart repository before asking report tools to inspect results. Pass the absolute path to its `reports/results.json` as the report tools' `reportPath` argument.
- The Playwright MCP server uses `npx` and may download `@playwright/mcp` on first startup.

The plugin supplies test tooling, not the QA Mart application itself. For a different app URL, set `QAMART_URL` in the MCP server environment.

## 60-second demo

1. Start QA Mart with `npm start` in its repository.
2. In Copilot Chat, run `/jc-qa-toolkit:test-from-story` with `US-101`.
3. Ask the QA Mart tools to validate `FLAT100` at a subtotal of 500; the seeded app currently returns 422, exposing the planted defect.
4. Run the generated test or another Playwright suite, then use the failure-analysis skill on its JSON report.
5. Try editing a spec to include `test.only`; the plugin hook should deny the edit.

## Verify

From the QA Mart repository:

```bash
npm run mcp:smoke
npm run lint:specs
npm run typecheck
```

In VS Code, confirm the plugin's agents, skills, commands, rules, hooks, and both MCP servers appear in the relevant customization and MCP views. Call `qamart_health` after starting the app. A successful install alone does not prove that the local app is running.

## Safety

- `test-reviewer` is read-only. `qamart-explorer` does not edit files and asks before using state-changing order/reset tools.
- `qamart_place_order` and `qamart_reset` mutate the QA Mart test app.
- Hooks and MCP servers execute local code. Review the bundled scripts before installation.
- Do not put credentials, tokens, cookies, or storage state in plugin files or prompts.
