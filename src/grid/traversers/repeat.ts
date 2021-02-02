import { Hex } from '../../hex'
import { Traverser } from '../types'

// todo: looks a lot like Grid.traverse()
export const repeat = <T extends Hex>(amount: number, ...traversers: Traverser<T>[]): Traverser<T> => (cursor) => {
  const result: T[] = []
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
