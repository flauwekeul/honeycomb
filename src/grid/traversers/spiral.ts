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
    // radius excludes the center, so 1 is added to radius
    // only when there's a cursor but no start, radius can be used as-is, because then line() already increases its length by 1
    const length = !start && cursor ? radius : radius + 1
    return repeatWith<T>(line({ start, direction: Direction.N, length }), ring({ center, rotation }))(createHex, cursor)
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
