import { CompassDirection } from '../../compass'
import {
  assertCubeCoordinates,
  AxialCoordinates,
  CubeCoordinates,
  Hex,
  HexCoordinates,
  PartialCubeCoordinates,
  round,
} from '../../hex'
import { distance, neighborOf } from '../functions'
import { StartOrAt, Traverser, XOR } from '../types'

export function line<T extends Hex>(options: LineAsVectorOptions): Traverser<T, T[]>
export function line<T extends Hex>(options: LineBetweenOptions): Traverser<T, T[]>
export function line<T extends Hex>(options: LineAsVectorOptions | LineBetweenOptions): Traverser<T, T[]> {
  return (cursor, getHex) => {
    const { start, at } = options
    const startHex = start && getHex(start)
    const hexes: T[] = startHex ? [startHex] : []

    if ((options as LineAsVectorOptions).direction in CompassDirection) {
      const { direction, length = 1 } = options as LineAsVectorOptions
      let _cursor = startHex ?? (at ? getHex(at) : cursor)

      for (let i = 1; i <= length; i++) {
        _cursor = getHex(neighborOf(_cursor, direction))
        hexes.push(_cursor)
      }
    } else {
      const { until, through } = options as LineBetweenOptions
      const _start = start ?? at ?? cursor
      const _through = until ?? (through as HexCoordinates)
      const startCube = assertCubeCoordinates(_start, cursor)
      const throughCube = assertCubeCoordinates(_through, cursor)
      const length = distance(cursor, _start, _through)
      const step = 1.0 / Math.max(length, 1)

      for (let i = 1; until ? i < length : i <= length; i++) {
        const coordinates = round(lerp(nudge(startCube), nudge(throughCube), step * i))
        hexes.push(getHex(coordinates))
      }
    }

    return hexes
  }
}

export type LineAsVectorOptions = StartOrAt & {
  direction: CompassDirection
  length?: number
}

export type LineBetweenOptions = StartOrAt & XOR<{ until: HexCoordinates }, { through: HexCoordinates }>

function nudge({ q, r, s }: CubeCoordinates): CubeCoordinates {
  return { q: q + 1e-6, r: r + 1e-6, s: s + -2e-6 }
}

// linear interpolation
function lerp(a: PartialCubeCoordinates, b: PartialCubeCoordinates, t: number): AxialCoordinates {
  const q = a.q * (1 - t) + b.q * t
  const r = a.r * (1 - t) + b.r * t
  return { q, r }
}
