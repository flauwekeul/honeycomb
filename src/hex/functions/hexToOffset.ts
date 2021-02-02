import { offsetFromZero } from '../../utils'
import { Hex, OffsetCoordinates } from '../types'

export type hexToOffsetArgs = Pick<Hex, 'q' | 'r' | 'offset' | 'isPointy'>

export const hexToOffsetPointy = (q: number, r: number, offset: number): OffsetCoordinates => ({
  col: q + offsetFromZero(offset, r),
  row: r,
})

export const hexToOffsetFlat = (q: number, r: number, offset: number): OffsetCoordinates => ({
  col: q,
  row: r + offsetFromZero(offset, q),
})

export const hexToOffset = ({ q, r, offset, isPointy }: hexToOffsetArgs) =>
  isPointy ? hexToOffsetPointy(q, r, offset) : hexToOffsetFlat(q, r, offset)
