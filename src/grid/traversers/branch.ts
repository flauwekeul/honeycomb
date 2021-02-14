import { Hex } from '../../hex'
import { Traverser } from '../types'

/**
 * For each hex from `source` traverses over hex coordinates from `traverser`
 * @param source    Each hex in the source is passed one-by-one as a cursor to the traverser
 * @param traverser Receives each hex coordinates from source as the start cursor
 */
// todo: maybe has some duplication with concat()
export const branch = <T extends Hex>(source: Traverser<T>, traverser: Traverser<T>): Traverser<T> => (
  cursor,
  getHex,
) => {
  const result: T[] = []
  let _cursor = cursor

  for (const sourceCursor of source(_cursor, getHex)) {
    _cursor = getHex(sourceCursor)
    result.push(_cursor)
    for (const branchCursor of traverser(_cursor, getHex)) {
      result.push(branchCursor)
    }
  }

  return result
}
