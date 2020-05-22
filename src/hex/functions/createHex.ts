import { AxialCoordinates, CubeCoordinates, DefaultHexPrototype, Hex } from '../types'

export const createHex = <T extends DefaultHexPrototype>(prototype: T, { q, r }: AxialCoordinates | CubeCoordinates) =>
  Object.assign(Object.create(prototype), { q, r }) as T extends Hex ? T : T & Hex
