import { Hex, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const add = <T extends Hex>(...coordinates: HexCoordinates[]): Traverser<T, T[]> => (_, getHex) =>
  coordinates.map(getHex)
