import { HexCoordinates } from '../../hex'

export const at = (hex: HexCoordinates) =>
  function* next() {
    yield hex
  }

export const start = at
