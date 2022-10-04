import { Hex } from '../hex'
import { CubeCoordinates, PartialCubeCoordinates } from '../types'
import { completeCube } from './completeCube'

/**
 * @category Hex
 */
export function translate<T extends Hex>(hex: T, delta: PartialCubeCoordinates): T
export function translate(coordinates: PartialCubeCoordinates, delta: PartialCubeCoordinates): CubeCoordinates
export function translate<T extends Hex>(
  input: T | PartialCubeCoordinates,
  delta: PartialCubeCoordinates,
): T | CubeCoordinates {
  const { q, r, s } = completeCube(input)
  const { q: deltaQ, r: deltaR, s: deltaS } = completeCube(delta)
  const translation = { q: q + deltaQ, r: r + deltaR, s: s + deltaS }

  return input instanceof Hex ? input.clone(translation) : translation
}
