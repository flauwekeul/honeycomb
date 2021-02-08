import { CompassDirection } from '../../compass'
import { Hex } from '../../hex'
import { neighborOf } from '../functions'
import { Traverser } from '../types'

export const move = <T extends Hex>(direction: CompassDirection, times = 1): Traverser<T> => {
  return (cursor) => {
    const result: T[] = []
    let _cursor = cursor

    for (let i = 1; i <= times; i++) {
      _cursor = _cursor.copy(neighborOf(_cursor, direction))
      result.push(_cursor)
    }

    return result
  }
}
