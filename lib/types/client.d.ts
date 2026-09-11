export declare const inject: ['slots', 'locale', 'settingsScope'];
export declare function apply(ctx: unknown): void;

declare global {
  var __ModuleLoader__: {
    load(record: {
      id: string;
      factory(require: (specifier: string) => unknown): Record<string, unknown>;
    }): void;
  };
}
