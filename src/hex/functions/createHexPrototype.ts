import { normalizeDimensions } from '../../utils'
import { HexPrototype, Orientation } from '../types'

export const defaultPrototype: HexPrototype = {
  dimensions: { xRadius: 1, yRadius: 1 },
  orientation: Orientation.POINTY,
  origin: 0,
  offset: -1,
}

export const createHexPrototype = <T>(prototype: T & Partial<HexPrototype>) => {
  const finalPrototype = { ...defaultPrototype, ...prototype } as T & HexPrototype
  finalPrototype.dimensions = normalizeDimensions(finalPrototype)

  return finalPrototype
}
