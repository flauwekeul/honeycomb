import { Hex, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const flatTraverse = <T extends Hex>(traversers: Traverser<T> | Traverser<T>[]) => (
  cursor: T,
  getHex: (coordinates: HexCoordinates) => T,
) => {
  if (!Array.isArray(traversers)) {
    return Array.from(traversers(cursor, getHex))
  }

  const nextHexes: T[] = []
  for (const traverser of traversers) {
    for (const nextCursor of traverser(cursor, getHex)) {
      cursor = nextCursor
      nextHexes.push(cursor)
    }
  }
  return nextHexes
}
