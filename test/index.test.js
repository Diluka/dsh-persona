import assert from "node:assert/strict";

import {
  PERSONA_CATALOG,
  PROMPT_SECTION,
  PROMPT_VARIABLE,
  PROMPT_ORDER,
  SETTINGS_NAMESPACE,
  SettingsSchema,
  apply
} from "../lib/index.js";
import { PRESETS } from "../lib/persona.js";

function schemaRootMeta(schema) {
  const root = schema.refs[String(schema.uid)];
  return root.meta;
}

const config = {
  enabled: true,
  preset: "friendly",
  shared: "Shared guidance"
};
const resolved = { ...config };
const effects = [];
const rootDisposers = [];
const settingsWatches = [];
let variableProvider;
let sectionConfig;
let registration;

const scope = {
  get() {
    return resolved;
  },
  watch(callback) {
    settingsWatches.push(callback);
    return () => {};
  },
  update() {
    throw new Error("not used");
  },
  replace() {
    throw new Error("not used");
  }
};

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
  effect(factory, label) {
    effects.push(label);
    const dispose = factory();
    if (typeof dispose === "function") rootDisposers.push(dispose);
    return dispose;
  },
  inject(keys, callback) {
    assert.deepEqual(keys, ["settings"]);
    callback({
      settings: {
        installSection(owner, ns, schema, base, hooks) {
          registration = { owner, ns, schema, base };
          hooks.setSource(() => scope.get());
          hooks.onChange();
          scope.watch(() => hooks.onChange());
        }
      }
    });
  }
};

apply(ctx, config);

assert.equal(typeof variableProvider, "function");
assert.deepEqual(sectionConfig, {
  name: PROMPT_SECTION,
  order: PROMPT_ORDER,
  text: `{{${PROMPT_VARIABLE}}}`
});
assert.equal(registration.owner, ctx);
assert.equal(registration.ns, SETTINGS_NAMESPACE);
assert.deepEqual(schemaRootMeta(SettingsSchema.toJSON()).extra.dshPersonaCatalog, PERSONA_CATALOG);
assert.deepEqual(schemaRootMeta(registration.schema.toJSON()).extra.dshPersonaCatalog, PERSONA_CATALOG);
assert.deepEqual(registration.base, config);
assert.equal(settingsWatches.length, 1);
assert.equal(effects.includes("dsh-persona.variable()"), true);
assert.equal(effects.includes("dsh-persona.section()"), true);
assert.equal(rootDisposers.length, 2);
assert.equal(variableProvider(), `Shared guidance\n\n${PRESETS.friendly.prompt}`);

resolved.enabled = false;
assert.equal(variableProvider(), "");
