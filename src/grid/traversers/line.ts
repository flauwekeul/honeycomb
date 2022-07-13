import { CompassDirection } from '../../compass'
import { AxialCoordinates, CubeCoordinates, Hex, HexCoordinates, PartialCubeCoordinates } from '../../hex'
import { neighborOf } from '../functions'
import { HexGenerator, Traverser, TraverserOptions, XOR } from '../types'

export function line<T extends Hex>(options: LineAsVectorOptions): Traverser<T, HexGenerator<T>>
export function line<T extends Hex>(options: LineBetweenOptions): Traverser<T, HexGenerator<T>>
export function line<T extends Hex>(options: LineAsVectorOptions | LineBetweenOptions): Traverser<T, HexGenerator<T>> {
  return function* lineTraverser(createHex, cursor) {
    const { start } = options

    if ((options as LineAsVectorOptions).direction in CompassDirection) {
      const { direction, length } = options as LineAsVectorOptions
      let _cursor: T | undefined
      let _length = length

      // todo: maybe abstract this to a util?
      if (start || (!start && !cursor)) {
        _cursor = createHex(start)
        _length = length - 1
        yield _cursor
      } else {
        _cursor = createHex(cursor)
      }

      for (let i = 0; i < _length; i++) {
        yield (_cursor = createHex(neighborOf(_cursor, direction)))
      }
    } else {
      // const { until, through } = options as LineBetweenOptions
      // const _start = start ?? at ?? cursor
      // const _through = until ?? (through as HexCoordinates)
      // const startCube = assertCubeCoordinates(_start, cursor)
      // const throughCube = assertCubeCoordinates(_through, cursor)
      // const length = distance(cursor, _start, _through)
      // const step = 1.0 / Math.max(length, 1)
      // for (let i = 1; until ? i < length : i <= length; i++) {
      //   const coordinates = round(lerp(nudge(startCube), nudge(throughCube), step * i))
      //   hexes.push(createHex(coordinates))
      // }
    }
  }
}

export interface LineAsVectorOptions extends TraverserOptions {
  direction: CompassDirection
  length: number
}

export type LineBetweenOptions = TraverserOptions & XOR<{ until: HexCoordinates }, { through: HexCoordinates }>

function nudge({ q, r, s }: CubeCoordinates): CubeCoordinates {
  return { q: q + 1e-6, r: r + 1e-6, s: s + -2e-6 }
}

// linear interpolation
function lerp(a: PartialCubeCoordinates, b: PartialCubeCoordinates, t: number): AxialCoordinates {
  const q = a.q * (1 - t) + b.q * t
  const r = a.r * (1 - t) + b.r * t
  return { q, r }
}
