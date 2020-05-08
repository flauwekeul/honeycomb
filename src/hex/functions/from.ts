import { Coordinates, isCartesian, isCube } from '../../coordinates'
import { Hex, HexPrototype } from '../types'
import { hexToCartesian } from './hexToCartesian'
import { hexToCube } from './hexToCube'

export const from = (hexPrototype: HexPrototype, coordinates: Coordinates) => {
  if (isCartesian(coordinates)) {
    const { x, y } = coordinates
    return { ...hexPrototype, x, y, ...hexToCube({ ...hexPrototype, x, y }) } as Hex
  } else if (isCube(coordinates)) {
    const { q, r } = coordinates
    return { ...hexPrototype, ...hexToCartesian({ ...hexPrototype, q, r }), ...coordinates } as Hex
  }

  // todo: is this a good default?
  return { ...hexPrototype, x: 0, y: 0, q: 0, r: 0, s: 0 } as Hex
}
