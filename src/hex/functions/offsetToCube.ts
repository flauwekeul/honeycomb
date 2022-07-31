import { offsetFromZero } from '../../utils'
import { CubeCoordinates, HexPrototype, OffsetCoordinates } from '../types'

export const offsetToCubePointy = (col: number, row: number, offset: number): CubeCoordinates => {
  const q = col - offsetFromZero(offset, row)
  const r = row
  const s = -q - r
  return { q, r, s }
}

export const offsetToCubeFlat = (col: number, row: number, offset: number): CubeCoordinates => {
  const q = col
  const r = row - offsetFromZero(offset, col)
  const s = -q - r
  return { q, r, s }
}

export const offsetToCube = (
  { offset, isPointy }: Pick<HexPrototype, 'offset' | 'isPointy'>,
  { col, row }: OffsetCoordinates,
) => (isPointy ? offsetToCubePointy(col, row, offset) : offsetToCubeFlat(col, row, offset))
