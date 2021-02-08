import { CompassDirection } from '../compass'
import { Hex, HexCoordinates } from '../hex'

export interface Traverser<T extends Hex> {
  (cursor: T): Iterable<T>
}

export interface RectangleOptions {
  width: number
  height: number
  start?: HexCoordinates
  direction?: CompassDirection
}
