interface UnknownFunction {
  (...args: unknown[]): unknown
}

export const isFunction = <T = UnknownFunction>(value: unknown): value is T => typeof value === 'function'
