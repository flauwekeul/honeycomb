import { CompassDirection } from '../../compass'
import { AxialCoordinates, Hex, offsetToCubeFlat, offsetToCubePointy } from '../../hex'

const DIRECTIONS_POINTY = [
  null, // ambiguous
  { q: 1, r: -1 }, // NE
  { q: 1, r: 0 }, // E
  { q: 0, r: 1 }, // SE
  null, // ambiguous
  { q: -1, r: 1 }, // SW
  { q: -1, r: 0 }, // W
  { q: 0, r: -1 }, // NW
] as AxialCoordinates[]
const DIRECTIONS_FLAT = [
  { q: 0, r: -1 }, // N
  { q: 1, r: -1 }, // NE
  null, // ambiguous
  { q: 1, r: 0 }, // SE
  { q: 0, r: 1 }, // S
  { q: -1, r: 1 }, // SW
  null, // ambiguous
  { q: -1, r: 0 }, // NW
] as AxialCoordinates[]

export const neighborOfPointy = <T extends Hex>({ offset, q, r, col, row }: T, direction: CompassDirection) => {
  if (direction === CompassDirection.S || direction === CompassDirection.N) {
    const nextRow = direction === CompassDirection.S ? row + 1 : row - 1
    return offsetToCubePointy(col, nextRow, offset)
  }
  const neighbor = DIRECTIONS_POINTY[direction]
  return { q: q + neighbor.q, r: r + neighbor.r }
}

export const neighborOfFlat = <T extends Hex>({ offset, q, r, col, row }: T, direction: CompassDirection) => {
  if (direction === CompassDirection.E || direction === CompassDirection.W) {
    const nextCol = direction === CompassDirection.E ? col + 1 : col - 1
    return offsetToCubeFlat(nextCol, row, offset)
  }
  const neighbor = DIRECTIONS_FLAT[direction]
  return { q: q + neighbor.q, r: r + neighbor.r }
}

export const neighborOf = <T extends Hex>(hex: T, direction: CompassDirection) =>
  hex.isPointy ? neighborOfPointy(hex, direction) : neighborOfFlat(hex, direction)
