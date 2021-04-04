import { Hex, HexPrototype, Point } from '../types'
import { isHex } from './isHex'

// todo: add to docs that when passed a hex, its center relative to the "origin hex" are returned (different per hex coordinates)
// and when passed hex prototype, its center relative to any hex's origin are returned (always the same)
export function center(hexOrPrototype: Hex | Pick<HexPrototype, 'width' | 'height' | 'origin'>): Point {
  const { width, height } = hexOrPrototype
  const { x, y } = isHex(hexOrPrototype) ? hexOrPrototype : hexOrPrototype.origin
  return { x: width / 2 - x, y: height / 2 - y }
}
