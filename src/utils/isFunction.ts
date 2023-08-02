/**
 * @category Util
 */
export type UnknownFunction = (...args: unknown[]) => unknown

/**
 * Determines whether the passed value is a function.
 *
 * Optionally pass a type variable, e.g.:
 * ```ts
 * type MyFunction = (arg: number) => void
 *
 * isFunction<MyFunction>(value)
 * ```
 *
 * The type of the arguments and return type aren't checked though.
 *
 * @category Util
 */
export const isFunction = <T = UnknownFunction>(value: unknown): value is T => typeof value === 'function'
