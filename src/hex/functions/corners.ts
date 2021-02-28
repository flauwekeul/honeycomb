import { Hex, HexSettings, Orientation, Point } from '../types'
import { heightFlat, heightPointy } from './height'
import { hexToPoint } from './hexToPoint'
import { isHex } from './isHex'
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

// todo: add to docs that when passed a hex, its corners relative to the "origin hex" are returned (different per hex coordinates)
// and when passed hexSettings, corners relative to any hex's origin are returned (always the same)
export function corners(hex: Hex): Point[]
export function corners(hexSettings: Omit<HexSettings, 'offset'>): Point[]
export function corners(hexOrHexSettings: Omit<HexSettings, 'offset'>): Point[] {
  const {
    orientation,
    dimensions: { xRadius, yRadius },
  } = hexOrHexSettings
  const point = isHex(hexOrHexSettings) ? hexToPoint(hexOrHexSettings) : hexOrHexSettings.origin
  return orientation === Orientation.POINTY
    ? cornersPointy(widthPointy(xRadius), heightPointy(yRadius), point)
    : cornersFlat(widthFlat(xRadius), heightFlat(yRadius), point)
}
