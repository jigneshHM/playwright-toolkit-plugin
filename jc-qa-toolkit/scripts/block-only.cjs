// preToolUse hook: deny edits that add test.only / describe.only / fit / fdescribe to a spec.
// Prints {} to allow. Works with Copilot (toolName/toolArgs) and Local (tool_name/tool_input) payloads.
const fs = require('node:fs');

const event = JSON.parse(fs.readFileSync(0, 'utf8'));
const toolName = String(event.toolName ?? event.tool_name ?? '');
let args = event.toolArgs ?? event.tool_input ?? {};
if (typeof args === 'string') { try { args = JSON.parse(args); } catch { args = {}; } }

const EDIT_TOOL = /edit|create|write|replace|patch|insert/i;
const FOCUSED = /\b(?:test|it|describe)(?:\.(?:serial|parallel))?\.only\s*\(|\b(?:fit|fdescribe)\s*\(/;

function strings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out));
  return out;
}

const targetsSpec = /\.spec\.[jt]s/.test(JSON.stringify(args));
if (EDIT_TOOL.test(toolName) && targetsSpec && strings(args).some((s) => FOCUSED.test(s))) {
  const reason = 'Focused tests (.only) must not be committed: they silently skip the rest of the suite. Remove .only.';
  const isCopilot = typeof event.toolName === 'string';
  process.stdout.write(JSON.stringify(isCopilot
    ? { permissionDecision: 'deny', permissionDecisionReason: reason }
    : { hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason } }));
} else {
  process.stdout.write('{}');
}
