import { Comment, CommentDisplayPart, Reflection } from "../../models";
import type { Logger, ValidationOptions } from "../../utils";
export declare function resolveLinks(comment: Comment, reflection: Reflection, validation: ValidationOptions, logger: Logger): void;
export declare function resolvePartLinks(reflection: Reflection, parts: readonly CommentDisplayPart[], warn: () => void, validation: ValidationOptions, logger: Logger): CommentDisplayPart[];
