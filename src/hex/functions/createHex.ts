import { Hex, HexCoordinates } from '../types'
import { isHex } from './isHex'

export const createHex = <T extends Hex>(prototypeOrHex: T, props: HexCoordinates | T = { q: 0, r: 0 }): T =>
  isHex(prototypeOrHex) ? prototypeOrHex.clone(props) : Object.assign(Object.create(prototypeOrHex), props)
