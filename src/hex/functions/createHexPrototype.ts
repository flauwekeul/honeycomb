import { HexPrototype, Orientation } from '../types'

export const defaultPrototype: HexPrototype = {
  size: 1,
  orientation: Orientation.POINTY,
  origin: 0,
  offset: -1,
}

export const createHexPrototype = <T>(prototype: T & Partial<HexPrototype>) =>
  ({ ...defaultPrototype, ...prototype } as T & HexPrototype)
