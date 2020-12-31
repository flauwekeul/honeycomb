import { Hex } from '../../hex'
import { GridGeneratorFunction } from '../types'

// todo: looks a lot like Grid.traverse()
export const repeat = <T extends Hex>(amount: number, command: GridGeneratorFunction<T>): GridGeneratorFunction<T> =>
  function* (currentHex) {
    let nextHex = currentHex
    for (let i = 0; i < amount; i++) {
      const hexes = command(nextHex)
      for (const hex of hexes) {
        yield hex
        nextHex = hex
      }
      // todo: yield* command(grid, nextHex)
    }
  }
