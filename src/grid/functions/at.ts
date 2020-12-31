import { createHex, Hex, HexCoordinates } from '../../hex'
import { GridGeneratorFunction } from '../types'

export const at = <T extends Hex>(coordinates: HexCoordinates): GridGeneratorFunction<T> =>
  function* (currentHex) {
    // todo: make createHex accept hex instances or use cloneHex()?
    yield createHex(Object.getPrototypeOf(currentHex), coordinates)
  }

export const start = at
