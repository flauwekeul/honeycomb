import { offsetFromZero } from '../../utils'
import { Hex } from '../hex'
import { HexOffset, OffsetCoordinates } from '../types'

const hexToOffsetPointy = (q: number, r: number, offset: HexOffset): OffsetCoordinates => ({
  col: q + offsetFromZero(offset, r),
  row: r,
})

const hexToOffsetFlat = (q: number, r: number, offset: HexOffset): OffsetCoordinates => ({
  col: q,
  row: r + offsetFromZero(offset, q),
})

/**
 * @category Hex
 */
export const hexToOffset = ({ q, r, offset, isPointy }: Pick<Hex, 'q' | 'r' | 'offset' | 'isPointy'>) =>
  isPointy ? hexToOffsetPointy(q, r, offset) : hexToOffsetFlat(q, r, offset)
