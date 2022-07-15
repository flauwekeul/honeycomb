import { Hex } from '../../hex'
import { concat } from '../functions'
import { Traverser } from '../types'

export function branch<T extends Hex>(
  sources: Traverser<T> | Traverser<T>[],
  branches: Traverser<T> | Traverser<T>[],
): Traverser<T, T[]> {
  return function branchTraverser(createHex, cursor) {
    const hexes: T[] = []
    let _cursor = cursor

    for (const sourceCursor of concat(sources)(createHex, _cursor)) {
      _cursor = sourceCursor
      hexes.push(_cursor as T)
      for (const branchCursor of concat(branches)(createHex, _cursor)) {
        hexes.push(branchCursor)
      }
    }

    return hexes
  }
}
