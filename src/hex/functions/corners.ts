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

/**
 * When passed a **{@link Hex}**, its corners relative to the **"origin hex"** (with coordinates `[0, 0]`) is returned. This is different for every hex.
 *
 * When passed **{@link HexSettings}**, the corners relative to its **own origin** is returned. This is the same for every hex.
 *
 * @category Hex
 */
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
