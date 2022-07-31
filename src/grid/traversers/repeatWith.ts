import { Hex } from '../../hex'
import { Traverser } from '../types'
import { concat } from './concat'

// todo: use in rays (if it still has right to exist)
// todo: probably move repeatWith, repeat and concat to grid/traversers/
export function repeatWith<T extends Hex>(
  sources: Traverser<T> | Traverser<T>[],
  targets: Traverser<T> | Traverser<T>[],
  // todo: isn't there a more elegant way than a config?
  { includeSource = true } = {},
): Traverser<T> {
  return function repeatWithTraverser(createHex, cursor) {
    const hexes: T[] = []

    for (const sourceCursor of concat(sources)(createHex, cursor)) {
      if (includeSource) hexes.push(sourceCursor)
      for (const hex of concat(targets)(createHex, sourceCursor)) {
        hexes.push(hex)
      }
    }

    return hexes
  }
}
