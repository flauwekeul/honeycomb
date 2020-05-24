import { DefaultHexPrototype, Hex, HexCoordinates } from '../types'

export const createHex = <T extends DefaultHexPrototype>(prototype: T, { q, r, s }: HexCoordinates) =>
  Object.assign(Object.create(prototype), { q, r, s }) as T extends Hex ? T : T & Hex
