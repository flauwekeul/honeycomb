import { offsetFromZero } from '../../utils'
import { Hex, OffsetCoordinates } from '../types'

const hexToOffsetPointy = (q: number, r: number, offset: number): OffsetCoordinates => ({
  col: q + offsetFromZero(offset, r),
  row: r,
})

const hexToOffsetFlat = (q: number, r: number, offset: number): OffsetCoordinates => ({
  col: q,
  row: r + offsetFromZero(offset, q),
})

/**
 * @category Hex
 */
export const hexToOffset = ({ q, r, offset, isPointy }: Pick<Hex, 'q' | 'r' | 'offset' | 'isPointy'>) =>
  isPointy ? hexToOffsetPointy(q, r, offset) : hexToOffsetFlat(q, r, offset)
