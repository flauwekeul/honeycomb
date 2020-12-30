import { createHex, Hex, HexCoordinates } from '../../hex'

export const at = <T extends Hex>(coordinates: HexCoordinates) =>
  function* next(hex: T) {
    // todo: make createHex accept hex instances or use cloneHex()?
    yield createHex(Object.getPrototypeOf(hex), coordinates)
  }

export const start = at
