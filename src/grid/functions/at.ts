import { createHex, Hex, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const at = <T extends Hex>(coordinates: HexCoordinates): Traverser<T> =>
  function* next(currentHex) {
    // todo: make createHex accept hex instances or use cloneHex()?
    yield createHex(Object.getPrototypeOf(currentHex), coordinates)
  }

export const start = at
