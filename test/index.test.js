import assert from "node:assert/strict";

import {
  PERSONA_CATALOG,
  PROMPT_SECTION,
  PROMPT_VARIABLE,
  PROMPT_ORDER,
  SettingsSchema,
  apply
} from "../lib/index.js";
import { PRESETS } from "../lib/persona.js";

const resolved = {
  preset: "friendly",
  shared: "Shared guidance"
};
const config = { get: () => resolved };
const effects = [];
const rootDisposers = [];
let variableProvider;
let sectionConfig;
let settingsPresentation;


const ctx = {
  fiber: { state: 0 },
  systemPrompt: {
    variable(name, provider) {
      variableProvider = provider;
      assert.equal(name, PROMPT_VARIABLE);
      return () => {};
    },
    section(value) {
      sectionConfig = value;
      return () => {};
    }
  },
  settings: {
    configure(presentation, owner) {
      settingsPresentation = { presentation, owner };
      return () => { settingsPresentation = undefined; };
    }
  },
  effect(factory, label) {
    effects.push(label);
    const dispose = factory();
    if (typeof dispose === "function") rootDisposers.push(dispose);
    return dispose;
  }
};

apply(ctx, config);

assert.equal(typeof variableProvider, "function");
assert.deepEqual(sectionConfig, {
  name: PROMPT_SECTION,
  order: PROMPT_ORDER,
  text: `{{${PROMPT_VARIABLE}}}`
});
assert.deepEqual(settingsPresentation, { presentation: { auto: false }, owner: ctx.fiber });
const settingsSchema = SettingsSchema.toJSON();
const settingsRoot = settingsSchema.refs[String(settingsSchema.uid)];
assert.deepEqual(Object.keys(settingsRoot.dict).sort(), ["preset", "shared"]);
assert.deepEqual(settingsRoot.meta.extra.dshPersonaCatalog, PERSONA_CATALOG);
assert.equal(settingsRoot.meta.volatile, true);
assert.equal(effects.includes("dsh-persona.variable()"), true);
assert.equal(effects.includes("dsh-persona.section()"), true);
assert.equal(effects.includes("dsh-persona.settingsForm()"), true);
assert.equal(rootDisposers.length, 3);
assert.equal(variableProvider(), `Shared guidance\n\n${PRESETS.friendly.prompt}`);

resolved.preset = "pragmatic";
resolved.shared = "Updated guidance";
assert.equal(variableProvider(), `Updated guidance\n\n${PRESETS.pragmatic.prompt}`);
for (const dispose of rootDisposers) dispose();
assert.equal(settingsPresentation, undefined);
