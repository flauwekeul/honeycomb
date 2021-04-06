import { Hex, HexCoordinates } from '../../hex'
import { assertCubeCoordinates } from '../../utils'
import { distance } from '../functions'
import { Traverser } from '../types'

export const ring = <T extends Hex>({
  center,
  start,
  rotation = Rotation.CLOCKWISE,
}: RingOptions = {}): Traverser<T> => (cursor, getHex) => {
  center ??= cursor
  start ??= { q: cursor.q, r: cursor.r - 1, s: cursor.s + 1 }
  rotation = rotation.toUpperCase() as Rotation

  const radius = distance(cursor, center, start)
  const { q, r, s } = assertCubeCoordinates(center, cursor)
  const hexes: T[] = []
  let _cursor = getHex({ q, r: r - radius, s: s + radius })

  if (rotation === Rotation.CLOCKWISE) {
    for (let direction = 0; direction < 6; direction++) {
      for (let i = 0; i < radius; i++) {
        hexes.push(_cursor)
        const { q, r } = DIRECTION_COORDINATES[direction]
        _cursor = getHex({ q: _cursor.q + q, r: _cursor.r + r })
      }
    }
  } else {
    for (let direction = 5; direction >= 0; direction--) {
      for (let i = 0; i < radius; i++) {
        hexes.push(_cursor)
        const { q, r } = DIRECTION_COORDINATES[direction]
        _cursor = getHex({ q: _cursor.q - q, r: _cursor.r - r })
      }
    }
  }

  const startIndex = hexes.findIndex((hex) => hex.equals(start as HexCoordinates))
  return startIndex === 0 ? hexes : hexes.slice(startIndex).concat(hexes.slice(0, startIndex))
}

export enum Rotation {
  CLOCKWISE = 'CLOCKWISE',
  COUNTERCLOCKWISE = 'COUNTERCLOCKWISE',
}

export interface RingOptions {
  center?: HexCoordinates
  start?: HexCoordinates
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
