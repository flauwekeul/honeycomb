import { isOffset } from '../../utils/isOffset'
import { CubeCoordinates, HexCoordinates, HexPrototype } from '../types'
import { offsetToCube } from './offsetToCube'

/**
 * Util for converting offset/axial/cube coordinates to cube coordinates. It's not placed in /src/utils because that causes circular dependencies.
 * @private
 */
export function assertCubeCoordinates(
  coordinates: HexCoordinates,
  hexPrototype: Pick<HexPrototype, 'offset' | 'isPointy'>,
): CubeCoordinates {
  const { q, r, s = -q - r } = isOffset(coordinates) ? offsetToCube(coordinates, hexPrototype) : coordinates
  return { q, r, s }
}
