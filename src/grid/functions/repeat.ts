import { HexCoordinates } from '../../hex'
import { Traverser } from '../types'

// todo: looks a lot like Grid.traverse()
export const repeat = (amount: number, ...traversers: Traverser[]): Traverser => (cursor) => {
  const result: HexCoordinates[] = []
  let _cursor = cursor

  for (let i = 0; i < amount; i++) {
    for (const traverser of traversers) {
      for (const nextCursor of traverser(_cursor)) {
        _cursor = nextCursor
        result.push(_cursor)
      }
    }
  }

  return result
}
