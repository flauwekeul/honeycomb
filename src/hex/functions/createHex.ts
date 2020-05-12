import { CubeCoordinates, Hex, HexPrototype } from '../types'

export const createHex = (hexPrototype: HexPrototype, coordinates: CubeCoordinates) =>
  Object.assign(Object.create(hexPrototype), coordinates) as Hex
