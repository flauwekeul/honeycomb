import { HexCoordinates } from '../../hex'
import { Traverser } from '../types'

export const at = (coordinates: HexCoordinates): Traverser => () => [coordinates]

export const start = at
