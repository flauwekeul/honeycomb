import { HexSettings, Orientation, Point } from '../types'
import { round } from './round'

// inspired by https://github.com/gojuno/hexgrid-py
// and simplified by https://www.symbolab.com/solver/simplify-calculator/simplify

/**
 * @category Hex
 */
export const pointToCube = (
  { dimensions: { xRadius, yRadius }, origin, orientation }: Pick<HexSettings, 'dimensions' | 'origin' | 'orientation'>,
  { x, y }: Point,
) => {
  x += origin.x
  y += origin.y

  if (orientation === Orientation.POINTY) {
    return round({ q: (Math.sqrt(3) * x) / (3 * xRadius) - y / (3 * yRadius), r: (2 / 3) * (y / yRadius) })
  }

  return round({ q: (2 / 3) * (x / xRadius), r: (Math.sqrt(3) * y) / (3 * yRadius) - x / (3 * xRadius) })
}
