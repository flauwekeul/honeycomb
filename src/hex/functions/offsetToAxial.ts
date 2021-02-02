import { offsetFromZero } from '../../utils'
import { DefaultHexPrototype, HexCoordinates, OffsetCoordinates } from '../types'

export const offsetToAxialPointy = (col: number, row: number, offset: number): HexCoordinates => ({
  q: col - offsetFromZero(offset, row),
  r: row,
})

export const offsetToAxialFlat = (col: number, row: number, offset: number): HexCoordinates => ({
  q: col,
  r: row - offsetFromZero(offset, col),
})

export const offsetToAxial = (
  { col, row }: OffsetCoordinates,
  { offset, isPointy }: Pick<DefaultHexPrototype, 'offset' | 'isPointy'>,
) => (isPointy ? offsetToAxialPointy(col, row, offset) : offsetToAxialFlat(col, row, offset))
