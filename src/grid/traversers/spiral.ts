import { CompassDirection } from '../../compass'
import { Hex } from '../../hex'
import { RotationLike, StartOrAt, Traverser } from '../types'
import { branch } from './branch'
import { line, LineAsVectorOptions } from './line'
import { ring } from './ring'

export const spiral = <T extends Hex>({ radius, start, at, rotation }: SpiralOptions): Traverser<T, T[]> => (
  cursor,
  getHex,
) => {
  const center = start ? getHex(start) : at ? getHex(at) : cursor
  return branch<T>(
    line({ start, at, direction: CompassDirection.N, length: radius } as LineAsVectorOptions),
    ring({ center, rotation }),
  )(getHex(center), getHex)
}

export type SpiralOptions = StartOrAt & {
  radius: number
  rotation?: RotationLike
}