import { Hex } from '../../hex'
import { Traverser } from '../types'
import { concat } from './concat'

/**
 * @category Traverser
 */
export function repeatWith<T extends Hex>(
  sources: Traverser<T> | Traverser<T>[],
  branches: Traverser<T> | Traverser<T>[],
  // todo: isn't there a more elegant way than a config?
  { includeSource = true } = {},
): Traverser<T> {
  return function repeatWithTraverser(createHex, cursor) {
    const hexes: T[] = []

    for (const sourceCursor of concat(sources)(createHex, cursor)) {
      if (includeSource) hexes.push(sourceCursor)
      for (const hex of concat(branches)(createHex, sourceCursor)) {
        hexes.push(hex)
      }
    }

    return hexes
  }
}
