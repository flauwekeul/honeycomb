import { createHex, Hex } from '../../hex'
import { DIRECTION_COORDINATES } from '../constants'
import { FlatCompassDirection, GridGeneratorFunction, PointyCompassDirection } from '../types'

export const move = <T extends Hex>(
  direction: PointyCompassDirection | FlatCompassDirection,
): GridGeneratorFunction<T> =>
  function* (currentHex) {
    const { q, r } = DIRECTION_COORDINATES[direction]
    const nextCoordinates = { q: currentHex.q + q, r: currentHex.r + r }
    // todo: make createHex accept hex instances or use cloneHex()?
    yield createHex(Object.getPrototypeOf(currentHex), nextCoordinates)
  }
