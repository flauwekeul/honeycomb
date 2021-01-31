import { DefaultHexPrototype, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

// todo: looks a lot like Grid.traverse()
export const repeat = <T extends DefaultHexPrototype>(amount: number, ...traversers: Traverser<T>[]): Traverser<T> => (
  cursor,
  hexPrototype,
) => {
  const result: HexCoordinates[] = []
  let _cursor = cursor

  for (let i = 0; i < amount; i++) {
    for (const traverser of traversers) {
      for (const nextCursor of traverser(_cursor, hexPrototype)) {
        _cursor = nextCursor
        result.push(_cursor)
      }
    }
  }

  return result
}
