import * as ts from "typescript";
import { Comment, ReflectionKind } from "../../models";
import { Logger } from "../../utils";
import type { CommentStyle } from "../../utils/options/declaration";
export interface CommentParserConfig {
    blockTags: Set<string>;
    inlineTags: Set<string>;
    modifierTags: Set<string>;
}
export declare function getComment(symbol: ts.Symbol, kind: ReflectionKind, config: CommentParserConfig, logger: Logger, commentStyle: CommentStyle): Comment | undefined;
export declare function getSignatureComment(declaration: ts.SignatureDeclaration | ts.JSDocSignature, config: CommentParserConfig, logger: Logger, commentStyle: CommentStyle): Comment | undefined;
export declare function getJsDocComment(declaration: ts.JSDocPropertyLikeTag | ts.JSDocCallbackTag | ts.JSDocTypedefTag | ts.JSDocTemplateTag | ts.JSDocEnumTag, config: CommentParserConfig, logger: Logger): Comment | undefined;
