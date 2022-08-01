import { Hex, HexPrototype, Point } from '../types'
import { isHex } from './isHex'

/**
 * When passed a **{@link Hex}**, its center relative to the **"origin hex"** (with coordinates `[0, 0]`) is returned. This is different for every hex.
 *
 * When passed a **{@link HexPrototype}**, the center relative to its **own origin** is returned. This is the same for every hex.
 *
 * @category Hex
 */
export function center(hexOrPrototype: Hex | Pick<HexPrototype, 'width' | 'height' | 'origin'>): Point {
  const { width, height } = hexOrPrototype
  const { x, y } = isHex(hexOrPrototype) ? hexOrPrototype : hexOrPrototype.origin
  return { x: width / 2 - x, y: height / 2 - y }
}
