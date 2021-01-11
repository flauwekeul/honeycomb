import { HexCoordinates } from '../../hex'
import { Traverser } from '../types'

// todo: looks a lot like Grid.traverse()

// export const repeat = <T extends Hex>(amount: number, command: Traverser<T>): Traverser<T> =>
//   function* next(currentHex) {
//     let nextHex = currentHex
//     for (let i = 0; i < amount; i++) {
//       const hexes = command(nextHex)
//       for (const hex of hexes) {
//         yield hex
//         nextHex = hex
//       }
//       // todo: yield* command(grid, nextHex)
//     }
//   }

export const repeat = (amount: number, ...commands: Traverser[]): Traverser => (currentCoordinates) => {
  const result: HexCoordinates[] = []
  let coordinates = currentCoordinates

  for (let i = 0; i < amount; i++) {
    for (const command of commands) {
      for (const nextCoordinates of command(coordinates)) {
        coordinates = nextCoordinates
        result.push(coordinates)
      }
    }
  }

  return result
}
