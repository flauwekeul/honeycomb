/**
 * Module which handles sorting reflections according to a user specified strategy.
 * @module
 */
import type { DeclarationReflection } from "../models/reflections/declaration";
export declare const SORT_STRATEGIES: readonly ["source-order", "alphabetical", "enum-value-ascending", "enum-value-descending", "static-first", "instance-first", "visibility", "required-first", "kind"];
export declare type SortStrategy = typeof SORT_STRATEGIES[number];
export declare function sortReflections(reflections: DeclarationReflection[], strategies: readonly SortStrategy[]): void;
