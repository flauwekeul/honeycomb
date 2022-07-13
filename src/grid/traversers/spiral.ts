import { RotationLike, TraverserOptions } from '../types'

// export const spiral = <T extends Hex>({ radius, start, at, rotation }: SpiralOptions): Traverser<T, T[]> => (
//   cursor,
//   createHex,
// ) => {
//   const center = start ? createHex(start) : at ? createHex(at) : cursor
//   return branch<T>(
//     line({ start, at, direction: CompassDirection.N, length: radius } as LineAsVectorOptions),
//     ring({ center, rotation }),
//   )(createHex(center), createHex)
// }

export interface SpiralOptions extends TraverserOptions {
  radius: number
  rotation?: RotationLike
}
