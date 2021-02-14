import { Hex } from '../../hex'
import { Traverser } from '../types'

/**
 *
 * @param traversers One or more traversers to be combined into a single new traverser
 */
export const concat = <T extends Hex>(...traversers: Traverser<T>[]): Traverser<T> => (cursor, getHex) => {
  const result: T[] = []
  let _cursor = cursor

  for (const traverser of traversers) {
    for (const nextCursor of traverser(_cursor, getHex)) {
      _cursor = getHex(nextCursor)
      result.push(_cursor)
    }
  }

  return result
}
