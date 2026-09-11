import assert from "node:assert/strict";
import { test } from "node:test";
import { Context } from "@deepseek-ai/cordis";
import { SettingsProvider } from "@deepseek-ai/dsh-settings";
import { SystemPrompt, renderPrompt } from "@deepseek-ai/dsh-system-prompt";
import * as persona from "../lib/index.js";

class MemorySettings extends SettingsProvider {
  writable = true;

  async load() {
    return {};
  }

  async persist() {}
}

async function setup(t) {
  const ctx = new Context();
  t.after(() => ctx.fiber.dispose());
  await ctx.plugin(SystemPrompt, { personaPrefix: "Core guidance" });
  return ctx;
}

test("real prompt registry renders literal shared text and cleans up on unload", async (t) => {
  const ctx = await setup(t);
  const config = { preset: "friendly", shared: "Keep {{example}} literal" };
  const fiber = await ctx.plugin(persona, config);
  const prompt = ctx.get("systemPrompt");
  const assembly = await prompt.assemble();
  assert.equal(assembly.sections.some((section) => section.name === persona.PROMPT_SECTION), true);
  assert.equal(renderPrompt(assembly), `You are an AI agent powered by DeepSeek Harness.\n\nCore guidance\n\n${persona.renderPersonaPrompt(config)}`);

  await fiber.dispose();
  const unloaded = await prompt.assemble();
  assert.equal(unloaded.sections.some((section) => section.name === persona.PROMPT_SECTION), false);
  assert.equal(Object.hasOwn(unloaded.variables, persona.PROMPT_VARIABLE), false);
});

test("complete-prompt presets retain authority over additional style sections", async (t) => {
  const ctx = await setup(t);
  await ctx.plugin(persona, { shared: "Additional style" });
  await ctx.plugin({
    inject: ["systemPrompt"],
    apply(ctx) {
      ctx.systemPrompt.section({ name: "test:complete", order: 0, text: "Complete preset", complete: true });
    }
  });
  assert.equal(renderPrompt(await ctx.get("systemPrompt").assemble()), "Complete preset");
});

test("real settings provider updates, disables, resets, and unregisters the style layer", async (t) => {
  const ctx = await setup(t);
  await ctx.plugin(MemorySettings);
  const config = { preset: "friendly", shared: "Composition default" };
  const fiber = await ctx.plugin(persona, config);
  const settings = ctx.get("settings");
  const prompt = ctx.get("systemPrompt");
  const style = async () => (await prompt.assemble()).variables[persona.PROMPT_VARIABLE];
  assert.equal(settings.describe()[0].ns, persona.SETTINGS_NAMESPACE);
  assert.equal(await style(), persona.renderPersonaPrompt(config));

  await settings.update(persona.SETTINGS_NAMESPACE, { preset: "pragmatic", shared: "User override" });
  assert.equal(await style(), persona.renderPersonaPrompt({ preset: "pragmatic", shared: "User override" }));
  await settings.update(persona.SETTINGS_NAMESPACE, { enabled: false });
  assert.equal(await style(), "");
  assert.equal(renderPrompt(await prompt.assemble()).includes("User override"), false);
  await settings.replace(persona.SETTINGS_NAMESPACE, {});
  assert.equal(await style(), persona.renderPersonaPrompt(config));

  await fiber.dispose();
  assert.equal(settings.get(persona.SETTINGS_NAMESPACE), undefined);
  assert.equal(settings.describe().length, 0);
});

test("optional settings can attach late and detach back to composition defaults", async (t) => {
  const ctx = await setup(t);
  const config = { shared: "Fallback guidance" };
  await ctx.plugin(persona, config);
  const provider = await ctx.plugin(MemorySettings);
  const settings = ctx.get("settings");
  const prompt = ctx.get("systemPrompt");
  await settings.update(persona.SETTINGS_NAMESPACE, { shared: "Live guidance" });
  assert.equal((await prompt.assemble()).variables[persona.PROMPT_VARIABLE], persona.renderPersonaPrompt({ shared: "Live guidance" }));

  await provider.dispose();
  assert.equal((await prompt.assemble()).variables[persona.PROMPT_VARIABLE], persona.renderPersonaPrompt(config));
});
