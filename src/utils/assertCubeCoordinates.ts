import { CubeCoordinates, HexCoordinates, HexPrototype, offsetToCube } from '../hex'
import { isOffset } from './isOffset'

export function assertCubeCoordinates(
  coordinates: HexCoordinates,
  hexPrototype: Pick<HexPrototype, 'offset' | 'isPointy'>,
): CubeCoordinates {
  const { q, r, s = -q - r } = isOffset(coordinates) ? offsetToCube(coordinates, hexPrototype) : coordinates
  return { q, r, s }
}
