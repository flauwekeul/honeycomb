import { isOffset, isTuple, tupleToCube } from '../../utils'
import { CubeCoordinates, HexCoordinates, HexPrototype } from '../types'
import { completeCubeCoordinates } from './completeCubeCoordinates'
import { offsetToCube } from './offsetToCube'

/**
 * Util for converting offset/axial/cube/tuple coordinates to cube coordinates.
 * @category Coordinates
 * @privateRemarks It's not placed in /src/utils because that causes circular dependencies.
 */
export function assertCubeCoordinates(
  hexPrototype: Pick<HexPrototype, 'offset' | 'isPointy'>,
  coordinates: HexCoordinates,
): CubeCoordinates {
  return isOffset(coordinates)
    ? offsetToCube(hexPrototype, coordinates)
    : isTuple(coordinates)
    ? tupleToCube(coordinates)
    : completeCubeCoordinates(coordinates)
}
