import * as ts from "typescript";
export declare function isNamedNode(node: ts.Node): node is ts.Node & {
    name: ts.Identifier | ts.PrivateIdentifier | ts.ComputedPropertyName;
};
export declare function getHeritageTypes(declarations: readonly (ts.ClassDeclaration | ts.InterfaceDeclaration)[], kind: ts.SyntaxKind.ImplementsKeyword | ts.SyntaxKind.ExtendsKeyword): ts.ExpressionWithTypeArguments[];
