import { Hex } from '../../hex'
import { Traverser } from '../types'

/**
 * For each hex from `source` traverses over hexes from `traverser`
 * @param source    Each hex in the source is passed one-by-one as a cursor to the traverser
 * @param traverser Receives each hex from source as the start cursor
 */
// todo: maybe has some duplication with concat()
export const branch = <T extends Hex>(source: Traverser<T>, traverser: Traverser<T>): Traverser<T> => (cursor) => {
  const result: T[] = []
  let _cursor = cursor

  for (const sourceCursor of source(_cursor)) {
    _cursor = sourceCursor
    result.push(_cursor)
    for (const branchCursor of traverser(sourceCursor)) {
      result.push(branchCursor)
    }
  }

  return result
}
