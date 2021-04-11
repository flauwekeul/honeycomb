import { CompassDirection } from '../../compass'
import { Hex, HexCoordinates } from '../../hex'
import { neighborOf } from '../functions'
import { Traverser } from '../types'

export const line = <T extends Hex>({ direction, start, at, length = 1 }: LineOptions): Traverser<T> => {
  return (cursor, getHex) => {
    const startHex = start && getHex(start)
    const hexes: T[] = startHex ? [startHex] : []
    let _cursor = startHex ?? (at ? getHex(at) : cursor)

    for (let i = 1; i <= length; i++) {
      _cursor = getHex(neighborOf(_cursor, direction))
      hexes.push(_cursor)
    }

    return hexes
  }
}

// todo: probably extend from something that has `start` or `at` or neither (XOR)
//       https://stackoverflow.com/a/53229567/660260
export interface LineOptions {
  direction: CompassDirection
  start?: HexCoordinates
  at?: HexCoordinates
  length?: number
}
