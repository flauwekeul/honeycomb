import { Hex } from '../../hex'
import { flatTraverse } from '../functions'
import { Traverser } from '../types'

/**
 * For each hex from `source` traverses over hex coordinates from `traverser`
 * @param source    Each hex in the source is passed one-by-one as a cursor to the traverser
 * @param branch Receives each hex coordinates from source as the start cursor
 */
export const branch = <T extends Hex>(
  source: Traverser<T> | Traverser<T>[],
  branch: Traverser<T> | Traverser<T>[],
): Traverser<T> => (cursor, getHex) => {
  const flatBranch = flatTraverse(branch)
  const result: T[] = []
  let _cursor = cursor

  for (const sourceCursor of flatTraverse(source)(_cursor, getHex)) {
    _cursor = sourceCursor
    result.push(_cursor)
    for (const branchCursor of flatBranch(_cursor, getHex)) {
      result.push(branchCursor)
    }
  }

  return result
}
