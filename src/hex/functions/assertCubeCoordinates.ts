import { isOffset, isTuple, tupleToCube } from '../../utils'
import { Hex } from '../hex'
import { CubeCoordinates, HexCoordinates } from '../types'
import { completeCubeCoordinates } from './completeCubeCoordinates'
import { offsetToCube } from './offsetToCube'

/**
 * Util for converting offset/axial/cube/tuple coordinates to cube coordinates.
 * @category Coordinates
 * @privateRemarks It's not placed in /src/utils because that causes circular dependencies.
 */
export function assertCubeCoordinates(
  hex: Pick<Hex, 'offset' | 'isPointy'>,
  coordinates: HexCoordinates,
): CubeCoordinates {
  return isOffset(coordinates)
    ? offsetToCube(hex, coordinates)
    : isTuple(coordinates)
    ? tupleToCube(coordinates)
    : completeCubeCoordinates(coordinates)
}
