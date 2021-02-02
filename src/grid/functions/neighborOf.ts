import { AxialCoordinates, Hex, offsetToAxialFlat, offsetToAxialPointy } from '../../hex'
import { Compass } from '../types'

const DIRECTION_COORDINATES: AxialCoordinates[] = [
  { q: 1, r: 0 },
  { q: 0, r: 1 },
  { q: -1, r: 1 },
  { q: -1, r: 0 },
  { q: 0, r: -1 },
  { q: 1, r: -1 },
]

export const neighborOf = <T extends Hex>(hex: T, direction: Compass) => {
  if ((direction === Compass.S || direction === Compass.N) && hex.isPointy) {
    const nextRow = direction === Compass.S ? hex.row + 1 : hex.row - 1
    return offsetToAxialPointy(hex.col, nextRow, hex.offset)
  }

  if ((direction === Compass.E || direction === Compass.W) && hex.isFlat) {
    const nextCol = direction === Compass.E ? hex.col + 1 : hex.col - 1
    return offsetToAxialFlat(nextCol, hex.row, hex.offset)
  }

  const neighbor = DIRECTION_COORDINATES[direction]
  return { q: hex.q + neighbor.q, r: hex.r + neighbor.r }
}
