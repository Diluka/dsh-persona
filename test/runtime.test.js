import assert from "node:assert/strict";
import { test } from "node:test";
import { Context, Service } from "@deepseek-ai/cordis";
import { SystemPrompt, renderPrompt } from "@deepseek-ai/dsh-system-prompt";
import * as persona from "../lib/index.js";

class MemorySettings extends Service {
  presentations = new Map();

  constructor(ctx) {
    super(ctx, "settings");
  }

  configure(presentation, owner) {
    if (this.presentations.has(owner)) throw new Error("settings presentation already registered");
    const policy = { ...presentation };
    this.presentations.set(owner, policy);
    return () => {
      if (this.presentations.get(owner) === policy) this.presentations.delete(owner);
    };
  }
}

async function setup(t) {
  const ctx = new Context();
  t.after(() => ctx.fiber.dispose());
  await ctx.plugin(SystemPrompt, { personaPrefix: "Core guidance" });
  await ctx.plugin(MemorySettings);
  return ctx;
}

test("real Cordis prompt registry renders the volatile config and cleans up on unload", async (t) => {
  const ctx = await setup(t);
  const config = { preset: "friendly", shared: "Keep {{example}} literal" };
  const fiber = await ctx.plugin(persona, config);
  const prompt = ctx.get("systemPrompt");
  const assembly = await prompt.assemble();
  assert.equal(fiber.config.get().preset, "friendly");
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

test("settings form policy disables generated forms and unregisters on unload", async (t) => {
  const ctx = await setup(t);
  const config = { preset: "pragmatic", shared: "Composition default" };
  const fiber = await ctx.plugin(persona, config);
  const settings = ctx.get("settings");

  const schema = persona.SettingsSchema.toJSON();
  const schemaRoot = schema.refs[String(schema.uid)];
  assert.deepEqual(settings.presentations.get(fiber), { auto: false });
  assert.equal(schemaRoot.meta.volatile, true);
  assert.equal(fiber.config.get().shared, "Composition default");

  await fiber.dispose();
  assert.equal(settings.presentations.has(fiber), false);
});
