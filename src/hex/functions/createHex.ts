import { Hex, HexCoordinates } from '../types'
import { isHex } from './isHex'

export const createHex = <T extends Hex>(prototypeOrHex: T, props: HexCoordinates | T = { q: 0, r: 0 }): T =>
  // if the prototype of the 1st argument is (that of) a hex, the 1st argument is a hex instance
  isHex(Object.getPrototypeOf(prototypeOrHex))
    ? prototypeOrHex.copy(props)
    : Object.assign(Object.create(prototypeOrHex), props)
