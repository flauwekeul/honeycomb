import { isAxial } from '../../utils'
import { AxialCoordinates, HexCoordinates, OffsetCoordinates } from '../types'

export const equals = (a: HexCoordinates, b: HexCoordinates) =>
  // when the 2nd coordinates is axial, assume the first is too
  // when equals() is used as a hex method, the 1st coordinates is that of the hex itself which is always axial
  isAxial(b) ? equalsAxial(a as AxialCoordinates, b) : equalsOffset(a as OffsetCoordinates, b as OffsetCoordinates)

function equalsAxial(a: AxialCoordinates, b: AxialCoordinates) {
  return a.q === b.q && a.r === b.r
}

function equalsOffset(a: OffsetCoordinates, b: OffsetCoordinates) {
  return a.col === b.col && a.row === b.row
}
