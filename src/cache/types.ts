export interface Cache<T> {
  readonly last: T | undefined
  readonly size: number
  clear(): void
  delete(id: unknown): boolean
  forEach(fn: (item: T, id: unknown, cache: this) => void): void
  get(id: unknown): T | undefined
  has(id: unknown): boolean
  set(id: unknown): this
}
