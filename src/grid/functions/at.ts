import { HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const at = (cursor: HexCoordinates): Traverser => () => [cursor]

export const start = at
