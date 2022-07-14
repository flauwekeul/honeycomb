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
import { HexGenerator, Traverser, TraverserOptions } from '../types'

export function line<T extends Hex>(options: LineAsVectorOptions): Traverser<T, HexGenerator<T>>
export function line<T extends Hex>(options: LineBetweenOptions): Traverser<T, HexGenerator<T>>
export function line<T extends Hex>(options: LineAsVectorOptions | LineBetweenOptions): Traverser<T, HexGenerator<T>> {
  return function* lineTraverser(createHex, cursor) {
    const { start } = options

    if ((options as LineAsVectorOptions).direction in CompassDirection) {
      const { direction, length } = options as LineAsVectorOptions
      let _cursor: T | undefined
      let _length = length

      // todo: refactor
      if (!start && cursor) {
        _cursor = createHex(cursor)
      } else {
        yield (_cursor = createHex(start))
        _length = length - 1
      }

      for (let i = 0; i < _length; i++) {
        yield (_cursor = createHex(neighborOf(_cursor, direction)))
      }
    } else {
      const { stop } = options as LineBetweenOptions
      let skipFirst = !start && cursor
      let _cursor = createHex(start ?? cursor)
      const startCube = assertCubeCoordinates(_cursor, _cursor)
      const stopCube = assertCubeCoordinates(_cursor, stop)
      const length = distance(_cursor, _cursor, stop)
      const step = 1.0 / Math.max(length, 1)

      for (let i = 0; i <= length; i++) {
        // todo: refactor
        if (skipFirst) {
          skipFirst = false
          continue
        }
        const approximateHex = lerp(nudge(startCube), nudge(stopCube), step * i)
        yield (_cursor = createHex(round(approximateHex)))
      }
    }
  }
}

export interface LineAsVectorOptions extends TraverserOptions {
  direction: CompassDirection
  length: number
}

export interface LineBetweenOptions extends TraverserOptions {
  /**
   * These coordinates are included in the line.
   */
  stop: HexCoordinates
}

function nudge({ q, r, s }: CubeCoordinates): CubeCoordinates {
  return { q: q + 1e-6, r: r + 1e-6, s: s + -2e-6 }
}

// linear interpolation
function lerp(a: PartialCubeCoordinates, b: PartialCubeCoordinates, t: number): AxialCoordinates {
  const q = a.q * (1 - t) + b.q * t
  const r = a.r * (1 - t) + b.r * t
  return { q, r }
}
