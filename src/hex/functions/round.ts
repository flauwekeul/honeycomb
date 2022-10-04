import { CubeCoordinates, PartialCubeCoordinates } from '../types'
import { completeCube } from './completeCube'

/**
 * @category Hex
 */
export const round = (coordinates: PartialCubeCoordinates): CubeCoordinates => {
  const { q, r, s } = completeCube(coordinates)
  let roundedQ = Math.round(q)
  let roundedR = Math.round(r)
  let roundedS = Math.round(s)
  const diffQ = Math.abs(q - roundedQ)
  const diffR = Math.abs(r - roundedR)
  const diffS = Math.abs(s - roundedS)

  if (diffQ > diffR && diffQ > diffS) {
    roundedQ = -roundedR - roundedS
  } else if (diffR > diffS) {
    roundedR = -roundedQ - roundedS
  } else {
    roundedS = -roundedQ - roundedR
  }

  return { q: roundedQ, r: roundedR, s: roundedS }
}
