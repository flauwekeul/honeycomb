import { offsetFromZero } from '../../utils'
import { Hex } from '../hex'
import { CubeCoordinates, HexOffset, OffsetCoordinates } from '../types'

/**
 * @hidden
 */
export const offsetToCubePointy = (col: number, row: number, offset: HexOffset): CubeCoordinates => {
  const q = col - offsetFromZero(offset, row)
  const r = row
  const s = -q - r
  return { q, r, s }
}

/**
 * @hidden
 */
export const offsetToCubeFlat = (col: number, row: number, offset: HexOffset): CubeCoordinates => {
  const q = col
  const r = row - offsetFromZero(offset, col)
  const s = -q - r
  return { q, r, s }
}

/**
 * @category Hex
 */
export const offsetToCube = ({ offset, isPointy }: Pick<Hex, 'offset' | 'isPointy'>, { col, row }: OffsetCoordinates) =>
  isPointy ? offsetToCubePointy(col, row, offset) : offsetToCubeFlat(col, row, offset)
