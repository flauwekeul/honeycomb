import { CompassDirection } from '../../compass'
import { Hex } from '../../hex'
import { neighborOf } from '../functions'
import { StartOrAt, Traverser } from '../types'

export const line = <T extends Hex>({ direction, start, at, length = 1 }: LineOptions): Traverser<T, T[]> => {
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

export type LineOptions = StartOrAt & {
  direction: CompassDirection
  length?: number
}
