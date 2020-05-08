import { offsetFromZero } from '../../utils'
import { Hex, Orientation } from '../types'

export const hexToCartesian = (hex: Pick<Hex, 'q' | 'r' | 'offset' | 'orientation'>) => {
  const { q, r, offset, orientation } = hex
  let x: number
  let y: number

  if (orientation === Orientation.POINTY) {
    x = q + offsetFromZero(offset, r)
    y = r
  } else {
    x = q
    y = r + offsetFromZero(offset, q)
  }

  return { x, y }
}
