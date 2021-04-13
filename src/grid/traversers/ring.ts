import { Hex, HexCoordinates } from '../../hex'
import { assertCubeCoordinates } from '../../utils'
import { distance } from '../functions'
import { Rotation, Traverser } from '../types'

export const ring = <T extends Hex>({ start, at, center, rotation }: RingOptions): Traverser<T, T[]> => (
  cursor,
  getHex,
) => {
  rotation = (rotation?.toUpperCase() as Rotation) ?? Rotation.CLOCKWISE
  const firstHex = start ? getHex(start) : at ? getHex(at) : cursor
  const radius = distance(cursor, center, firstHex)
  const hexes: T[] = []
  // always start at coordinates radius away from the center, reorder the hexes later
  const { q, r, s } = assertCubeCoordinates(center, cursor)
  let _cursor = getHex({ q, r: r - radius, s: s + radius })

  if (rotation === Rotation.CLOCKWISE) {
    for (let direction = 0; direction < 6; direction++) {
      for (let i = 0; i < radius; i++) {
        const { q, r } = DIRECTION_COORDINATES[direction]
        _cursor = getHex({ q: _cursor.q + q, r: _cursor.r + r })
        hexes.push(_cursor)
      }
    }
  } else {
    for (let direction = 5; direction >= 0; direction--) {
      for (let i = 0; i < radius; i++) {
        const { q, r } = DIRECTION_COORDINATES[direction]
        _cursor = getHex({ q: _cursor.q - q, r: _cursor.r - r })
        hexes.push(_cursor)
      }
    }
  }

  const startIndex = hexes.findIndex((hex) => hex.equals(firstHex))
  // move part of hexes array to the front so that firstHex is actually the first hex
  return hexes.slice(startIndex + (start ? 0 : 1)).concat(hexes.slice(0, startIndex))
}

export interface RingOptions {
  center: HexCoordinates
  start?: HexCoordinates
  at?: HexCoordinates
  rotation?: Rotation | 'CLOCKWISE' | 'clockwise' | 'COUNTERCLOCKWISE' | 'counterclockwise'
}

const DIRECTION_COORDINATES = [
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
]
