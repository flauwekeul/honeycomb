import { Hex, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const fromCoordinates =
  <T extends Hex>(...coordinates: HexCoordinates[]): Traverser<T, T[]> =>
  (createHex) =>
    coordinates.map(createHex)
