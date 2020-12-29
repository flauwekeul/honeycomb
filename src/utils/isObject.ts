export const isObject = <T = Record<string, unknown>>(value: unknown): value is T =>
  typeof value === 'object' && value !== null
