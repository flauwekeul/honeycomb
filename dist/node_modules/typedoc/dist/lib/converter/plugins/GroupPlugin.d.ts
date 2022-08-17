import { ReflectionKind, DeclarationReflection } from "../../models/reflections/index";
import { ReflectionGroup } from "../../models/ReflectionGroup";
import { ConverterComponent } from "../components";
import { SortStrategy } from "../../utils/sort";
/**
 * A handler that sorts and groups the found reflections in the resolving phase.
 *
 * The handler sets the `groups` property of all container reflections.
 */
export declare class GroupPlugin extends ConverterComponent {
    /**
     * Define the singular name of individual reflection kinds.
     */
    static SINGULARS: {
        8: string;
        16: string;
    };
    /**
     * Define the plural name of individual reflection kinds.
     */
    static PLURALS: {
        128: string;
        1024: string;
        8: string;
        16: string;
        4194304: string;
    };
    /** @internal */
    sortStrategies: SortStrategy[];
    boosts: Record<string, number>;
    usedBoosts: Set<string>;
    /**
     * Create a new GroupPlugin instance.
     */
    initialize(): void;
    /**
     * Triggered when the converter resolves a reflection.
     *
     * @param context  The context object describing the current state the converter is in.
     * @param reflection  The reflection that is currently resolved.
     */
    private onResolve;
    /**
     * Triggered when the converter has finished resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    private onEndResolve;
    private group;
    /**
     * Extracts the groups for a given reflection.
     *
     * @privateRemarks
     * If you change this, also update getCategories in CategoryPlugin accordingly.
     */
    getGroups(reflection: DeclarationReflection): Set<string>;
    /**
     * Create a grouped representation of the given list of reflections.
     *
     * Reflections are grouped by kind and sorted by weight and name.
     *
     * @param reflections  The reflections that should be grouped.
     * @returns An array containing all children of the given reflection grouped by their kind.
     */
    getReflectionGroups(reflections: DeclarationReflection[]): ReflectionGroup[];
    /**
     * Transform the internal typescript kind identifier into a human readable version.
     *
     * @param kind  The original typescript kind identifier.
     * @returns A human readable version of the given typescript kind identifier.
     */
    private static getKindString;
    /**
     * Return the singular name of a internal typescript kind identifier.
     *
     * @param kind The original internal typescript kind identifier.
     * @returns The singular name of the given internal typescript kind identifier
     */
    static getKindSingular(kind: ReflectionKind): string;
    /**
     * Return the plural name of a internal typescript kind identifier.
     *
     * @param kind The original internal typescript kind identifier.
     * @returns The plural name of the given internal typescript kind identifier
     */
    static getKindPlural(kind: ReflectionKind): string;
}
