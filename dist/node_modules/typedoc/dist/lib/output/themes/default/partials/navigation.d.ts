import { Reflection } from "../../../../models";
import { JSX } from "../../../../utils";
import type { PageEvent } from "../../../events";
import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
export declare function navigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>): JSX.Element;
export declare function settings(context: DefaultThemeRenderContext): JSX.Element;
export declare function primaryNavigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>): JSX.Element;
export declare function secondaryNavigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>): JSX.Element | undefined;
