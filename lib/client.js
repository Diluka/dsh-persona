/// <reference path="./types/client.d.ts" />

window.__ModuleLoader__.load({
  id: "dsh-persona",
  factory: (require) => {
    /** @type {{ exports: Record<string, unknown> }} */
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    /** @type {typeof import("react")} */
    const React = /** @type {typeof import("react")} */ (require("react"));
    const { IconChevronDownOutline14 } = /** @type {{ IconChevronDownOutline14: import("react").ComponentType<{ className?: string }> }} */ (require("@deepseek-ai/dsh-client-ui-primitives"));
    const h = React.createElement;

    /** @typedef {string} PresetId */
    /** @typedef {{ readonly label: string, readonly prompt: string }} PresetDefinition */
    /** @typedef {{ readonly defaultPreset: PresetId, readonly defaultShared: string, readonly presetIds: readonly PresetId[], readonly presets: Record<string, PresetDefinition> }} PersonaCatalog */
    /** @typedef {{ enabled: boolean, preset: PresetId, shared: string }} PersonaSettings */
    /** @typedef {{ status: string, value?: unknown, base?: unknown, user?: unknown, revision?: number, writable: boolean }} ScopeSnapshot */
    /** @typedef {{ status: string, view?: { writable: boolean, namespaces: Array<{ ns: string, schema: unknown }> } }} MirrorSnapshot */
    /** @typedef {{ getSnapshot(): MirrorSnapshot, subscribe(listener: () => void): () => void, ensure(): Promise<void> }} SettingsDescribeFace */
    /** @typedef {{ getSnapshot(): ScopeSnapshot, subscribe(listener: () => void): () => void, set(field: string, value: unknown): Promise<void>, unset(field: string): Promise<void> }} SettingsScope */
    /** @typedef {(key: string) => string} Translate */
    /** @typedef {{ t?: Translate, scope: SettingsScope, catalogSource: SettingsDescribeFace }} SectionProps */
    /** @typedef {{ slots: { inject(name: string, factory: () => () => void): () => void, register(options: Record<string, unknown>, component: unknown): () => void }, locale: { register(ns: string, messages: { zh: Record<string, string>, en: Record<string, string> }): () => void, bind(ns: string): Translate }, settingsScope: { bind(spec: { namespace: string }): SettingsScope, describe(): SettingsDescribeFace }, effect(register: () => (() => void), label?: string): void }} ClientContext */

    const SETTINGS_NAMESPACE = "dsh-persona";
    const CATALOG_META_KEY = "dshPersonaCatalog";
    const REPOSITORY_URL = "https://github.com/Diluka/dsh-persona";

    const zh = /** @type {Record<string, string>} */ ({
      nav: "沟通风格",
      title: "助手沟通风格",
      intro: "选择内置风格并查看完整只读提示词；共通部分放在页面最后供编辑。总开关在插件配置页。",
      loading: "正在读取设置...",
      unavailable: "当前连接不能编辑本地设置。请在本机 loopback 页面打开设置。",
      readOnly: "本部署的设置为只读。",
      expand: "展开设置",
      collapse: "收起设置",
      discard: "放弃修改",
      unsaved: "未保存",
      saveFailed: "本部署没有接受这些值，已保留供你修改。",
      pluginTitle: "沟通风格",
      pluginDescription: "控制是否加载独立配置页，并向系统提示词追加沟通风格层。",
      enabled: "启用沟通风格",
      enabledHint: "关闭后不会加载独立的“沟通风格”设置页，也不会追加这层系统提示词。",
      preset: "选择风格",
      presetHint: "选择内置风格；下方直接展示完整的只读提示词。",
      shared: "共通提示词",
      sharedHint: "所有风格都会先拼接这一段。默认内容聚焦 DSH Web 中的工作呈现、文件引用、验证状态和下一步。",
      presetPreview: "风格提示词",
      save: "保存",
      saving: "保存中…",
      resetShared: "恢复默认共通提示词",
      saved: "保存后会在下一次模型请求组装系统提示词时生效。",
      dirty: "有未保存修改",
      overrides: "已覆盖字段：",
      none: "无",
      friendly: "友好协作",
      pragmatic: "务实直接"
    });
    const en = /** @type {Record<string, string>} */ ({
      nav: "Communication",
      title: "Assistant Communication Style",
      intro: "Choose a built-in style and review its complete read-only prompt; edit the shared prompt at the end. The master switch lives on the plugin configuration page.",
      loading: "Loading settings...",
      unavailable: "This connection cannot edit local settings. Open the loopback page on the host machine.",
      readOnly: "This deployment stores settings read-only.",
      expand: "Show settings",
      collapse: "Hide settings",
      discard: "Discard",
      unsaved: "Unsaved",
      saveFailed: "The deployment did not accept these values; they were left for you to correct.",
      pluginTitle: "Communication Style",
      pluginDescription: "Controls whether the dedicated settings page loads and whether the style layer is appended to the system prompt.",
      enabled: "Enable communication style",
      enabledHint: "When disabled, the dedicated Communication settings page is not loaded and no style layer is appended.",
      preset: "Choose style",
      presetHint: "Choose a built-in style; the complete read-only prompt is displayed directly below.",
      shared: "Shared prompt",
      sharedHint: "This block is prepended to every style. The default focuses on work presentation: keep the user informed about progress, evidence, and next steps.",
      presetPreview: "Style prompt",
      save: "Save changes",
      saving: "Saving...",
      resetShared: "Reset shared prompt",
      saved: "Saved changes apply the next time a model request assembles the system prompt.",
      dirty: "Unsaved changes",
      overrides: "Overridden fields:",
      none: "none",
      friendly: "Friendly",
      pragmatic: "Pragmatic"
    });

    const css = `
      .dshPersonaPage {
        box-sizing:border-box;
        max-width:820px;
        color:var(--dsw-alias-label-primary,#172033);
        display:flex;
        flex-direction:column;
        gap:14px;
      }

      .dshPersonaHero {
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:linear-gradient(135deg,var(--dsw-alias-bg-layer-1,#fff),var(--dsw-alias-bg-layer-2,#f6f8fb));
        border-radius:18px;
        padding:18px;
      }

      .dshPersonaTitle {
        margin:0 0 6px;
        font-size:20px;
        font-weight:650;
        line-height:1.3;
      }

      .dshPersonaIntro {
        color:var(--dsw-alias-label-secondary,#667085);
        margin:0;
        font-size:13px;
        line-height:1.6;
      }

      .dshPersonaActions {
        position:sticky;
        top:0;
        z-index:2;
        align-items:center;
        gap:10px;
        display:flex;
        flex-wrap:wrap;
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:var(--dsw-alias-bg-layer-1,#fff);
        border-radius:14px;
        padding:10px 12px;
        box-shadow:0 8px 24px rgba(15,23,42,.08);
      }

      .dshPersonaButton {
        appearance:none;
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:var(--dsw-alias-bg-layer-2,#f6f8fb);
        color:var(--dsw-alias-label-primary,#172033);
        border-radius:10px;
        cursor:pointer;
        font:inherit;
        font-size:13px;
        line-height:1.4;
        padding:8px 14px;
      }

      .dshPersonaButtonPrimary {
        border-color:#2563eb;
        background:#2563eb;
        color:#fff;
      }

      .dshPersonaButton:disabled {
        cursor:default;
        opacity:1;
        color:var(--dsw-alias-label-secondary,#94a3b8);
        background:rgba(148,163,184,.08);
      }

      .dshPersonaButtonPrimary:disabled {
        border-color:rgba(148,163,184,.24);
        background:rgba(148,163,184,.08);
        color:var(--dsw-alias-label-secondary,#94a3b8);
        opacity:1;
        box-shadow:none;
      }

      .dshPersonaMeta {
        color:var(--dsw-alias-label-secondary,#667085);
        font-size:12px;
        line-height:1.5;
      }

      .dshPersonaForm {
        display:flex;
        flex-direction:column;
        gap:14px;
      }

      .dshPersonaRow {
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:var(--dsw-alias-bg-layer-1,#fff);
        border-radius:14px;
        padding:14px;
      }

      .dshPersonaInline {
        align-items:center;
        justify-content:space-between;
        gap:12px;
        display:flex;
      }

      .dshPersonaLabel {
        color:var(--dsw-alias-label-primary,#172033);
        font-size:13px;
        font-weight:600;
        line-height:1.5;
      }

      .dshPersonaHint {
        color:var(--dsw-alias-label-secondary,#667085);
        margin:6px 0 0;
        font-size:12px;
        line-height:1.5;
      }

      .dshPersonaTextarea {
        box-sizing:border-box;
        width:100%;
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:var(--dsw-alias-bg-layer-2,#f6f8fb);
        color:var(--dsw-alias-label-primary,#172033);
        border-radius:10px;
        font:inherit;
        font-size:13px;
        line-height:1.5;
      }

      .dshPersonaTextarea {
        min-height:190px;
        margin-top:8px;
        padding:10px 12px;
        resize:vertical;
      }

      .dshPersonaPreview {
        white-space:pre-wrap;
        max-height:260px;
        overflow:auto;
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:var(--dsw-alias-bg-layer-2,#f6f8fb);
        border-radius:12px;
        margin:8px 0 0;
        padding:12px;
        font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
        font-size:12px;
        line-height:1.55;
      }

      .dshPersonaPresetPreview {
        max-height:180px;
      }

      .dshPersonaBadge {
        background:var(--dsw-alias-bg-layer-2,#f6f8fb);
        color:var(--dsw-alias-label-secondary,#667085);
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        border-radius:999px;
        padding:2px 8px;
        font-size:11px;
        line-height:17px;
      }

      .dshPersonaSwitch {
        width:42px;
        height:24px;
        position:relative;
        display:inline-flex;
      }

      .dshPersonaSwitch input {
        opacity:0;
        width:0;
        height:0;
      }

      .dshPersonaSlider {
        position:absolute;
        cursor:pointer;
        inset:0;
        background:var(--dsw-alias-border-l2,#d5dbe7);
        border-radius:999px;
        transition:.16s;
      }

      .dshPersonaSlider:before {
        content:"";
        position:absolute;
        width:18px;
        height:18px;
        left:3px;
        top:3px;
        background:var(--dsw-alias-bg-layer-1,#fff);
        border-radius:50%;
        transition:.16s;
        box-shadow:0 1px 3px rgba(15,23,42,.25);
      }

      .dshPersonaSwitch input:checked+.dshPersonaSlider {
        background:#2563eb;
      }

      .dshPersonaSwitch input:checked+.dshPersonaSlider:before {
        transform:translateX(18px);
      }

      .dshPersonaDropdown {
        position:relative;
        margin-top:8px;
      }

      .dshPersonaDropdownTrigger {
        appearance:none;
        width:100%;
        height:38px;
        align-items:center;
        justify-content:space-between;
        gap:8px;
        display:flex;
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:var(--dsw-alias-bg-layer-2,#f6f8fb);
        color:var(--dsw-alias-label-primary,#172033);
        border-radius:10px;
        font:inherit;
        font-size:13px;
        line-height:1.5;
        padding:0 10px;
        cursor:pointer;
      }

      .dshPersonaDropdownTrigger:hover:not(:disabled),.dshPersonaDropdownTrigger[data-open=true] {
        border-color:var(--dsw-alias-label-dimmed,var(--dsw-alias-border-l2,#d5dbe7));
      }

      .dshPersonaDropdownTrigger:focus-visible {
        border-color:var(--dsw-alias-brand-primary,#2563eb);
        outline:none;
      }

      .dshPersonaDropdownTrigger:disabled {
        cursor:default;
        color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary,#667085));
      }

      .dshPersonaDropdownMenu {
        position:absolute;
        z-index:6;
        top:calc(100% + 6px);
        left:0;
        right:0;
        border:1px solid var(--dsw-alias-border-l2,#d5dbe7);
        background:var(--dsw-alias-bg-layer-1,#fff);
        border-radius:12px;
        padding:6px;
        box-shadow:0 16px 36px rgba(15,23,42,.18);
      }

      .dshPersonaDropdownOption {
        appearance:none;
        width:100%;
        text-align:left;
        border:0;
        background:transparent;
        color:var(--dsw-alias-label-primary,#172033);
        border-radius:8px;
        cursor:pointer;
        font:inherit;
        font-size:13px;
        line-height:1.5;
        padding:8px 10px;
      }

      .dshPersonaDropdownOption:hover,.dshPersonaDropdownOption[data-selected=true] {
        background:var(--dsw-alias-bg-layer-2,#f6f8fb);
      }

      .dshPersonaDropdownOption[data-selected=true] {
        font-weight:600;
      }

      .dshPersonaChevron {
        color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary,#667085));
        transition:transform .16s;
      }

      .dshPersonaChevronOpen {
        transform:rotate(180deg);
      }

      .dshPersonaPluginCard {
        border:1px solid var(--dsw-alias-border-l2);
        background:var(--dsw-alias-bg-layer-3);
        border-radius:12px;
        list-style:none;
        transition:border-color .16s,background .16s;
      }

      .dshPersonaPluginCard:hover {
        border-color:var(--dsw-alias-label-dimmed);
      }

      .dshPersonaPluginCardOpen {
        background:var(--dsw-alias-bg-layer-2);
        border-color:var(--dsw-alias-label-dimmed);
      }

      .dshPersonaPluginHeader {
        width:100%;
        font:inherit;
        color:inherit;
        text-align:left;
        background:0 0;
        border:0;
        border-radius:12px;
        align-items:center;
        gap:12px;
        padding:14px 16px;
        display:flex;
      }

      .dshPersonaPluginHeaderButton {
        appearance:none;
        font:inherit;
        text-align:left;
        cursor:pointer;
        background:0 0;
        border:0;
        padding:0;
      }

      .dshPersonaPluginChevronButton {
        appearance:none;
        cursor:pointer;
        background:0 0;
        border:0;
        padding:0;
        color:inherit;
        display:flex;
        align-items:center;
      }

      .dshPersonaPluginHeaderButton:focus-visible,.dshPersonaPluginChevronButton:focus-visible {
        outline:2px solid var(--dsw-alias-brand-primary);
        outline-offset:2px;
        border-radius:4px;
      }

      .dshPersonaPluginText {
        flex-direction:column;
        flex:1;
        gap:4px;
        min-width:0;
        display:flex;
      }

      .dshPersonaPluginHeading {
        align-items:center;
        gap:8px;
        min-width:0;
        display:flex;
        flex-wrap:wrap;
      }

      .dshPersonaPluginTitle {
        color:var(--dsw-alias-label-primary);
        font-size:15px;
        font-weight:600;
        line-height:1.4;
      }

      .dshPersonaPluginRepo {
        color:var(--dsw-alias-label-tertiary);
        font-size:13px;
        line-height:1.4;
        text-decoration:none;
      }

      .dshPersonaPluginRepo:hover {
        color:var(--dsw-alias-label-primary);
        text-decoration:underline;
      }

      .dshPersonaPluginDescription {
        color:var(--dsw-alias-label-tertiary);
        font-size:13px;
        line-height:1.5;
      }

      .dshPersonaPluginChevron {
        color:var(--dsw-alias-label-tertiary);
        flex:none;
        transition:transform .16s;
      }

      .dshPersonaPluginChevronOpen {
        transform:rotate(180deg);
      }

      .dshPersonaPluginBody {
        border-top:1px solid var(--dsw-alias-border-l2);
        margin:0 16px;
        padding-bottom:8px;
      }

      .dshPersonaPluginReadOnly {
        color:var(--dsw-alias-label-tertiary);
        margin:12px 0 0;
        font-size:12px;
        line-height:1.5;
      }

      .dshPersonaPluginPending {
        white-space:nowrap;
        background:var(--dsw-alias-bg-module-platform);
        color:var(--dsw-alias-label-secondary);
        border-radius:999px;
        flex:none;
        padding:1px 8px;
        font-size:11px;
        font-weight:500;
        line-height:17px;
      }

      .dshPersonaPluginRow {
        align-items:center;
        justify-content:space-between;
        gap:12px;
        padding:12px 0;
        display:flex;
      }

      .dshPersonaPluginFooter {
        border-top:1px solid var(--dsw-alias-border-l2);
        justify-content:flex-end;
        align-items:center;
        gap:8px;
        padding:12px 0 4px;
        display:flex;
      }

      .dshPersonaPluginFailed {
        min-width:0;
        color:var(--dsw-alias-label-error);
        flex:1;
        margin:0;
        font-size:12px;
        line-height:1.5;
      }

      .dshPersonaPluginDiscard,.dshPersonaPluginSave {
        appearance:none;
        font:inherit;
        cursor:pointer;
        border:1px solid #0000;
        border-radius:8px;
        padding:5px 14px;
        font-size:13px;
        line-height:1.5;
      }

      .dshPersonaPluginDiscard {
        border-color:var(--dsw-alias-border-l2);
        color:var(--dsw-alias-label-secondary);
        background:0 0;
      }

      .dshPersonaPluginDiscard:hover:not(:disabled) {
        color:var(--dsw-alias-label-primary);
        border-color:var(--dsw-alias-label-dimmed);
      }

      .dshPersonaPluginSave {
        background:var(--dsw-alias-label-primary);
        color:var(--dsw-alias-bg-layer-3);
      }

      .dshPersonaPluginDiscard:disabled,.dshPersonaPluginSave:disabled {
        opacity:.4;
        cursor:default;
      }

      .dshPersonaPluginDiscard:focus-visible,.dshPersonaPluginSave:focus-visible {
        outline:2px solid var(--dsw-alias-brand-primary);
        outline-offset:1px;
      }

      @media(max-width:720px) {
        .dshPersonaInline {
          align-items:flex-start;
          flex-direction:column;
        }

        .dshPersonaActions {
          position:static;
          align-items:stretch;
          flex-direction:column;
        }

        .dshPersonaButton {
          width:100%;
        }
      }
    `;
    function installStyles() {
      if (typeof document === "undefined") return () => {};
      const tagId = "dsh-persona/style";
      const selector = `style[data-plugin-css=${JSON.stringify(tagId)}]`;
      const existing = document.querySelector(selector);
      const tag = existing instanceof HTMLStyleElement ? existing : document.createElement("style");
      tag.dataset.plugin = "dsh-persona";
      tag.dataset.pluginCss = tagId;
      tag.textContent = css;
      if (tag.parentNode === null) document.head.appendChild(tag);
      return () => tag.remove();
    }

    /** @param {unknown} value @returns {value is Record<string, unknown>} */
    function isRecord(value) {
      return typeof value === "object" && value !== null && !Array.isArray(value);
    }

    /** @param {unknown} value @returns {PresetDefinition | undefined} */
    function decodePreset(value) {
      if (!isRecord(value) || typeof value.label !== "string" || typeof value.prompt !== "string") return undefined;
      return { label: value.label, prompt: value.prompt };
    }

    /** @param {unknown} value @returns {PersonaCatalog | undefined} */
    function decodeCatalog(value) {
      if (!isRecord(value) || typeof value.defaultPreset !== "string" || typeof value.defaultShared !== "string" || !Array.isArray(value.presetIds) || !isRecord(value.presets)) return undefined;
      const sourcePresets = value.presets;
      /** @type {Record<string, PresetDefinition>} */
      const presets = {};
      const presetIds = value.presetIds.filter((id) => {
        if (typeof id !== "string") return false;
        const preset = decodePreset(sourcePresets[id]);
        if (preset === undefined) return false;
        presets[id] = preset;
        return true;
      });
      if (presetIds.length === 0 || !presetIds.includes(value.defaultPreset)) return undefined;
      return { defaultPreset: value.defaultPreset, defaultShared: value.defaultShared, presetIds, presets };
    }

    /** @param {unknown} schema @returns {Record<string, unknown> | undefined} */
    function schemaRootMeta(schema) {
      if (!isRecord(schema) || !isRecord(schema.refs)) return undefined;
      const root = schema.refs[String(schema.uid)];
      return isRecord(root) && isRecord(root.meta) ? root.meta : undefined;
    }

    /** @param {MirrorSnapshot} snapshot @returns {PersonaCatalog | undefined} */
    function catalogFromMirror(snapshot) {
      const namespaces = snapshot.view?.namespaces;
      if (!Array.isArray(namespaces)) return undefined;
      const namespace = namespaces.find((entry) => entry.ns === SETTINGS_NAMESPACE);
      const meta = namespace === undefined ? undefined : schemaRootMeta(namespace.schema);
      const extra = meta !== undefined && isRecord(meta.extra) ? meta.extra : undefined;
      return extra === undefined ? undefined : decodeCatalog(extra[CATALOG_META_KEY]);
    }

    /** @param {unknown} value @returns {boolean} */
    function enabledFrom(value) {
      const record = isRecord(value) ? value : {};
      return typeof record.enabled === "boolean" ? record.enabled : true;
    }

    /** @param {unknown} value @param {PersonaCatalog} catalog @returns {value is PresetId} */
    function isPreset(value, catalog) {
      return typeof value === "string" && catalog.presetIds.includes(value);
    }

    /** @param {unknown} value @param {string} fallback @returns {string} */
    function stringField(value, fallback) {
      return typeof value === "string" ? value : fallback;
    }

    /** @param {unknown} value @param {PersonaCatalog} catalog @returns {PersonaSettings} */
    function normalize(value, catalog) {
      const record = isRecord(value) ? value : {};
      return {
        enabled: enabledFrom(record),
        preset: isPreset(record.preset, catalog) ? record.preset : catalog.defaultPreset,
        shared: stringField(record.shared, catalog.defaultShared)
      };
    }

    /** @template T @typedef {{ getSnapshot(): T, subscribe(listener: () => void): () => void }} SnapshotStore */

    /** @template T @param {SnapshotStore<T>} store @returns {T} */
    function useStoreSnapshot(store) {
      return React.useSyncExternalStore(
        store.subscribe.bind(store),
        store.getSnapshot.bind(store),
        store.getSnapshot.bind(store)
      );
    }

    /** @param {PersonaSettings} a @param {PersonaSettings} b @returns {boolean} */
    function sameSettings(a, b) {
      return a.enabled === b.enabled && a.preset === b.preset && a.shared === b.shared;
    }

    /** @param {unknown} user @returns {string[]} */
    function overrideFields(user) {
      return isRecord(user) ? Object.keys(user).filter((key) => ["enabled", "preset", "shared"].includes(key)) : [];
    }

    /** @param {ScopeSnapshot} snapshot @param {keyof PersonaSettings} field @returns {boolean} */
    function isOverridden(snapshot, field) {
      return isRecord(snapshot.user) && Object.hasOwn(snapshot.user, field);
    }

    /** @param {SettingsScope} scope @param {ScopeSnapshot} snapshot @param {keyof PersonaSettings} field @param {PersonaSettings[keyof PersonaSettings]} value @param {PersonaSettings[keyof PersonaSettings]} inherited */
    async function writeInheritedSettingField(scope, snapshot, field, value, inherited) {
      if (value === inherited && isOverridden(snapshot, field)) await scope.unset(field);
      else await scope.set(field, value);
    }

    /** @param {PresetId} id @param {Translate} t @param {PersonaCatalog} catalog @returns {string} */
    function presetLabel(id, t, catalog) {
      const translated = t(id);
      return translated === id ? catalog.presets[id]?.label ?? id : translated;
    }

    /** @param {unknown} error @returns {string} */
    function messageOf(error) {
      return error instanceof Error ? error.message : String(error);
    }

    /** @typedef {{ title: string, intro: string }} HeroPanelProps */
    /** @param {HeroPanelProps} props @returns {import("react").ReactElement} */
    function HeroPanel(props) {
      return h("div", { className: "dshPersonaHero" },
        h("h2", { className: "dshPersonaTitle" }, props.title),
        h("p", { className: "dshPersonaIntro" }, props.intro)
      );
    }

    /** @typedef {{ children?: import("react").ReactNode, inline?: boolean, as?: "div" | "label" }} PanelProps */
    /** @param {PanelProps} props @returns {import("react").ReactElement} */
    function Panel(props) {
      const Tag = props.as ?? "div";
      const className = props.inline ? "dshPersonaRow dshPersonaInline" : "dshPersonaRow";
      return h(Tag, { className }, props.children);
    }

    /** @typedef {{ label: string, hint?: string, children?: import("react").ReactNode, inline?: boolean, as?: "div" | "label" }} FieldRowProps */
    /** @param {FieldRowProps} props @returns {import("react").ReactElement} */
    function FieldRow(props) {
      const LabelTag = props.as === "label" ? "span" : "div";
      const labelNode = h(LabelTag, { className: "dshPersonaLabel" }, props.label);
      const hintNode = props.hint ? h("p", { className: "dshPersonaHint" }, props.hint) : null;
      if (props.inline) {
        return h(Panel, { inline: true, as: props.as },
          h("div", null, labelNode, hintNode),
          props.children
        );
      }
      return h(Panel, { as: props.as }, labelNode, hintNode, props.children);
    }

    /** @typedef {{ dirty: boolean, disabled: boolean, saving: boolean, sharedIsDefault: boolean, overrides: string[], t: Translate, onSave: () => void, onResetShared: () => void }} ActionBarProps */
    /** @param {ActionBarProps} props @returns {import("react").ReactElement} */
    function ActionBar(props) {
      return h("div", { className: "dshPersonaActions" },
        h("button", { type: "button", className: "dshPersonaButton dshPersonaButtonPrimary", disabled: props.disabled || !props.dirty, onClick: props.onSave }, props.saving ? props.t("saving") : props.t("save")),
        h("button", { type: "button", className: "dshPersonaButton", disabled: props.disabled || props.sharedIsDefault, onClick: props.onResetShared }, props.t("resetShared")),
        props.dirty ? h("span", { className: "dshPersonaBadge" }, props.t("dirty")) : null,
        h("span", { className: "dshPersonaMeta" }, `${props.t("overrides")} ${props.overrides.length === 0 ? props.t("none") : props.overrides.join(", ")}`)
      );
    }

    /** @typedef {{ checked: boolean, disabled: boolean, onChange: (event: import("react").ChangeEvent<HTMLInputElement>) => void }} SwitchControlProps */
    /** @param {SwitchControlProps} props @returns {import("react").ReactElement} */
    function SwitchControl(props) {
      return h("label", { className: "dshPersonaSwitch" },
        h("input", { type: "checkbox", checked: props.checked, disabled: props.disabled, onChange: props.onChange }),
        h("span", { className: "dshPersonaSlider" })
      );
    }

    /** @typedef {{ value: PresetId, disabled: boolean, t: Translate, catalog: PersonaCatalog, onChange: (value: PresetId) => void }} PresetSelectProps */
    /** @param {PresetSelectProps} props @returns {import("react").ReactElement} */
    function PresetSelect(props) {
      const [open, setOpen] = React.useState(false);
      const label = presetLabel(props.value, props.t, props.catalog);
      function toggle() {
        if (!props.disabled) setOpen((value) => !value);
      }
      /** @param {PresetId} id */
      function choose(id) {
        props.onChange(id);
        setOpen(false);
      }
      return h("div", { className: "dshPersonaDropdown" },
        h("button", { type: "button", className: "dshPersonaDropdownTrigger", disabled: props.disabled, "data-open": open ? "true" : undefined, "aria-haspopup": "listbox", "aria-expanded": open, onClick: toggle },
          h("span", null, label),
          h("span", { className: open ? "dshPersonaChevron dshPersonaChevronOpen" : "dshPersonaChevron", "aria-hidden": true }, "⌄")
        ),
        open ? h("div", { className: "dshPersonaDropdownMenu", role: "listbox" },
          props.catalog.presetIds.map((id) => h("button", { key: id, type: "button", role: "option", className: "dshPersonaDropdownOption", "aria-selected": id === props.value, "data-selected": id === props.value ? "true" : undefined, onClick: () => choose(id) }, presetLabel(id, props.t, props.catalog)))
        ) : null
      );
    }

    /** @typedef {{ value: string, disabled: boolean, onChange: (event: import("react").ChangeEvent<HTMLTextAreaElement>) => void }} PromptTextareaProps */
    /** @param {PromptTextareaProps} props @returns {import("react").ReactElement} */
    function PromptTextarea(props) {
      return h("textarea", { className: "dshPersonaTextarea", value: props.value, disabled: props.disabled, onChange: props.onChange });
    }

    /** @typedef {{ title: string, prompt: string }} PresetPreviewProps */
    /** @param {PresetPreviewProps} props @returns {import("react").ReactElement} */
    function PresetPreview(props) {
      return h(Panel, null,
        h("span", { className: "dshPersonaLabel" }, props.title),
        h("pre", { className: "dshPersonaPreview dshPersonaPresetPreview" }, props.prompt)
      );
    }

    /** @typedef {{ t: Translate, scope: SettingsScope }} PluginConfigCardProps */
    /** @param {PluginConfigCardProps} props @returns {import("react").ReactElement | null} */
    function PluginConfigCard(props) {
      const snapshot = useStoreSnapshot(props.scope);
      const enabled = enabledFrom(snapshot.value);
      const inheritedEnabled = enabledFrom(snapshot.base);
      const [open, setOpen] = React.useState(false);
      const [draftEnabled, setDraftEnabled] = React.useState(/** @type {boolean | null} */ (null));
      const [saving, setSaving] = React.useState(false);
      const [failed, setFailed] = React.useState(false);
      const effectiveDraftEnabled = draftEnabled ?? enabled;
      const dirty = effectiveDraftEnabled !== enabled;
      const disabled = saving || snapshot.status !== "ready" || !snapshot.writable;
      React.useEffect(() => {
        if (draftEnabled === null || !dirty) setDraftEnabled(enabled);
      }, [snapshot.revision, dirty, draftEnabled, enabled]);
      if (snapshot.status !== "ready") return null;

      async function save() {
        if (!dirty || disabled) return;
        setSaving(true);
        setFailed(false);
        try {
          await writeInheritedSettingField(props.scope, snapshot, "enabled", effectiveDraftEnabled, inheritedEnabled);
        } catch (_err) {
          setFailed(true);
        } finally {
          setSaving(false);
        }
      }

      function discard() {
        setDraftEnabled(enabled);
        setFailed(false);
      }

      const title = props.t("pluginTitle");
      const blocked = !dirty || saving;
      return h("li", { className: open ? "dshPersonaPluginCard dshPersonaPluginCardOpen" : "dshPersonaPluginCard" },
        h("div", { className: "dshPersonaPluginHeader" },
          h("span", { className: "dshPersonaPluginText" },
            h("span", { className: "dshPersonaPluginHeading" },
              h("button", { type: "button", className: "dshPersonaPluginHeaderButton dshPersonaPluginTitle", "aria-expanded": open, "aria-label": `${props.t(open ? "collapse" : "expand")}: ${title}`, onClick: () => setOpen(!open) }, title),
              h("a", { className: "dshPersonaPluginRepo", href: REPOSITORY_URL, target: "_blank", rel: "noreferrer" }, "dsh-persona")
            ),
            h("button", { type: "button", className: "dshPersonaPluginHeaderButton dshPersonaPluginDescription", "aria-expanded": open, onClick: () => setOpen(!open) }, props.t("pluginDescription"))
          ),
          dirty ? h("span", { className: "dshPersonaPluginPending" }, props.t("unsaved")) : null,
          h("button", { type: "button", className: "dshPersonaPluginChevronButton", "aria-expanded": open, "aria-label": `${props.t(open ? "collapse" : "expand")}: ${title}`, onClick: () => setOpen(!open) },
            h(IconChevronDownOutline14, { className: open ? "dshPersonaPluginChevron dshPersonaPluginChevronOpen" : "dshPersonaPluginChevron" })
          )
        ),
        open ? h("div", { className: "dshPersonaPluginBody" },
          !snapshot.writable ? h("p", { className: "dshPersonaPluginReadOnly", role: "status" }, props.t("readOnly")) : null,
          h("div", { className: "dshPersonaPluginRow" },
            h("div", null,
              h("div", { className: "dshPersonaLabel" }, props.t("enabled")),
              h("p", { className: "dshPersonaHint" }, props.t("enabledHint"))
            ),
            h(SwitchControl, { checked: effectiveDraftEnabled, disabled, onChange: (event) => setDraftEnabled(event.currentTarget.checked) })
          ),
          h("div", { className: "dshPersonaPluginFooter" },
            failed ? h("p", { className: "dshPersonaPluginFailed", role: "status" }, props.t("saveFailed")) : null,
            h("button", { type: "button", className: "dshPersonaPluginDiscard", disabled: !dirty || saving, onClick: discard }, props.t("discard")),
            h("button", { type: "button", className: "dshPersonaPluginSave", disabled: blocked, onClick: save }, props.t(saving ? "saving" : "save"))
          )
        ) : null
      );
    }

    /** @param {SectionProps} props @returns {import("react").ReactElement} */
    function PersonaSettingsSection(props) {
      const t = props.t ?? ((key) => zh[key] ?? key);
      const snapshot = useStoreSnapshot(props.scope);
      const catalogSnapshot = useStoreSnapshot(props.catalogSource);
      React.useEffect(() => {
        props.catalogSource.ensure().catch(() => {});
      }, [props.catalogSource]);

      const catalog = catalogFromMirror(catalogSnapshot);
      const fallback = /** @type {PersonaSettings} */ ({ enabled: true, preset: "", shared: "" });
      const resolved = catalog === undefined ? fallback : normalize(snapshot.value, catalog);
      const inherited = catalog === undefined ? fallback : normalize(snapshot.base, catalog);
      const [draft, setDraft] = React.useState(resolved);
      const [saving, setSaving] = React.useState(false);
      const [error, setError] = React.useState("");
      const dirty = !sameSettings(draft, resolved);

      React.useEffect(() => {
        if (!dirty) setDraft(resolved);
      }, [snapshot.revision, catalogSnapshot.view, dirty]);

      /** @param {keyof PersonaSettings} field @param {PersonaSettings[keyof PersonaSettings]} value */
      function update(field, value) {
        setDraft((current) => /** @type {PersonaSettings} */ ({ ...current, [field]: value }));
        setError("");
      }

      async function save() {
        if (catalog === undefined || !dirty || saving) return;
        setSaving(true);
        setError("");
        try {
          /** @type {(keyof PersonaSettings)[]} */
          const fields = ["preset", "shared"];
          for (const field of fields) {
            if (draft[field] === resolved[field]) continue;
            await writeInheritedSettingField(props.scope, snapshot, field, draft[field], inherited[field]);
          }
        } catch (err) {
          setError(messageOf(err));
        } finally {
          setSaving(false);
        }
      }

      function resetShared() {
        update("shared", inherited.shared);
      }

      if (snapshot.status === "loading" || snapshot.status === "idle" || catalogSnapshot.status === "loading" || catalogSnapshot.status === "idle") {
        return h("section", { className: "dshPersonaPage" }, h("p", { className: "dshPersonaMeta" }, t("loading")));
      }
      if (snapshot.status !== "ready" || catalog === undefined) {
        return h("section", { className: "dshPersonaPage" }, h("p", { className: "dshPersonaMeta" }, t("unavailable")));
      }

      const disabled = saving || !snapshot.writable;
      const presetPrompt = catalog.presets[draft.preset]?.prompt.trim() ?? "";
      const overrides = overrideFields(snapshot.user);

      /** @param {PresetId} value */
      function onPresetChange(value) {
        update("preset", value);
      }

      /** @param {import("react").ChangeEvent<HTMLTextAreaElement>} event */
      function onSharedChange(event) {
        update("shared", event.currentTarget.value);
      }

      return h("section", { className: "dshPersonaPage" },
        h(HeroPanel, { title: t("title"), intro: t("intro") }),
        h(ActionBar, { dirty, disabled, saving, sharedIsDefault: draft.shared === inherited.shared, overrides, t, onSave: save, onResetShared: resetShared }),
        h("div", { className: "dshPersonaForm" },
          h(FieldRow, { label: t("preset"), hint: t("presetHint") },
            h(PresetSelect, { value: draft.preset, disabled, t, catalog, onChange: onPresetChange })
          ),
          h(PresetPreview, { title: t("presetPreview"), prompt: presetPrompt }),
          h(FieldRow, { label: t("shared"), hint: t("sharedHint"), as: "label" },
            h(PromptTextarea, { value: draft.shared, disabled, onChange: onSharedChange })
          ),
          h("p", { className: "dshPersonaMeta" }, t("saved")),
          error.length > 0 ? h("p", { className: "dshPersonaMeta", role: "alert" }, error) : null
        )
      );
    }

    const inject = ["slots", "locale", "settingsScope"];

    /** @param {ClientContext} ctx */
    function apply(ctx) {
      const t = ctx.locale.bind(SETTINGS_NAMESPACE);
      const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE });
      const catalogSource = ctx.settingsScope.describe();
      ctx.effect(installStyles, "dsh-persona: styles");
      ctx.effect(() => ctx.locale.register(SETTINGS_NAMESPACE, { zh, en }), "dsh-persona: locale");
      ctx.effect(() => ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
        name: "settings.plugin.item",
        key: SETTINGS_NAMESPACE
      }, () => h(PluginConfigCard, { t, scope }))), "dsh-persona: plugin card");
      ctx.effect(() => {
        /** @type {undefined | (() => void)} */
        let disposeSection;
        function syncSection() {
          const snapshot = scope.getSnapshot();
          const enabled = snapshot.status === "ready" && enabledFrom(snapshot.value);
          if (!enabled) {
            if (disposeSection !== undefined) {
              disposeSection();
              disposeSection = undefined;
            }
            return;
          }
          if (disposeSection !== undefined) return;
          disposeSection = ctx.slots.inject("settings.section", () => ctx.slots.register({
            name: "settings.section",
            id: SETTINGS_NAMESPACE,
            order: 26,
            label: () => t("nav"),
            locale: SETTINGS_NAMESPACE,
            inject: () => ({ scope, catalogSource })
          }, PersonaSettingsSection));
        }
        const unsubscribe = scope.subscribe(syncSection);
        syncSection();
        return () => {
          unsubscribe();
          if (disposeSection !== undefined) disposeSection();
        };
      }, "dsh-persona: settings section");
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
