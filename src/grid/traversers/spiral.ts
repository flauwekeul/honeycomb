import { CompassDirection } from '../../compass'
import { Hex, HexCoordinates } from '../../hex'
import { Rotation, Traverser } from '../types'
import { branch } from './branch'
import { line } from './line'
import { ring } from './ring'

export const spiral = <T extends Hex>({ radius, start, at, rotation }: SpiralOptions): Traverser<T, T[]> => (
  cursor,
  getHex,
) => {
  const center = start ? getHex(start) : at ? getHex(at) : cursor
  return branch<T>(line({ start, at, direction: CompassDirection.N, length: radius }), ring({ center, rotation }))(
    getHex(center),
    getHex,
  )
}

export interface SpiralOptions {
  radius: number
  start?: HexCoordinates
  at?: HexCoordinates
  rotation?: Rotation | 'CLOCKWISE' | 'clockwise' | 'COUNTERCLOCKWISE' | 'counterclockwise'
}
