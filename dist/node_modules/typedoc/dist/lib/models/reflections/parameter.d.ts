import type { SomeType } from "..";
import { Reflection, TraverseCallback } from "./abstract";
import type { SignatureReflection } from "./signature";
import type { Serializer, JSONOutput } from "../../serialization";
export declare class ParameterReflection extends Reflection {
    parent?: SignatureReflection;
    defaultValue?: string;
    type?: SomeType;
    /**
     * Traverse all potential child reflections of this reflection.
     *
     * The given callback will be invoked for all children, signatures and type parameters
     * attached to this reflection.
     *
     * @param callback  The callback function that should be applied for each child reflection.
     */
    traverse(callback: TraverseCallback): void;
    /**
     * Return a string representation of this reflection.
     */
    toString(): string;
    toObject(serializer: Serializer): JSONOutput.ParameterReflection;
}
