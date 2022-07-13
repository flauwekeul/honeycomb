import { Hex } from '../../hex'
import { HexGenerator, Traverser } from '../types'

export function concat<T extends Hex>(...traversers: Traverser<T>[]): Traverser<T, HexGenerator<T>> {
  return function* concatTraverser(createHex, cursor) {
    let _cursor = cursor
    for (const traverser of traversers) {
      // don't use `_cursor = yield* traverser(createHex, _cursor)` doesn't work if `traverser()` returns an array,
      // because arrays always return `{ value: undefined, done: true }` when iterated
      for (const hex of traverser(createHex, _cursor)) {
        yield (_cursor = hex)
      }
    }
  }
}
