interface UnknownFunction {
  (...args: unknown[]): unknown
}

export const isFunction = (value: unknown): value is UnknownFunction => typeof value === 'function'
