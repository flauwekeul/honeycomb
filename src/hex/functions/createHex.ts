import { CubeCoordinates, DefaultHexPrototype, Hex } from '../types'

export const createHex = <T extends DefaultHexPrototype>(prototype: T, coordinates: CubeCoordinates) =>
  Object.assign(Object.create(prototype), coordinates) as T extends Hex ? T : T & Hex
