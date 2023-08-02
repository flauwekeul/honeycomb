/**
 * Determines whether the passed value is an object.
 *
 * Optionally pass a type variable, e.g.:
 * ```ts
 * interface MyObject {
 *   a: number
 *   b: string
 * }
 *
 * isObject<MyObject>(value)
 * ```
 *
 * @category Util
 */
export const isObject = <T = Record<PropertyKey, unknown>>(value: unknown): value is T =>
  typeof value === 'object' && value !== null
