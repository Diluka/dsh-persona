# AGENTS.md

## Project Overview

This repository is a DSH dual-end plugin package, not a standalone web app. Work should preserve the plugin shape and the way it mounts into the existing DSH runtime.

## File Responsibilities

- `lib/index.js`: host-side wiring; connects the plugin to DSH/Cordis services and exports the host entry behavior.
- `lib/persona.js`: pure persona/model logic; keep it free of host/client side effects where possible.
- `lib/client.js`: lazy CommonJS client entry; browser-facing code should stay compatible with the plugin loading path.
- `cordis.patch.yml`: profile patch used to mount/configure the plugin in a DSH composition.

## Development Guardrails

- Do not start a replacement Vite server or treat this as a standalone web app; DSH Web injects the runtime boot context.
- Do not push commits or branches unless the user explicitly asks.
- Do not edit running dynamic Cordis plugins unless the user specifically asks for a live preview.
- Keep changes minimal and scoped to the requested plugin behavior.

## Custom UI Component Style

- Keep `lib/client.js` as a single-file lazy CommonJS client entry.
- Define components as plain `function PascalName(props)` and place props JSDoc directly above the component.
- Use `React.createElement`; do not use JSX, TypeScript, `import`, or multi-file client splits.
- For complex settings pages, split into thin or local components within `lib/client.js` only.
- Bind styles to DSH theme tokens instead of hard-coded visual constants where practical.

## Validation Commands

- Run static/project checks: `pnpm check`
- Verify package contents without publishing: `pnpm pack:dry-run`

## GUI Validation

- Validate visible behavior in the existing DSH Web GUI, normally at `http://127.0.0.1:3080`.
- For preview-only UI/runtime experiments, use dynamic Cordis preview in the current DSH session instead of modifying a running dynamic plugin unexpectedly.
- Remember that this package is loaded by DSH; rebuilding or refreshing the existing GUI may be required depending on what changed.
