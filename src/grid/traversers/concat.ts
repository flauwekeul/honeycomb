import { Hex } from '../../hex'
import { Traverser } from '../types'

export function concat<T extends Hex>(traversers: Traverser<T> | Traverser<T>[]): Traverser<T> {
  if (!Array.isArray(traversers)) {
    return traversers
  }

  return function concatTraverser(createHex, cursor) {
    const hexes: T[] = []
    let _cursor = cursor

    for (const traverser of traversers) {
      for (const nextCursor of traverser(createHex, _cursor)) {
        hexes.push((_cursor = nextCursor))
      }
    }

    return hexes
  }
}
