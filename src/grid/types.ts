import { Hex, HexCoordinates } from '../hex'

export enum Compass {
  E,
  SE,
  S,
  SW,
  W,
  NW,
  N,
  NE,
}

export interface Traverser<T extends Hex> {
  (cursor: T): Iterable<T>
}

export interface RectangleOptions {
  width: number
  height: number
  start?: HexCoordinates
  direction?: Compass
}
