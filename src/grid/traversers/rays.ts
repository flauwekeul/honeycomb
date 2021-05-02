import { assertCubeCoordinates, CubeCoordinates, Hex } from '../../hex'
import { RotationLike, StartOrAt, Traverser } from '../types'
import { line, LineBetweenOptions } from './line'
import { ring } from './ring'

// todo:
// - add option for first ray ()
export const rays = <T extends Hex>({
  at,
  start,
  length,
  rotation,
  updateRay = (_) => _,
}: RaysOptions<T>): Traverser<T> => {
  return (cursor, getHex) => {
    const firstCoordinates = at ?? start ?? cursor
    const { q, r, s } = assertCubeCoordinates(firstCoordinates, cursor)
    // todo: make this configurable: either a direction or end of line?
    const ringStart: CubeCoordinates = { q, r: r - length, s: s + length }

    return ring<T>({ center: firstCoordinates, start: ringStart, rotation })(cursor, getHex)
      .reduce((uniqueHexes, through) => {
        const ray = line<T>({ at, start, through } as LineBetweenOptions)(cursor, getHex)
        updateRay(ray).forEach((hex) => uniqueHexes.set(hex.toString(), hex))
        return uniqueHexes
      }, new Map<string, T>())
      .values()
  }
}

export type RaysOptions<T extends Hex> = StartOrAt & {
  length: number
  // todo: add arc option
  rotation?: RotationLike
  updateRay?: (hexesInRay: T[]) => T[]
}
