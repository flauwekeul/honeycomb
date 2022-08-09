import { Hex } from '../hex'
import { CubeCoordinates, PartialCubeCoordinates } from '../types'
import { completeCube } from './completeCube'
import { toCube } from './toCube'

/**
 * @category Hex
 */
export function translate<T extends Hex>(hex: T, delta: PartialCubeCoordinates): T
export function translate(coordinates: PartialCubeCoordinates, delta: PartialCubeCoordinates): CubeCoordinates
export function translate<T extends Hex>(
  input: T | PartialCubeCoordinates,
  delta: PartialCubeCoordinates,
): T | CubeCoordinates {
  const { q: deltaQ, r: deltaR, s: deltaS } = completeCube(delta)

  if (input instanceof Hex) {
    const { q, r, s } = toCube(input, input)
    return input.clone({ q: q + deltaQ, r: r + deltaR, s: s + deltaS })
  }

  const { q, r, s } = completeCube(input)
  return { q: q + deltaQ, r: r + deltaR, s: s + deltaS }
}
