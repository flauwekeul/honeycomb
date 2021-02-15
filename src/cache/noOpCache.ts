/* eslint-disable @typescript-eslint/no-empty-function */
import { Cache } from './types'

export class NoOpCache implements Cache<never> {
  static of() {
    return new NoOpCache()
  }

  get last() {
    return undefined
  }

  get size() {
    return 0
  }

  clear() {}

  delete() {
    return true
  }

  forEach() {}

  get() {
    return undefined
  }

  has() {
    return false
  }

  set() {
    return this
  }
}
