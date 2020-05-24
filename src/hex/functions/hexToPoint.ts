import { Hex, Orientation, Point } from '../types'

export const hexToPoint = ({ orientation, dimensions: { xRadius, yRadius }, q, r }: Hex) =>
  orientation === Orientation.POINTY
    ? ({
        x: xRadius * Math.sqrt(3) * (q + r / 2),
        y: ((yRadius * 3) / 2) * r,
      } as Point)
    : ({
        x: ((xRadius * 3) / 2) * q,
        y: yRadius * Math.sqrt(3) * (r + q / 2),
      } as Point)
