import { Theme } from "../../theme";
import type { Renderer } from "../../renderer";
import { Reflection, ProjectReflection, ContainerReflection, DeclarationReflection } from "../../../models";
import { UrlMapping } from "../../models/UrlMapping";
import { PageEvent } from "../../events";
import type { MarkedPlugin } from "../../plugins";
import { DefaultThemeRenderContext } from "./DefaultThemeRenderContext";
import { JSX } from "../../../utils";
/**
 * Default theme implementation of TypeDoc. If a theme does not provide a custom
 * {@link Theme} implementation, this theme class will be used.
 */
export declare class DefaultTheme extends Theme {
    /** @internal */
    markedPlugin: MarkedPlugin;
    private _renderContext?;
    getRenderContext(_pageEvent: PageEvent<any>): DefaultThemeRenderContext;
    reflectionTemplate: (pageEvent: PageEvent<ContainerReflection>) => JSX.Element;
    indexTemplate: (pageEvent: PageEvent<ProjectReflection>) => JSX.Element;
    defaultLayoutTemplate: (pageEvent: PageEvent<Reflection>) => JSX.Element;
    /**
     * Mappings of reflections kinds to templates used by this theme.
     */
    private mappings;
    static URL_PREFIX: RegExp;
    /**
     * Create a new DefaultTheme instance.
     *
     * @param renderer  The renderer this theme is attached to.
     * @param basePath  The base path of this theme.
     */
    constructor(renderer: Renderer);
    /**
     * Map the models of the given project to the desired output files.
     *
     * @param project  The project whose urls should be generated.
     * @returns        A list of {@link UrlMapping} instances defining which models
     *                 should be rendered to which files.
     */
    getUrls(project: ProjectReflection): UrlMapping[];
    /**
     * Triggered before the renderer starts rendering a project.
     *
     * @param event  An event object describing the current render operation.
     */
    private onRendererBegin;
    /**
     * Return a url for the given reflection.
     *
     * @param reflection  The reflection the url should be generated for.
     * @param relative    The parent reflection the url generation should stop on.
     * @param separator   The separator used to generate the url.
     * @returns           The generated url.
     */
    static getUrl(reflection: Reflection, relative?: Reflection, separator?: string): string;
    /**
     * Return the template mapping for the given reflection.
     *
     * @param reflection  The reflection whose mapping should be resolved.
     * @returns           The found mapping or undefined if no mapping could be found.
     */
    private getMapping;
    /**
     * Build the url for the the given reflection and all of its children.
     *
     * @param reflection  The reflection the url should be created for.
     * @param urls        The array the url should be appended to.
     * @returns           The altered urls array.
     */
    buildUrls(reflection: DeclarationReflection, urls: UrlMapping[]): UrlMapping[];
    render(page: PageEvent<Reflection>): string;
    /**
     * Generate an anchor url for the given reflection and all of its children.
     *
     * @param reflection  The reflection an anchor url should be created for.
     * @param container   The nearest reflection having an own document.
     */
    static applyAnchorUrl(reflection: Reflection, container: Reflection): void;
    /**
     * Generate the css classes for the given reflection and apply them to the
     * {@link DeclarationReflection.cssClasses} property.
     *
     * @param reflection  The reflection whose cssClasses property should be generated.
     */
    static applyReflectionClasses(reflection: DeclarationReflection, filters: Record<string, boolean>): void;
    /**
     * Transform a space separated string into a string suitable to be used as a
     * css class, e.g. "constructor method" > "constructor-method".
     */
    static toStyleClass(str: string): string;
}
