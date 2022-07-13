import { Hex } from '../../hex'
import { RotationLike, TraverserOptions } from '../types'

// todo:
// - add option for first ray ()
// export const rays = <T extends Hex>({
//   at,
//   start,
//   length,
//   rotation,
//   updateRay = (_) => _,
// }: RaysOptions<T>): Traverser<T> => {
//   return (cursor, createHex) => {
//     const firstCoordinates = at ?? start ?? cursor
//     const { q, r, s } = assertCubeCoordinates(firstCoordinates, cursor)
//     // todo: make this configurable: either a direction or end of line?
//     const ringStart: CubeCoordinates = { q, r: r - length, s: s + length }

//     return ring<T>({ center: firstCoordinates, start: ringStart, rotation })(cursor, createHex)
//       .reduce((uniqueHexes, through) => {
//         const ray = line<T>({ at, start, through } as LineBetweenOptions)(cursor, createHex)
//         updateRay(ray).forEach((hex) => uniqueHexes.set(hex.toString(), hex))
//         return uniqueHexes
//       }, new Map<string, T>())
//       .values()
//   }
// }

export interface RaysOptions<T extends Hex> extends TraverserOptions {
  length: number
  // todo: add arc option
  rotation?: RotationLike
  updateRay?: (hexesInRay: T[]) => T[]
}
