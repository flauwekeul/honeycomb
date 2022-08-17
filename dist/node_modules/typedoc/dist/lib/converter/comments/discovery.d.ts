import * as ts from "typescript";
import { ReflectionKind } from "../../models";
import { Logger } from "../../utils";
import { CommentStyle } from "../../utils/options/declaration";
export declare function discoverComment(symbol: ts.Symbol, kind: ReflectionKind, logger: Logger, commentStyle: CommentStyle): [ts.SourceFile, ts.CommentRange[]] | undefined;
export declare function discoverSignatureComment(declaration: ts.SignatureDeclaration | ts.JSDocSignature, commentStyle: CommentStyle): [ts.SourceFile, ts.CommentRange[]] | undefined;
