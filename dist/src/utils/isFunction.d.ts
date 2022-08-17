declare type UnknownFunction = (...args: unknown[]) => unknown;
export declare const isFunction: <T = UnknownFunction>(value: unknown) => value is T;
export {};
