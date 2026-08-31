# dsh-persona

`dsh-persona` is a DeepSeek Harness dual-end plugin that adds a configurable collaboration-style layer to model requests. It is built for people installing or using DSH Web, with a small settings page for choosing how the coding agent communicates.

The plugin appends one style-oriented system prompt section after DSH's core identity and operating rules. It shapes tone, progress reporting, validation language, and collaboration habits; DSH still owns the core prompt, tool policy, safety rules, and runtime behavior.

## What It Adds

- A persistent `dsh-persona` settings namespace for this plugin's runtime options.
- A host-side system prompt section named `dsh-persona:style`.
- A plugin configuration card for enabling or disabling the communication-style layer.
- A DSH Web settings section that loads only while the layer is enabled.
- Two built-in style options shown in Chinese: `友好协作` and `务实直接`.
- An editable common prompt block that is prepended to the selected style.

The current UI intentionally does not include a final injected-prompt preview. Users configure the shared block and chosen style separately; the host renders the final prompt section at request time.

## Install

Requires Node.js 22 or newer, matching current DSH runtime support.

Install the plugin into the DSH Web profile from the repository:

```sh
dsh plugin --profile web add github:Diluka/dsh-persona
```

Restart the DSH Web profile so the Cordis patch mounts the plugin, then open the existing DSH Web GUI.

If the package is later published to npm, it can be installed by package name with the same profile target:

```sh
dsh plugin --profile web add dsh-persona
```

## Settings Page

The master switch is in:

```text
Settings -> 插件 -> dsh-persona
```

When `enabled` is off, the dedicated communication-style settings page is not registered and the prompt layer is not appended.

When enabled, open DSH Web and go to:

```text
Settings -> 沟通风格
```

Depending on the active UI language or navigation labels, the section may also appear as `Communication Style`.

The dedicated page currently provides:

- `preset`: stores the selected built-in style.
- style selector: uses a DSH-style dropdown trigger instead of the browser's native select control.
- style prompt preview: shows the complete read-only style prompt directly after the selector.
- `shared`: edits the common prompt block applied before the style; this editor appears at the end.
- reset action: restores the common prompt to the plugin default.

Changes are stored through DSH settings and apply to subsequent model requests.

## Runtime Storage

Runtime configuration is stored in the DSH settings namespace:

```text
dsh-persona
```

The namespace contains the user-facing options needed to render the prompt layer, including whether the layer is enabled, which style is selected, and the shared prompt text.

Composition defaults may still be supplied when mounting the plugin:

```yaml
- id: dsh-persona
  name: dsh-persona
  config:
    enabled: true
    preset: pragmatic
    shared: |-
      # Work Presentation

      - Keep the user clearly informed about ongoing actions without unnecessary detail.
```

Settings saved from the Web page take effect at runtime through the same `dsh-persona` namespace.

## Safety And Scope

`dsh-persona` is a style layer, not a control plane for agent behavior.

- It appends one additional system-prompt section; it does not replace DSH's core prompt.
- It focuses on communication style, collaboration tone, progress updates, validation summaries, and next-step wording.
- It does not implement memory, preference learning, chat history distillation, or long-term user profiling.
- It does not grant tools, change sandbox or approval policy, or widen file/network access.
- Built-in style text is read-only so installed behavior remains predictable; users customize the shared block instead.

The effective authority remains with DSH's host composition, active agent configuration, tool definitions, sandbox policy, approval policy, and model routing.

## Styles

The default common prompt is a larger Codex-style output guidance block rewritten for DSH. It covers concise teammate tone, concrete progress updates, command-output summaries, validation status, and natural next steps while preserving DSH-specific wording.

The style selector adds a complete DSH-adapted Codex personality template:

- `friendly` / `友好协作`: optimizes for team morale, supportive collaboration, pairing, onboarding, and gentle escalation.
- `pragmatic` / `务实直接`: acts as a deeply pragmatic, effective DSH coding teammate with explicit reasoning, rigor, and concise tradeoff discussion.

The plugin uses `enabled: false` for the no-style-layer case instead of exposing a third style option.

## Architecture Overview

This repository is a DSH plugin package, not a standalone web app.

- Host entry: registers settings-backed runtime behavior and contributes the rendered `systemPrompt` section.
- Prompt model: keeps shared/style rendering logic separate from DSH side effects.
- Client entry: registers a `settings.section` UI inside DSH Web for the `dsh-persona` namespace.
- Profile patch: mounts the plugin into a DSH composition with optional defaults.

At runtime the host reads settings, combines the common prompt block with the selected read-only style prompt, and appends the result as a style section for future model requests. The client writes settings only; it does not own prompt injection.

## Uninstall

Remove the plugin from the DSH Web profile:

```sh
dsh plugin --profile web remove dsh-persona
```

Restart the DSH Web profile after removal so the composition no longer mounts the plugin.

If runtime settings remain in the DSH settings store, they are inert once the plugin is removed. Reinstalling the plugin may reuse the existing `dsh-persona` namespace values depending on how the local DSH settings store is retained.

## Development And Verification

Install dependencies and run the project checks:

```sh
pnpm install --frozen-lockfile
pnpm check
```

Verify package contents without publishing:

```sh
pnpm pack:dry-run
```

CI also packs the plugin, installs that tarball into a temporary DSH Web profile, starts `dsh web`, and fails if the server does not become reachable or exits early.

Useful local validation flow:

1. Install or link the plugin into a DSH Web profile.
2. Restart that DSH profile so the Cordis patch is mounted.
3. Open the existing DSH Web GUI, normally `http://127.0.0.1:3080`.
4. Confirm `Settings -> 插件 -> dsh-persona` shows the master switch.
5. Enable it and confirm `Settings -> 沟通风格` appears.
6. Disable it and confirm the dedicated `沟通风格` page disappears.
7. Re-enable it, choose a style, edit `shared`, then verify subsequent model requests reflect the style layer.

Do not validate this package by starting a replacement Vite server; DSH Web provides the runtime boot context for the plugin.

## Current Scope

Included now:

- global DSH style prompt layer;
- settings-backed runtime configuration in `dsh-persona`;
- DSH Web plugin configuration card with the master switch;
- dedicated DSH Web settings section that loads only while enabled;
- DSH-style custom dropdown for choosing a style;
- editable common prompt block with reset;
- read-only `friendly` and `pragmatic` style prompts;
- Chinese style labels `友好协作` and `务实直接`;
- no final injected-prompt preview in the settings UI.

Deferred until there is a concrete need:

- custom user-created styles;
- import/export of style packs;
- per-agent, per-session, or per-workspace overrides;
- prompt diff/history UI;
- memory or preference-learning features;
- richer browser E2E coverage against a running DSH profile.
