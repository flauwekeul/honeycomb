import { isNumber } from '../../utils'
import { CubeCoordinates, PartialCubeCoordinates } from '../types'

/**
 * @category Coordinates
 */
export function completeCube({ q, r, s }: PartialCubeCoordinates): CubeCoordinates {
  const validQ = isNumber(q)
  const validR = isNumber(r)
  const validS = isNumber(s)

  if (validQ && validR && validS) return { q, r, s }

  if (validQ && validR) return { q, r, s: -q - r }

  if (validQ && validS) return { q, r: -q - s, s }

  if (validR && validS) return { q: -r - s, r, s }

  throw new TypeError(
    `Can't determine three cube coordinates from less than two coordinates. Received: { q: ${q}, r: ${r}, s: ${s} }.`,
  )
}
