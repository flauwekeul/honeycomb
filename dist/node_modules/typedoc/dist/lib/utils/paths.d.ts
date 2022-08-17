import { IMinimatch } from "minimatch";
/**
 * Convert array of glob patterns to array of minimatch instances.
 *
 * Handle a few Windows-Unix path gotchas.
 */
export declare function createMinimatch(patterns: string[]): IMinimatch[];
export declare function matchesAny(patterns: readonly IMinimatch[], path: string): boolean;
export declare function nicePath(absPath: string): string;
