import { DeclarationReflection } from "../../models/reflections/index";
import { ConverterComponent } from "../components";
/**
 * A handler that converts all instances of {@link LateResolvingType} to their renderable equivalents.
 */
export declare class TypePlugin extends ConverterComponent {
    reflections: Set<DeclarationReflection>;
    /**
     * Create a new TypeHandler instance.
     */
    initialize(): void;
    /**
     * Triggered when the converter resolves a reflection.
     *
     * @param context  The context object describing the current state the converter is in.
     * @param reflection  The reflection that is currently resolved.
     */
    private onResolve;
    private postpone;
    /**
     * Triggered when the converter has finished resolving a project.
     */
    private onResolveEnd;
}
