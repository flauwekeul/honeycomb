import { createHex, Hex } from '../../hex'
import { DIRECTION_COORDINATES } from '../constants'
import { CompassDirection, GridGeneratorFunction } from '../types'

// todo: also accept a string and/or number for direction
export const move = <T extends Hex>(direction: CompassDirection): GridGeneratorFunction<T> =>
  function* (currentHex) {
    const { q, r } = DIRECTION_COORDINATES[direction]
    const nextCoordinates = { q: currentHex.q + q, r: currentHex.r + r }
    // todo: make createHex accept hex instances or use cloneHex()?
    yield createHex(Object.getPrototypeOf(currentHex), nextCoordinates)
  }
