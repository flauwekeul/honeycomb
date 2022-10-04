import { isOffset, isTuple, tupleToCube } from '../../utils'
import { CubeCoordinates, HexCoordinates, HexSettings } from '../types'
import { completeCube } from './completeCube'
import { offsetToCube } from './offsetToCube'

// todo: make overloads to only require hexSettings when coordinates are offset
/**
 * Util for converting offset/axial/cube/tuple coordinates to cube coordinates.
 * @category Coordinates
 * @privateRemarks It's not placed in /src/utils because that causes circular dependencies.
 */
export function toCube(
  hexSettings: Pick<HexSettings, 'offset' | 'orientation'>,
  coordinates: HexCoordinates,
): CubeCoordinates {
  return isTuple(coordinates)
    ? tupleToCube(coordinates)
    : isOffset(coordinates)
    ? offsetToCube(hexSettings, coordinates)
    : completeCube(coordinates)
}
