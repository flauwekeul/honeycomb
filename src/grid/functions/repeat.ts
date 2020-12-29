import { HexCoordinates } from '../../hex'
import { GridGenerator } from '../types'

export const repeat = (amount: number, command: (hex: HexCoordinates) => GridGenerator) =>
  function* next(hex: HexCoordinates) {
    for (let i = 0; i < amount; i++) {
      const hexes = command(hex)
      for (hex of hexes) {
        yield hex
      }
    }
  }
