/* eslint-disable @typescript-eslint/no-empty-function */

// this has better performance than extending Map
export class NoopMap implements Map<never, never> {
  clear() {}

  delete() {
    return false
  }

  forEach() {}

  get() {
    return undefined
  }

  has() {
    return false
  }

  get size() {
    return 0
  }

  [Symbol.iterator]() {
    return noopIterator
  }

  entries() {
    return noopIterator
  }

  keys() {
    return noopIterator
  }

  values() {
    return noopIterator
  }

  set() {
    return this
  }

  get [Symbol.toStringTag]() {
    return 'NoopMap'
  }
}

const noopIterator = [][Symbol.iterator]()
