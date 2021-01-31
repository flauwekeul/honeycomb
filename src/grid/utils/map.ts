export const map = <T>(fn: (value: T) => T) => (iterable: Iterable<T>) => {
  const result: T[] = []
  for (const value of iterable) {
    result.push(fn(value))
  }
  return result
}
