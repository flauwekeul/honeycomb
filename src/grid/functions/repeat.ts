import { Hex } from '../../hex'
import { GridGenerator } from '../types'

export const repeat = <T extends Hex>(amount: number, command: (hex: T) => GridGenerator<T>) =>
  function* next(hex: T) {
    for (let i = 0; i < amount; i++) {
      const hexes = command(hex)
      for (hex of hexes) {
        yield hex
      }
    }
  }
