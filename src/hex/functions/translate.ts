import { CubeCoordinates, Hex, PartialCubeCoordinates } from '../types'
import { assertCubeCoordinates } from './assertCubeCoordinates'
import { completeCubeCoordinates } from './completeCubeCoordinates'
import { isHex } from './isHex'

// todo: add to hex prototype
/**
 * @category Hex
 */
export function translate<T extends Hex>(hex: T, delta: PartialCubeCoordinates): T
export function translate(coordinates: PartialCubeCoordinates, delta: PartialCubeCoordinates): CubeCoordinates
export function translate<T extends Hex>(
  input: T | PartialCubeCoordinates,
  delta: PartialCubeCoordinates,
): T | CubeCoordinates {
  const { q: deltaQ, r: deltaR, s: deltaS } = completeCubeCoordinates(delta)

  if (isHex(input)) {
    const { q, r, s } = assertCubeCoordinates(input, input)
    return input.clone({ q: q + deltaQ, r: r + deltaR, s: s + deltaS })
  }

  const { q, r, s } = completeCubeCoordinates(input)
  return { q: q + deltaQ, r: r + deltaR, s: s + deltaS }
}
