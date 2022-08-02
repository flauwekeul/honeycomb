import { CubeCoordinates, PartialCubeCoordinates } from '../types'

/**
 * @category Coordinates
 */
export function completeCubeCoordinates({ q, r, s }: PartialCubeCoordinates): CubeCoordinates {
  const { 0: definedQ, 1: definedR, 2: definedS, length } = [q, r, s].filter(Number.isFinite)

  if (length === 3) return { q, r, s } as CubeCoordinates

  if (length === 2) {
    return (
      definedS == null
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          { q: definedQ, r: definedR, s: -definedQ! - definedR! }
        : definedR == null
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          { q: definedQ, r: -definedQ! - definedS, s: definedS }
        : { q: -definedR - definedS, r: definedR, s: definedS }
    ) as CubeCoordinates
  }

  throw new TypeError(
    `Can't determine three cube coordinates from less than two coordinates. Received: { q: ${q}, r: ${r}, s: ${s} }.`,
  )
}
