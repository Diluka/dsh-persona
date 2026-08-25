// @ts-check
import z from "@deepseek-ai/schemastery";
import { installSettingsSection, settingsNamespace } from "@deepseek-ai/dsh-settings";
import {
  DEFAULT_SHARED_PROMPT,
  PRESET_IDS,
  normalizeSettings,
  renderPersonaPrompt
} from "./persona.js";

export {
  DEFAULT_SHARED_PROMPT,
  PRESET_IDS,
  PRESETS,
  normalizeSettings,
  renderPersonaPrompt
} from "./persona.js";

/** @typedef {import("./persona.js").PersonaSettingsInput} PersonaSettingsInput */
/** @typedef {import("./persona.js").PersonaSettings} PersonaSettings */
/** @typedef {import("@deepseek-ai/cordis").Context & { systemPrompt: import("@deepseek-ai/dsh-system-prompt").SystemPrompt }} PersonaContext */

export const name = "dsh-persona";
export const inject = ["systemPrompt"];
export const SETTINGS_NAMESPACE = settingsNamespace("dsh-persona");
export const PROMPT_SECTION = "dsh-persona:style";
export const PROMPT_VARIABLE = "persona_style_prompt";
export const PROMPT_ORDER = 5;

export const SettingsSchema = z.object({
  enabled: z.boolean().default(true),
  preset: z.union(PRESET_IDS).default("pragmatic"),
  shared: z.string().default(DEFAULT_SHARED_PROMPT)
});

export const Config = SettingsSchema;

/**
 * Register a live prompt layer and its settings namespace.
 * @param {PersonaContext} ctx
 * @param {PersonaSettingsInput} config
 */
export function apply(ctx, config) {
  const entry = normalizeSettings(config);
  /** @type {() => PersonaSettings} */
  let source = () => entry;

  ctx.effect(() => ctx.systemPrompt.variable(PROMPT_VARIABLE, () => renderPersonaPrompt(source())), "dsh-persona.variable()");
  ctx.effect(() => ctx.systemPrompt.section({
    name: PROMPT_SECTION,
    order: PROMPT_ORDER,
    text: `{{${PROMPT_VARIABLE}}}`
  }), "dsh-persona.section()");

  installSettingsSection(ctx, SETTINGS_NAMESPACE, SettingsSchema, entry, {
    setSource(current) {
      source = () => normalizeSettings(current());
    },
    onChange() {}
  });
}
