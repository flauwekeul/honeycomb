import { Hex } from '../hex'
import { Point } from '../types'

/**
 * @category Hex
 */
export const hexToPoint = ({ orientation, dimensions: { xRadius, yRadius }, origin: { x, y }, q, r }: Hex): Point =>
  orientation === 'pointy'
    ? {
        x: xRadius * Math.sqrt(3) * (q + r / 2) - x,
        y: ((yRadius * 3) / 2) * r - y,
      }
    : {
        x: ((xRadius * 3) / 2) * q - x,
        y: yRadius * Math.sqrt(3) * (r + q / 2) - y,
      }
