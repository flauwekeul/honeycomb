import { DIRECTION_COORDINATES } from '../constants'
import { CompassDirection, Traverser } from '../types'

// todo: also accept a string and/or number for direction
// export const move = <T extends Hex>(direction: CompassDirection): Traverser<T> =>
//   function* next(currentHex) {
//     const { q, r } = DIRECTION_COORDINATES[direction]
//     const nextCoordinates = { q: currentHex.q + q, r: currentHex.r + r }
//     // todo: make createHex accept hex instances or use cloneHex()?
//     yield createHex(Object.getPrototypeOf(currentHex), nextCoordinates)
//   }

export const move = (direction: CompassDirection): Traverser => {
  const { q, r } = DIRECTION_COORDINATES[direction]
  return (currentCoordinates) => [{ q: currentCoordinates.q + q, r: currentCoordinates.r + r }]
}
