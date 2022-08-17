import type { Application } from "../application";
export declare function loadPlugins(app: Application, plugins: readonly string[]): void;
export declare function discoverPlugins(app: Application): string[];
