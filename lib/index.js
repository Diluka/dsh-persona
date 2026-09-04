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
/** @typedef {import("@deepseek-ai/cordis").Context & { systemPrompt: import("@deepseek-ai/dsh-system-prompt").SystemPrompt }} PersonaContext */
/** @typedef {import("@deepseek-ai/cordis").Context & { settings: import("@deepseek-ai/dsh-settings").SettingsProvider }} PersonaSettingsContext */

export const name = "dsh-persona";
export const inject = ["systemPrompt"];
export const SETTINGS_NAMESPACE = "dsh-persona";
export const PROMPT_SECTION = "dsh-persona:style";
export const PROMPT_VARIABLE = "persona_style_prompt";
export const PROMPT_ORDER = 5;

export const SettingsSchema = z.object({
  enabled: z.boolean().default(true),
  preset: z.union(PRESET_IDS).default(DEFAULT_PRESET),
  shared: z.string().default(DEFAULT_SHARED_PROMPT)
}).extra("extra", { dshPersonaCatalog: PERSONA_CATALOG });

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

  ctx.inject(["settings"], (settingsCtx) => {
    const settings = /** @type {PersonaSettingsContext} */ (settingsCtx).settings;
    settings.installSection(ctx, SETTINGS_NAMESPACE, SettingsSchema, entry, {
      setSource(current) {
        source = () => normalizeSettings(current());
      },
      onChange() {}
    });
  });
}
