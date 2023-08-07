import { AxialCoordinates, CubeCoordinates, Hex, HexCoordinates, round, toCube } from '../../hex'
import { distance, neighborOf } from '../functions'
import { DIRECTIONS, Direction, Traverser } from '../types'

/**
 * @category Traverser
 */
export function line<T extends Hex>(options: LineAsVectorOptions): Traverser<T>
export function line<T extends Hex>(options: LineBetweenOptions): Traverser<T>
export function line<T extends Hex>(options: LineAsVectorOptions | LineBetweenOptions): Traverser<T> {
  return isLineVectorOptions(options) ? lineFromVectorOptions(options) : lineFromBetweenOptions(options)
}

/**
 * @category Traverser
 */
export interface LineAsVectorOptions {
  start?: HexCoordinates
  direction: Direction
  length: number
}

/**
 * @category Traverser
 */
export interface LineBetweenOptions {
  start?: HexCoordinates
  /**
   * These coordinates are included in the line.
   */
  stop: HexCoordinates
}

function isLineVectorOptions(value: LineAsVectorOptions | LineBetweenOptions): value is LineAsVectorOptions {
  return DIRECTIONS.includes((value as LineAsVectorOptions).direction)
}

function lineFromVectorOptions<T extends Hex>({ start, direction, length }: LineAsVectorOptions): Traverser<T> {
  return function lineTraverser(createHex, cursor) {
    const hexes: T[] = []
    const firstHex = createHex(start ?? cursor)
    let _cursor = firstHex

    if (!start && cursor) {
      // skip the first hex by "shifting" the cursor to the next hex
      _cursor = neighborOf(_cursor, direction)
    }

    for (let i = 0; i < length; i++) {
      hexes.push(_cursor)
      _cursor = neighborOf(_cursor, direction)
    }

    return hexes
  }
}

function lineFromBetweenOptions<T extends Hex>({ start, stop }: LineBetweenOptions): Traverser<T> {
  return function lineTraverser(createHex, cursor) {
    const hexes: T[] = []
    const firstHex = createHex(start ?? cursor)
    const nudgedStart = nudge(firstHex)
    const nudgedStop = nudge(toCube(firstHex, stop))
    const interpolate = lerp(nudgedStart, nudgedStop)
    const length = distance(firstHex, firstHex, stop)
    const step = 1.0 / Math.max(length, 1)
    // skip the first hex by starting an iteration later
    let i = !start && cursor ? 1 : 0

    for (i; i <= length; i++) {
      const coordinates = round(interpolate(step * i))
      hexes.push(createHex(coordinates))
    }

    return hexes
  }
}

function nudge({ q, r, s }: CubeCoordinates): CubeCoordinates {
  return { q: q + 1e-6, r: r + 1e-6, s: s + -2e-6 }
}

// linear interpolation
function lerp(a: CubeCoordinates, b: CubeCoordinates) {
  return (t: number): AxialCoordinates => {
    const q = a.q * (1 - t) + b.q * t
    const r = a.r * (1 - t) + b.r * t
    return { q, r }
  }
}
