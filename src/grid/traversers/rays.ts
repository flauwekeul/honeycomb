import { assertCubeCoordinates, Hex, HexCoordinates } from '../../hex'
import { RotationLike, Traverser } from '../types'
import { line } from './line'
import { ring } from './ring'

// todo:
// - remove this file? If not: refactor to use repeatWith()?
// - add option for arc in degrees?
// - add to docs that duplicate hexes are returned (or make this configurable? Or add transducer that dedupes?)
export function rays<T extends Hex>(options: RaysWithLengthOptions): Traverser<T, T[]>
export function rays<T extends Hex>(options: RaysToHexOptions): Traverser<T, T[]>
export function rays<T extends Hex>({
  start,
  rotation,
  ...options
}: RaysToHexOptions | RaysWithLengthOptions): Traverser<T, T[]> {
  const { length } = options as RaysWithLengthOptions

  return function raysTraverser(createHex, cursor) {
    const firstHex = createHex(start ?? cursor)
    const { q, r, s } = assertCubeCoordinates(firstHex, firstHex)
    const firstStop = (options as RaysToHexOptions).firstStop ?? { q, r: r - length, s: s + length }

    return ring({ center: firstHex, start: firstStop, rotation })(createHex, cursor).flatMap((stop) =>
      line<T>({ start: firstHex, stop })(createHex, cursor),
    )
  }
}

export interface RaysToHexOptions {
  start?: HexCoordinates
  firstStop: HexCoordinates
  rotation?: RotationLike
}

export interface RaysWithLengthOptions {
  start?: HexCoordinates
  length: number
  rotation?: RotationLike
}
