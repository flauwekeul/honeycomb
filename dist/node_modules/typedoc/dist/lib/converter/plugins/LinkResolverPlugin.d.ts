import { ConverterComponent } from "../components";
import type { Context } from "../../converter";
import { ValidationOptions } from "../../utils";
/**
 * A plugin that resolves `{@link Foo}` tags.
 */
export declare class LinkResolverPlugin extends ConverterComponent {
    validation: ValidationOptions;
    /**
     * Create a new LinkResolverPlugin instance.
     */
    initialize(): void;
    onResolve(context: Context): void;
}
