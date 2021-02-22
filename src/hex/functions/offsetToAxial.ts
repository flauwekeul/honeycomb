import { offsetFromZero } from '../../utils'
import { AxialCoordinates, HexPrototype, OffsetCoordinates } from '../types'

export const offsetToAxialPointy = (col: number, row: number, offset: number): AxialCoordinates => ({
  q: col - offsetFromZero(offset, row),
  r: row,
})

export const offsetToAxialFlat = (col: number, row: number, offset: number): AxialCoordinates => ({
  q: col,
  r: row - offsetFromZero(offset, col),
})

export const offsetToAxial = (
  { col, row }: OffsetCoordinates,
  { offset, isPointy }: Pick<HexPrototype, 'offset' | 'isPointy'>,
) => (isPointy ? offsetToAxialPointy(col, row, offset) : offsetToAxialFlat(col, row, offset))
