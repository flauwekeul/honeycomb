import { CompassDirection } from '../../compass'
import { Hex, HexCoordinates } from '../../hex'
import { RotationLike, Traverser } from '../types'
import { branch } from './branch'
import { line } from './line'
import { ring } from './ring'

export function spiral<T extends Hex>({ radius, start, rotation }: SpiralOptions): Traverser<T, T[]> {
  return function spiralTraverser(createHex, cursor) {
    const center = createHex(start ?? cursor)
    return branch<T>(line({ start, direction: CompassDirection.N, length: radius }), ring({ center, rotation }))(
      createHex,
      cursor,
    )
  }
}

export interface SpiralOptions {
  start?: HexCoordinates
  radius: number
  rotation?: RotationLike
}
