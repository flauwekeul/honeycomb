import { ConverterComponent } from "../components";
import { EntryPointStrategy } from "../../utils";
/**
 * A handler that tries to find the package.json and readme.md files of the
 * current project.
 */
export declare class PackagePlugin extends ConverterComponent {
    readme: string;
    includeVersion: boolean;
    entryPointStrategy: EntryPointStrategy;
    /**
     * The file name of the found readme.md file.
     */
    private readmeFile?;
    /**
     * The file name of the found package.json file.
     */
    private packageFile?;
    /**
     * Create a new PackageHandler instance.
     */
    initialize(): void;
    /**
     * Triggered when the converter begins converting a project.
     */
    private onBegin;
    /**
     * Triggered when the converter begins resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    private onBeginResolve;
}
