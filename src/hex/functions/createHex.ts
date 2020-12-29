import { DefaultHexPrototype, Hex, HexCoordinates } from '../types'

export const createHex = <T extends DefaultHexPrototype>(prototype: T, { q, r, s = -q - r }: HexCoordinates) =>
  // fixme: when `prototype` is a hex instance, an object with that instance as prototype is created...
  // either only accept a hex prototype or check if `prototype` is a hex instance and then clone it?
  // todo: make coordinates readonly
  Object.assign(Object.create(prototype), { q, r, s }) as T extends Hex ? T : T & Hex
