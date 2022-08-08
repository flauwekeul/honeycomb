import { assertCubeCoordinates, Hex, HexCoordinates } from '../../hex'
import { distance } from '../functions'
import { Rotation, RotationLike, Traverser } from '../types'

/**
 * @category Traverser
 */
export function ring<T extends Hex>(options: RingOptions): Traverser<T>
export function ring<T extends Hex>(options: RingFromRadiusOptions): Traverser<T>
export function ring<T extends Hex>(options: RingOptions | RingFromRadiusOptions): Traverser<T> {
  const { center, rotation = Rotation.CLOCKWISE } = options

  return function ringTraverser(createHex, cursor) {
    const _rotation = rotation.toUpperCase() as Rotation
    const hexes: T[] = []
    let { radius } = options as RingFromRadiusOptions
    let firstHex: T

    if (Number.isFinite(radius)) {
      firstHex = createHex(center).translate({ q: radius, s: -radius })
    } else {
      firstHex = createHex((options as RingOptions).start ?? cursor)
      radius = distance(firstHex, center, firstHex)
    }

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

    const skipFirstHex = !(options as RingOptions).start && cursor
    const startIndex = hexes.findIndex((hex) => hex.equals(firstHex))
    // move part of hexes array to the front so that firstHex is actually the first hex
    return hexes.slice(startIndex + (skipFirstHex ? 1 : 0)).concat(hexes.slice(0, startIndex))
  }
}

/**
 * @category Traverser
 */
export interface RingOptions {
  start?: HexCoordinates
  center: HexCoordinates
  rotation?: RotationLike
}

/**
 * @category Traverser
 */
export interface RingFromRadiusOptions {
  center: HexCoordinates
  radius: number
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
