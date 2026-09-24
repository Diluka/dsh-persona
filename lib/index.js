import z from "@deepseek-ai/schemastery";
import {
  DEFAULT_PRESET,
  DEFAULT_SHARED_PROMPT,
  PERSONA_CATALOG,
  PRESET_IDS,
  normalizeSettings,
  renderPersonaPrompt
} from "./persona.js";

export {
  DEFAULT_PRESET,
  DEFAULT_SHARED_PROMPT,
  PERSONA_CATALOG,
  PRESET_IDS,
  PRESETS,
  normalizeSettings,
  renderPersonaPrompt
} from "./persona.js";

/** @typedef {import("./persona.js").PersonaSettingsInput} PersonaSettingsInput */
/** @typedef {import("./persona.js").PersonaSettings} PersonaSettings */
/** @typedef {import("@deepseek-ai/cordis").Context & { systemPrompt: import("@deepseek-ai/dsh-system-prompt").SystemPrompt, settings: import("@deepseek-ai/dsh-settings").SettingsForms }} PersonaContext */

export const name = "dsh-persona";
export const inject = ["systemPrompt", "settings"];
export const SETTINGS_NAMESPACE = "dsh-persona";
export const PROMPT_SECTION = "dsh-persona:style";
export const PROMPT_VARIABLE = "persona_style_prompt";
export const PROMPT_ORDER = 5;

export const SettingsSchema = z.object({
  enabled: z.boolean().default(true),
  preset: z.union(PRESET_IDS).default(DEFAULT_PRESET),
  shared: z.string().default(DEFAULT_SHARED_PROMPT)
}).volatile().extra("extra", { dshPersonaCatalog: PERSONA_CATALOG });

export const Config = SettingsSchema;

/** @typedef {ReturnType<typeof SettingsSchema>} PersonaConfig */

/**
 * Register a live prompt layer and its settings namespace.
 * @param {PersonaContext} ctx
 * @param {PersonaConfig} config
 */
export function apply(ctx, config) {
  /** @type {() => PersonaSettings} */
  const source = () => normalizeSettings(config.get());

  ctx.effect(() => ctx.systemPrompt.variable(PROMPT_VARIABLE, () => renderPersonaPrompt(source())), "dsh-persona.variable()");
  ctx.effect(() => ctx.systemPrompt.section({
    name: PROMPT_SECTION,
    order: PROMPT_ORDER,
    text: `{{${PROMPT_VARIABLE}}}`
  }), "dsh-persona.section()");
  ctx.effect(() => ctx.settings.configure({ auto: false }, ctx.fiber), "dsh-persona.settingsForm()");
}
