import { AxialCoordinates, Hex, offsetToCubeFlat, offsetToCubePointy, PartialCubeCoordinates } from '../../hex'
import { Direction } from '../types'

const DIRECTIONS_POINTY = {
  N: {}, // ambiguous
  NE: { q: 1, r: -1 },
  E: { q: 1, r: 0 },
  SE: { q: 0, r: 1 },
  S: {}, // ambiguous
  SW: { q: -1, r: 1 },
  W: { q: -1, r: 0 },
  NW: { q: 0, r: -1 },
} as Record<Direction, AxialCoordinates>
const DIRECTIONS_FLAT = {
  N: { q: 0, r: -1 },
  NE: { q: 1, r: -1 },
  E: {}, // ambiguous
  SE: { q: 1, r: 0 },
  S: { q: 0, r: 1 },
  SW: { q: -1, r: 1 },
  W: {}, // ambiguous
  NW: { q: -1, r: 0 },
} as Record<Direction, AxialCoordinates>

const neighborOfPointy = <T extends Hex>(
  { offset, q, r, col, row }: T,
  direction: Direction,
): PartialCubeCoordinates => {
  if (direction === 'S' || direction === 'N') {
    const nextRow = direction === 'S' ? row + 1 : row - 1
    return offsetToCubePointy(col, nextRow, offset)
  }
  const neighbor = DIRECTIONS_POINTY[direction]
  return { q: q + neighbor.q, r: r + neighbor.r }
}

const neighborOfFlat = <T extends Hex>({ offset, q, r, col, row }: T, direction: Direction): PartialCubeCoordinates => {
  if (direction === 'E' || direction === 'W') {
    const nextCol = direction === 'E' ? col + 1 : col - 1
    return offsetToCubeFlat(nextCol, row, offset)
  }
  const neighbor = DIRECTIONS_FLAT[direction]
  return { q: q + neighbor.q, r: r + neighbor.r }
}

// todo: add option that makes it possible to return 2 hexes for ambiguous directions
export const neighborOf = <T extends Hex>(hex: T, direction: Direction): T =>
  hex.clone(hex.isPointy ? neighborOfPointy(hex, direction) : neighborOfFlat(hex, direction))
