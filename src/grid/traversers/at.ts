import { Hex, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const at = <T extends Hex>(coordinates: HexCoordinates): Traverser<T> => (_, getHex) => [getHex(coordinates)]

export const start = at
