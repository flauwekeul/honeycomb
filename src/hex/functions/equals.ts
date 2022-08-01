import { isOffset, isTuple, tupleToCube } from '../../utils'
import { CubeCoordinates, HexCoordinates, OffsetCoordinates } from '../types'

/**
 * @category Hex
 */
export function equals(
  a: Exclude<HexCoordinates, OffsetCoordinates>,
  b: Exclude<HexCoordinates, OffsetCoordinates>,
): boolean
export function equals(a: OffsetCoordinates, b: OffsetCoordinates): boolean
export function equals(a: HexCoordinates, b: HexCoordinates) {
  if (isOffset(a) && isOffset(b)) {
    return a.col === b.col && a.row === b.row
  }

  // can't use isOffset() because that also checks in the prototype chain and that would always return true for hexes
  if (Object.prototype.hasOwnProperty.call(a, 'col') || Object.prototype.hasOwnProperty.call(b, 'col')) {
    throw new Error(
      `Can't compare coordinates where one are offset coordinates. Either pass two offset coordinates or two axial/cube coordinates. Received: ${JSON.stringify(
        a,
      )} and ${JSON.stringify(b)}`,
    )
  }

  const cubeA = (isTuple(a) ? tupleToCube(a) : a) as CubeCoordinates
  const cubeB = (isTuple(b) ? tupleToCube(b) : b) as CubeCoordinates
  return cubeA.q === cubeB.q && cubeA.r === cubeB.r
}
