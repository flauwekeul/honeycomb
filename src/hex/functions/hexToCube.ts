import { CubeCoordinates } from '../../coordinates'
import { offsetFromZero } from '../../utils'
import { Hex, Orientation } from '../types'

export const hexToCube = (hex: Pick<Hex, 'x' | 'y' | 'offset' | 'orientation'>) => {
  const { x, y, offset, orientation } = hex
  let q: number
  let r: number

  if (orientation === Orientation.POINTY) {
    q = x - offsetFromZero(offset, y)
    r = y
  } else {
    q = x
    r = y - offsetFromZero(offset, x)
  }

  return { q, r, s: -q - r } as CubeCoordinates
}
