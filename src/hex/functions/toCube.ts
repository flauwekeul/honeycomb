import { isOffset, isTuple, tupleToCube } from '../../utils'
import { Hex } from '../hex'
import { CubeCoordinates, HexCoordinates } from '../types'
import { completeCube } from './completeCube'
import { offsetToCube } from './offsetToCube'

/**
 * Util for converting offset/axial/cube/tuple coordinates to cube coordinates.
 * @category Coordinates
 * @privateRemarks It's not placed in /src/utils because that causes circular dependencies.
 */
export function toCube(hex: Pick<Hex, 'offset' | 'isPointy'>, coordinates: HexCoordinates): CubeCoordinates {
  return isTuple(coordinates)
    ? tupleToCube(coordinates)
    : isOffset(coordinates)
    ? offsetToCube(hex, coordinates)
    : completeCube(coordinates)
}
