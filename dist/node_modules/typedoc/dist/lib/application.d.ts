import { Converter } from "./converter/index";
import { Renderer } from "./output/renderer";
import { Serializer } from "./serialization";
import type { ProjectReflection } from "./models/index";
import { Logger } from "./utils/index";
import { AbstractComponent, ChildableComponent } from "./utils/component";
import { Options } from "./utils";
import type { TypeDocOptions } from "./utils/options/declaration";
import { DocumentationEntryPoint } from "./utils/entry-point";
/**
 * The default TypeDoc main application class.
 *
 * This class holds the two main components of TypeDoc, the {@link Converter} and
 * the {@link Renderer}. When running TypeDoc, first the {@link Converter} is invoked which
 * generates a {@link ProjectReflection} from the passed in source files. The
 * {@link ProjectReflection} is a hierarchical model representation of the TypeScript
 * project. Afterwards the model is passed to the {@link Renderer} which uses an instance
 * of {@link Theme} to generate the final documentation.
 *
 * Both the {@link Converter} and the {@link Renderer} emit a series of events while processing the project.
 * Subscribe to these Events to control the application flow or alter the output.
 */
export declare class Application extends ChildableComponent<Application, AbstractComponent<Application>> {
    /**
     * The converter used to create the declaration reflections.
     */
    converter: Converter;
    /**
     * The renderer used to generate the documentation output.
     */
    renderer: Renderer;
    /**
     * The serializer used to generate JSON output.
     */
    serializer: Serializer;
    /**
     * The logger that should be used to output messages.
     */
    logger: Logger;
    options: Options;
    /** @internal */
    loggerType: string | Function;
    /**
     * The version number of TypeDoc.
     */
    static VERSION: string;
    /**
     * Create a new TypeDoc application instance.
     *
     * @param options An object containing the options that should be used.
     */
    constructor();
    /**
     * Initialize TypeDoc with the given options object.
     *
     * @param options  The desired options to set.
     */
    bootstrap(options?: Partial<TypeDocOptions>): void;
    /**
     * Return the path to the TypeScript compiler.
     */
    getTypeScriptPath(): string;
    getTypeScriptVersion(): string;
    /**
     * Gets the entry points to be documented according to the current `entryPoints` and `entryPointStrategy` options.
     * May return undefined if entry points fail to be expanded.
     */
    getEntryPoints(): DocumentationEntryPoint[] | undefined;
    /**
     * Run the converter for the given set of files and return the generated reflections.
     *
     * @returns An instance of ProjectReflection on success, undefined otherwise.
     */
    convert(): ProjectReflection | undefined;
    convertAndWatch(success: (project: ProjectReflection) => Promise<void>): void;
    validate(project: ProjectReflection): void;
    /**
     * Render HTML for the given project
     */
    generateDocs(project: ProjectReflection, out: string): Promise<void>;
    /**
     * Run the converter for the given set of files and write the reflections to a json file.
     *
     * @param out The path and file name of the target file.
     * @returns Whether the JSON file could be written successfully.
     */
    generateJson(project: ProjectReflection, out: string): Promise<void>;
    /**
     * Print the version number.
     */
    toString(): string;
}
