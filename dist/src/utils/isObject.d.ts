/**
 * Pass a type variable to isObject() for best results. E.g.: `isObject<MyObject>(value)`.
 */
export declare const isObject: <T = Record<string, unknown>>(value: unknown) => value is T;
