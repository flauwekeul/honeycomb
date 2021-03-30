import { CompassDirection } from '../../compass'
import { Hex } from '../../hex'
import { neighborOf } from '../functions'
import { Traverser } from '../types'

export const line = <T extends Hex>(direction: CompassDirection, length = 1): Traverser<T> => {
  return (cursor, getHex) => {
    const result: T[] = []
    let _cursor = cursor

    for (let i = 1; i <= length; i++) {
      _cursor = getHex(neighborOf(_cursor, direction))
      result.push(_cursor)
    }

    return result
  }
}

export const move = line
