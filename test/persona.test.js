import assert from "node:assert/strict";

import {
  DEFAULT_PRESET,
  DEFAULT_SHARED_PROMPT,
  PERSONA_CATALOG,
  PRESET_IDS,
  PRESETS,
  normalizeSettings,
  renderPersonaPrompt
} from "../lib/persona.js";

assert.deepEqual(normalizeSettings(), {
  enabled: true,
  preset: "pragmatic",
  shared: DEFAULT_SHARED_PROMPT
});

assert.equal(normalizeSettings({ preset: "unknown" }).preset, "pragmatic");
assert.equal(renderPersonaPrompt({ enabled: false }), "");

assert.equal(
  renderPersonaPrompt({ preset: "friendly" }),
  `${DEFAULT_SHARED_PROMPT}\n\n${PRESETS.friendly.prompt}`
);

assert.equal(
  renderPersonaPrompt({ shared: " {{literal}} ", preset: "pragmatic" }).startsWith("{{literal}}\n\n"),
  true
);

assert.deepEqual(PRESET_IDS, ["friendly", "pragmatic"]);
assert.equal(DEFAULT_PRESET, "pragmatic");
assert.deepEqual(Object.keys(PRESETS).sort(), ["friendly", "pragmatic"]);
assert.deepEqual(PERSONA_CATALOG, {
  defaultPreset: DEFAULT_PRESET,
  defaultShared: DEFAULT_SHARED_PROMPT,
  presetIds: PRESET_IDS,
  presets: PRESETS
});

assert.equal(PRESETS.friendly.prompt.startsWith("# Style: Friendly"), true);
assert.equal(PRESETS.pragmatic.prompt.startsWith("# Style: Pragmatic"), true);
for (const heading of ["## Values", "## Escalation"]) {
  assert.equal(PRESETS.friendly.prompt.includes(heading), true);
  assert.equal(PRESETS.pragmatic.prompt.includes(heading), true);
}
assert.equal(PRESETS.friendly.prompt.includes("## Tone & User Experience"), true);
assert.equal(PRESETS.pragmatic.prompt.includes("## Interaction Style"), true);
assert.equal(PRESETS.friendly.prompt.includes("# Preset"), false);
assert.equal(PRESETS.pragmatic.prompt.includes("# Preset"), false);

for (const heading of [
  "## Working With The User",
  "## Final Answer Formatting Rules",
  "## Responsiveness",
  "## Planning",
  "## Presenting Your Work"
]) {
  assert.equal(DEFAULT_SHARED_PROMPT.includes(heading), true);
}

for (const preset of Object.values(PRESETS)) {
  for (const sharedHeading of [
    "Working With The User",
    "Final Answer Formatting Rules",
    "Responsiveness",
    "Planning",
    "Presenting Your Work"
  ]) {
    assert.equal(
      preset.prompt.includes(sharedHeading),
      false,
      `${preset.label} preset repeats shared section ${sharedHeading}`
    );
  }
}
