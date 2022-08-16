import { Hex, HexCoordinates } from '../../hex'
import { Direction, Rotation, Traverser } from '../types'
import { line } from './line'
import { repeatWith } from './repeatWith'
import { ring } from './ring'

/**
 * @category Traverser
 */
export function spiral<T extends Hex>({ radius, start, rotation }: SpiralOptions): Traverser<T> {
  return function spiralTraverser(createHex, cursor) {
    const center = createHex(start ?? cursor)
    return repeatWith<T>(line({ start, direction: Direction.N, length: radius }), ring({ center, rotation }))(
      createHex,
      cursor,
    )
  }
}

/**
 * @category Traverser
 */
export interface SpiralOptions {
  start?: HexCoordinates
  radius: number
  rotation?: Rotation
}
