import { Hex, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

/**
 * @category Traverser
 */
export const fromCoordinates =
  <T extends Hex>(...coordinates: HexCoordinates[]): Traverser<T> =>
  (createHex) =>
    coordinates.map(createHex)
