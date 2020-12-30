import { createHex, Hex } from '../../hex'
import { DIRECTION_COORDINATES } from '../constants'
import { FlatCompassDirection, PointyCompassDirection } from '../types'

export const move = <T extends Hex>(direction: PointyCompassDirection | FlatCompassDirection) =>
  function* next(hex: T) {
    const { q, r } = DIRECTION_COORDINATES[direction]
    // todo: make createHex accept hex instances or use cloneHex()?
    yield createHex(Object.getPrototypeOf(hex), { q: hex.q + q, r: hex.r + r })
  }
