import { Hex, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const at = <T extends Hex>(coordinates: HexCoordinates): Traverser<T> => (cursor) => [cursor.copy(coordinates)]

export const start = at
