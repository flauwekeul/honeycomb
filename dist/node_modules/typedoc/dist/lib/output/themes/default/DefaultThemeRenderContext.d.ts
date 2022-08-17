import type { RendererHooks } from "../..";
import type { CommentDisplayPart, ReferenceType, Reflection } from "../../../models";
import type { NeverIfInternal, Options } from "../../../utils";
import type { DefaultTheme } from "./DefaultTheme";
export declare class DefaultThemeRenderContext {
    private theme;
    options: Options;
    constructor(theme: DefaultTheme, options: Options);
    icons: Record<"search" | "anchor" | import("../../../models").ReflectionKind | "checkbox" | "chevronDown" | "menu" | "chevronSmall", () => import("../../../utils/jsx.elements").JsxElement>;
    hook: (name: keyof RendererHooks) => import("../../../utils/jsx.elements").JsxElement[];
    /** Avoid this in favor of urlTo if possible */
    relativeURL: (url: string | undefined) => string | undefined;
    urlTo: (reflection: Reflection) => string | undefined;
    markdown: (md: readonly CommentDisplayPart[] | NeverIfInternal<string | undefined>) => string;
    attemptExternalResolution: (type: ReferenceType) => string | undefined;
    reflectionTemplate: (props: import("../..").PageEvent<import("../../../models").ContainerReflection>) => import("../../../utils/jsx.elements").JsxElement;
    indexTemplate: (props: import("../..").PageEvent<import("../../../models").ProjectReflection>) => import("../../../utils/jsx.elements").JsxElement;
    defaultLayout: (props: import("../..").PageEvent<Reflection>) => import("../../../utils/jsx.elements").JsxElement;
    analytics: () => import("../../../utils/jsx.elements").JsxElement | undefined;
    breadcrumb: (props: Reflection) => import("../../../utils/jsx.elements").JsxElement | undefined;
    comment: (props: Reflection) => import("../../../utils/jsx.elements").JsxElement | undefined;
    footer: () => import("../../../utils/jsx.elements").JsxElement | undefined;
    header: (props: import("../..").PageEvent<Reflection>) => import("../../../utils/jsx.elements").JsxElement;
    hierarchy: (props: import("../../../models").DeclarationHierarchy) => import("../../../utils/jsx.elements").JsxElement;
    index: (props: import("../../../models").ContainerReflection) => import("../../../utils/jsx.elements").JsxElement;
    member: (props: import("../../../models").DeclarationReflection) => import("../../../utils/jsx.elements").JsxElement;
    memberDeclaration: (props: import("../../../models").DeclarationReflection) => import("../../../utils/jsx.elements").JsxElement;
    memberGetterSetter: (props: import("../../../models").DeclarationReflection) => import("../../../utils/jsx.elements").JsxElement;
    memberReference: (props: import("../../../models").ReferenceReflection) => import("../../../utils/jsx.elements").JsxElement;
    memberSignatureBody: (r_0: import("../../../models").SignatureReflection, r_1?: {
        hideSources?: boolean | undefined;
    } | undefined) => import("../../../utils/jsx.elements").JsxElement;
    memberSignatureTitle: (r_0: import("../../../models").SignatureReflection, r_1?: {
        hideName?: boolean | undefined;
        arrowStyle?: boolean | undefined;
    } | undefined) => import("../../../utils/jsx.elements").JsxElement;
    memberSignatures: (props: import("../../../models").DeclarationReflection) => import("../../../utils/jsx.elements").JsxElement;
    memberSources: (props: import("../../../models").SignatureReflection | import("../../../models").DeclarationReflection) => import("../../../utils/jsx.elements").JsxElement;
    members: (props: import("../../../models").ContainerReflection) => import("../../../utils/jsx.elements").JsxElement;
    membersGroup: (group: import("../../../models").ReflectionGroup) => import("../../../utils/jsx.elements").JsxElement;
    navigation: (props: import("../..").PageEvent<Reflection>) => import("../../../utils/jsx.elements").JsxElement;
    settings: () => import("../../../utils/jsx.elements").JsxElement;
    primaryNavigation: (props: import("../..").PageEvent<Reflection>) => import("../../../utils/jsx.elements").JsxElement;
    secondaryNavigation: (props: import("../..").PageEvent<Reflection>) => import("../../../utils/jsx.elements").JsxElement | undefined;
    parameter: (props: import("../../../models").DeclarationReflection) => import("../../../utils/jsx.elements").JsxElement;
    toolbar: (props: import("../..").PageEvent<Reflection>) => import("../../../utils/jsx.elements").JsxElement;
    type: (type: import("../../../models").Type | undefined) => import("../../../utils/jsx.elements").JsxElement;
    typeAndParent: (props: import("../../../models").Type) => import("../../../utils/jsx.elements").JsxElement;
    typeParameters: (typeParameters: import("../../../models").TypeParameterReflection[]) => import("../../../utils/jsx.elements").JsxElement;
}
