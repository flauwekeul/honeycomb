import { HexCoordinates } from '../../hex'
import { DIRECTION_COORDINATES } from '../constants'
import { CompassDirection, Traverser } from '../types'

// todo: also accept a string and/or number for direction?
export const move = (direction: CompassDirection, times = 1): Traverser => {
  const { q, r } = DIRECTION_COORDINATES[direction]
  return (cursor) => {
    const result: HexCoordinates[] = []
    for (let i = 1; i <= times; i++) {
      result.push({ q: cursor.q + q * i, r: cursor.r + r * i })
    }
    return result
  }
}
