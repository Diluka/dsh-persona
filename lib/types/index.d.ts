import type { Context } from '@deepseek-ai/cordis';
import type { SystemPrompt } from '@deepseek-ai/dsh-system-prompt';
import type z from '@deepseek-ai/schemastery';

export type PersonaPreset = 'friendly' | 'pragmatic';

export interface PersonaSettingsInput {
  enabled?: boolean;
  preset?: PersonaPreset;
  shared?: string;
}

export interface PersonaSettings {
  enabled: boolean;
  preset: PersonaPreset;
  shared: string;
}

export interface PersonaDefinition {
  readonly label: string;
  readonly prompt: string;
}

export interface PersonaCatalog {
  readonly defaultPreset: PersonaPreset;
  readonly defaultShared: string;
  readonly presetIds: readonly PersonaPreset[];
  readonly presets: {
    readonly friendly: PersonaDefinition;
    readonly pragmatic: PersonaDefinition;
  };
}

export interface PersonaContext extends Context {
  systemPrompt: SystemPrompt;
}

export declare const name: 'dsh-persona';
export declare const inject: ['systemPrompt'];
export declare const SETTINGS_NAMESPACE: string;
export declare const PROMPT_SECTION: 'dsh-persona:style';
export declare const PROMPT_VARIABLE: 'persona_style_prompt';
export declare const PROMPT_ORDER: 5;

export declare const PRESET_IDS: readonly PersonaPreset[];
export declare const DEFAULT_PRESET: PersonaPreset;
export declare const DEFAULT_SHARED_PROMPT: string;
export declare const PRESETS: PersonaCatalog['presets'];
export declare const PERSONA_CATALOG: PersonaCatalog;
export declare const SettingsSchema: z<PersonaSettings>;
export declare const Config: z<PersonaSettings>;

export declare function normalizeSettings(value?: unknown): PersonaSettings;
export declare function renderPersonaPrompt(value?: unknown): string;
export declare function apply(ctx: PersonaContext, config: PersonaSettingsInput): void;
