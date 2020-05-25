import { Hex, HexSettings, Orientation, Point } from '../types'
import { heightFlat, heightPointy } from './height'
import { hexToPoint } from './hexToPoint'
import { widthFlat, widthPointy } from './width'

export const cornersPointy = (width: number, height: number, { x, y }: Point) => [
  { x: x + width * 0.5, y: y - height * 0.25 },
  { x: x + width * 0.5, y: y + height * 0.25 },
  { x, y: y + height * 0.5 },
  { x: x - width * 0.5, y: y + height * 0.25 },
  { x: x - width * 0.5, y: y - height * 0.25 },
  { x, y: y - height * 0.5 },
]

export const cornersFlat = (width: number, height: number, { x, y }: Point) => [
  { x: x + width * 0.25, y: y - height * 0.5 },
  { x: x + width * 0.5, y },
  { x: x + width * 0.25, y: y + height * 0.5 },
  { x: x - width * 0.25, y: y + height * 0.5 },
  { x: x - width * 0.5, y },
  { x: x - width * 0.25, y: y - height * 0.5 },
]

// todo: use separate functions for absolute and relative corners?
export const corners = ({ orientation, dimensions: { xRadius, yRadius }, origin }: HexSettings, hex?: Hex): Point[] => {
  const point = hex ? hexToPoint(hex) : origin
  return orientation === Orientation.POINTY
    ? cornersPointy(widthPointy(xRadius), heightPointy(yRadius), point)
    : cornersFlat(widthFlat(xRadius), heightFlat(yRadius), point)
}
