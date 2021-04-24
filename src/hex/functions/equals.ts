import { isAxial, isTuple } from '../../utils'
import { AxialCoordinates, HexCoordinates, OffsetCoordinates, TupleCoordinates } from '../types'

// todo: a and b shouldn't have to be the same kind of coordinates
export const equals = (a: HexCoordinates, b: HexCoordinates) =>
  // when the 2nd coordinates is axial, assume the first is too
  // when equals() is used as a hex method, the 1st coordinates is that of the hex itself which is always axial
  isAxial(b)
    ? equalsAxial(a as AxialCoordinates, b)
    : isTuple(a)
    ? equalsTuple(a, b as TupleCoordinates)
    : equalsOffset(a as OffsetCoordinates, b as OffsetCoordinates)

function equalsAxial(a: AxialCoordinates, b: AxialCoordinates) {
  return a.q === b.q && a.r === b.r
}

function equalsOffset(a: OffsetCoordinates, b: OffsetCoordinates) {
  return a.col === b.col && a.row === b.row
}

function equalsTuple(a: TupleCoordinates, b: TupleCoordinates) {
  return a[0] === b[0] && a[1] === b[1]
}
