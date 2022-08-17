import * as ts from "typescript";
import type { Logger } from "./loggers";
import type { Options } from "./options";
/**
 * Defines how entry points are interpreted.
 * @enum
 */
export declare const EntryPointStrategy: {
    /**
     * The default behavior in v0.22+, expects all provided entry points as being part of a single program.
     * Any directories included in the entry point list will result in `dir/index.([cm][tj]s|[tj]sx?)` being used.
     */
    readonly Resolve: "resolve";
    /**
     * The default behavior in v0.21 and earlier. Behaves like the resolve behavior, but will recursively
     * expand directories into an entry point for each file within the directory.
     */
    readonly Expand: "expand";
    /**
     * Alternative resolution mode useful for monorepos. With this mode, TypeDoc will look for a package.json
     * and tsconfig.json under each provided entry point. The `main` field of each package will be documented.
     */
    readonly Packages: "packages";
};
export declare type EntryPointStrategy = typeof EntryPointStrategy[keyof typeof EntryPointStrategy];
export interface DocumentationEntryPoint {
    displayName: string;
    readmeFile?: string;
    program: ts.Program;
    sourceFile: ts.SourceFile;
    version?: string;
}
export declare function getEntryPoints(logger: Logger, options: Options): DocumentationEntryPoint[] | undefined;
export declare function getWatchEntryPoints(logger: Logger, options: Options, program: ts.Program): DocumentationEntryPoint[] | undefined;
export declare function getExpandedEntryPointsForPaths(logger: Logger, inputFiles: string[], options: Options, programs?: ts.Program[]): DocumentationEntryPoint[] | undefined;
