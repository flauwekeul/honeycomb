import { assertCubeCoordinates, Hex, HexCoordinates } from '../../hex'
import { distance } from '../functions'
import { Rotation, RotationLike, Traverser } from '../types'

export function ring<T extends Hex>({ start, center, rotation = Rotation.CLOCKWISE }: RingOptions): Traverser<T, T[]> {
  return function ringTraverser(createHex, cursor) {
    const _rotation = rotation?.toUpperCase() as Rotation
    const firstHex = createHex(start ?? cursor)
    const radius = distance(firstHex, center, firstHex)
    const hexes: T[] = []
    // always start at coordinates radius away from the center, reorder the hexes later
    const { q, r, s } = assertCubeCoordinates(firstHex, center)
    let _cursor = createHex({ q, r: r - radius, s: s + radius })

    if (_rotation === Rotation.CLOCKWISE) {
      for (let direction = 0; direction < 6; direction++) {
        for (let i = 0; i < radius; i++) {
          const { q, r } = DIRECTION_COORDINATES[direction]
          _cursor = createHex({ q: _cursor.q + q, r: _cursor.r + r })
          hexes.push(_cursor)
        }
      }
    } else {
      for (let direction = 5; direction >= 0; direction--) {
        for (let i = 0; i < radius; i++) {
          const { q, r } = DIRECTION_COORDINATES[direction]
          _cursor = createHex({ q: _cursor.q - q, r: _cursor.r - r })
          hexes.push(_cursor)
        }
      }
    }

    const startIndex = hexes.findIndex((hex) => hex.equals(firstHex))
    // move part of hexes array to the front so that firstHex is actually the first hex
    return hexes.slice(startIndex + (start ? 0 : 1)).concat(hexes.slice(0, startIndex))
  }
}

export interface RingOptions {
  start?: HexCoordinates
  center: HexCoordinates
  rotation?: RotationLike
}

const DIRECTION_COORDINATES = [
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
]
