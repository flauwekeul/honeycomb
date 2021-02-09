/**
 * In TypeScript: pass a type variable to isObject() for best result. E.g.: `isObject<MyObject>(value)`
 */
export const isObject = <T = Record<string, unknown>>(value: unknown): value is T =>
  typeof value === 'object' && value !== null
