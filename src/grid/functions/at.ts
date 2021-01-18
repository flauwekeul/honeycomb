import { DefaultHexPrototype, HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const at = <T extends DefaultHexPrototype>(cursor: HexCoordinates): Traverser<T> => () => [cursor]

export const start = at
