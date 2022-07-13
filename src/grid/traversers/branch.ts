import { Hex } from '../../hex'
import { HexGenerator } from '../types'

/**
 * For each hex from `source` traverses over hex coordinates from `traverser`
 * @param source    Each hex in the source is passed one-by-one as a cursor to the traverser
 * @param branch Receives each hex coordinates from source as the start cursor
 */
// export const branch =
//   <T extends Hex>(source: Traverser<T> | Traverser<T>[], branch: Traverser<T> | Traverser<T>[]): Traverser<T, T[]> =>
//   (cursor, createHex) => {
//     const flatBranch = concat(branch)
//     const hexes: T[] = []
//     let _cursor = createHex(cursor)

//     for (const sourceCursor of concat(source)(_cursor, createHex)) {
//       _cursor = sourceCursor
//       hexes.push(_cursor)
//       for (const branchCursor of flatBranch(_cursor, createHex)) {
//         hexes.push(branchCursor)
//       }
//     }

//     return hexes
//   }

export function* branchGenerator<T extends Hex>(source: HexGenerator<T>, branch: HexGenerator<T>) {
  for (const sourceHex of source) {
    yield sourceHex
    // fixme: no cursor, so no way to start branch at the correct hex
    // could be fixed by making `branch` a function that's passed `sourceHex`, but maybe `branchGenerator` is just obsolete
    yield* branch
  }
}
