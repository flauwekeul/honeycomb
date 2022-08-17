import { Reflection } from "./abstract";
import { DeclarationReflection } from "./declaration";
import type { Serializer, JSONOutput } from "../../serialization";
/**
 * Describes a reflection which does not exist at this location, but is referenced. Used for imported reflections.
 *
 * ```ts
 * // a.ts
 * export const a = 1;
 * // b.ts
 * import { a } from './a';
 * // Here to avoid extra work we create a reference to the original reflection in module a instead
 * // of copying the reflection.
 * export { a };
 * ```
 */
export declare class ReferenceReflection extends DeclarationReflection {
    private _target;
    private _project?;
    /**
     * Creates a reference reflection. Should only be used within the factory function.
     * @param name
     * @param state
     * @param parent
     *
     * @internal
     */
    constructor(name: string, state: ReferenceReflection["_target"], parent?: Reflection);
    /**
     * Tries to get the reflection that is referenced. This may be another reference reflection.
     * To fully resolve any references, use {@link tryGetTargetReflectionDeep}.
     */
    tryGetTargetReflection(): Reflection | undefined;
    /**
     * Tries to get the reflection that is referenced, this will fully resolve references.
     * To only resolve one reference, use {@link tryGetTargetReflection}.
     */
    tryGetTargetReflectionDeep(): Reflection | undefined;
    /**
     * Gets the reflection that is referenced. This may be another reference reflection.
     * To fully resolve any references, use {@link getTargetReflectionDeep}.
     */
    getTargetReflection(): Reflection;
    /**
     * Gets the reflection that is referenced, this will fully resolve references.
     * To only resolve one reference, use {@link getTargetReflection}.
     */
    getTargetReflectionDeep(): Reflection;
    getChildByName(arg: string | string[]): Reflection | undefined;
    private _ensureProject;
    toObject(serializer: Serializer): JSONOutput.ReferenceReflection;
}
