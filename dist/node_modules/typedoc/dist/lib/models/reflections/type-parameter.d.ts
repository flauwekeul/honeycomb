import type { SomeType } from "../types";
import { Reflection } from "./abstract";
import type { DeclarationReflection } from "./declaration";
import type { Serializer, JSONOutput } from "../../serialization";
/**
 * Modifier flags for type parameters, added in TS 4.7
 * @enum
 */
export declare const VarianceModifier: {
    readonly in: "in";
    readonly out: "out";
    readonly inOut: "in out";
};
export declare type VarianceModifier = typeof VarianceModifier[keyof typeof VarianceModifier];
export declare class TypeParameterReflection extends Reflection {
    parent?: DeclarationReflection;
    type?: SomeType;
    default?: SomeType;
    varianceModifier?: VarianceModifier;
    constructor(name: string, constraint: SomeType | undefined, defaultType: SomeType | undefined, parent: Reflection, varianceModifier: VarianceModifier | undefined);
    toObject(serializer: Serializer): JSONOutput.TypeParameterReflection;
}
