import { Hex, HexSettings, Orientation, Point } from '../types'
import { heightFlat, heightPointy } from './height'
import { widthFlat, widthPointy } from './width'

export const cornersPointy = (width: number, height: number, { x, y }: Point) => [
  { x: width - x, y: height * 0.25 - y },
  { x: width - x, y: height * 0.75 - y },
  { x: width * 0.5 - x, y: height - y },
  { x: 0 - x, y: height * 0.75 - y },
  { x: 0 - x, y: height * 0.25 - y },
  { x: width * 0.5 - x, y: 0 - y },
]

export const cornersFlat = (width: number, height: number, { x, y }: Point) => [
  { x: width - x, y: height * 0.5 - y },
  { x: width * 0.75 - x, y: height - y },
  { x: width * 0.25 - x, y: height - y },
  { x: 0 - x, y: height * 0.5 - y },
  { x: width * 0.25 - x, y: 0 - y },
  { x: width * 0.75 - x, y: 0 - y },
]

export const corners = ({ orientation, dimensions: { xRadius, yRadius }, origin }: HexSettings, hex?: Hex): Point[] => {
  const point = hex ? hex.toPoint() : origin
  return orientation === Orientation.POINTY
    ? cornersPointy(widthPointy(xRadius), heightPointy(yRadius), point)
    : cornersFlat(widthFlat(xRadius), heightFlat(yRadius), point)
}
