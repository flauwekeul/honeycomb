import { isOffset, isTuple, tupleToCube } from '../../utils'
import { CubeCoordinates, HexCoordinates, HexPrototype } from '../types'
import { offsetToCube } from './offsetToCube'

/**
 * Util for converting offset/axial/cube/tuple coordinates to cube coordinates. It's not placed in /src/utils because that causes circular dependencies.
 * @private
 */
export function assertCubeCoordinates(
  hexPrototype: Pick<HexPrototype, 'offset' | 'isPointy'>,
  coordinates: HexCoordinates,
): CubeCoordinates {
  const {
    q,
    r,
    s = -q - r,
  } = isOffset(coordinates)
    ? offsetToCube(hexPrototype, coordinates)
    : isTuple(coordinates)
    ? tupleToCube(coordinates)
    : coordinates
  return { q, r, s }
}
