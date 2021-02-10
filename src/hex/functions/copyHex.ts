import { Hex, HexCoordinates } from '../types'

export const copyHex = <T extends Hex>(hex: T, newProps: Partial<T> | HexCoordinates = {}): T =>
  Object.assign(Object.create(Object.getPrototypeOf(hex)), hex, newProps)
