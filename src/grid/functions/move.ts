import { DefaultHexPrototype, HexCoordinates } from '../../hex'
import { offsetFromZero } from '../../utils'
import { DIRECTION_COORDINATES } from '../constants'
import { Compass, Traverser } from '../types'

// todo: also accept a string and/or number for direction?
export const move = <T extends DefaultHexPrototype>(direction: Compass, times = 1): Traverser<T> => {
  const { q, r } = DIRECTION_COORDINATES[direction]

  return (cursor, hexPrototype) => {
    const result: HexCoordinates[] = []
    const relativeOffset = (coordinate: number) => offsetFromZero(hexPrototype.offset, coordinate)

    // todo: refactor, move ifs inside single for loop
    if (hexPrototype.isPointy && (direction === Compass.S || direction === Compass.N)) {
      for (let i = 1; i <= times; i++) {
        const cursorCol = cursor.q - relativeOffset(cursor.r)
        const cursorRow = cursor.r
        const addCol = i * q - relativeOffset(i * r)
        const addRow = i * r
        const _q = cursorCol + relativeOffset(cursorRow) + addCol
        const _r = cursorRow + addRow
        result.push({ q: _q, r: _r })
      }
      return result
    }

    if (hexPrototype.isFlat && (direction === Compass.E || direction === Compass.W)) {
      for (let i = 1; i <= times; i++) {
        const cursorCol = cursor.q
        const cursorRow = cursor.r - relativeOffset(cursor.q)
        const addCol = i * q
        const addRow = i * r - relativeOffset(i * q)
        const _q = cursorCol + addCol
        const _r = cursorRow + relativeOffset(cursorCol) + addRow
        result.push({ q: _q, r: _r })
      }
      return result
    }

    for (let i = 1; i <= times; i++) {
      result.push({ q: cursor.q + q * i, r: cursor.r + r * i })
    }
    return result
  }
}
