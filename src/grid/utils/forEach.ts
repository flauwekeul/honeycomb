export const forEach = <T>(fn: (value: T) => void) => (iterable: Iterable<T>) => {
  for (const value of iterable) {
    fn(value)
  }
  return iterable
}

export const tap = forEach
