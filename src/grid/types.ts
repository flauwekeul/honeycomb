import { DefaultHexPrototype, HexCoordinates } from '../hex'

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

export interface Traverser<T extends DefaultHexPrototype> {
  (cursor: HexCoordinates, hexPrototype: T): Iterable<HexCoordinates>
}

export interface RectangleOptions {
  width: number
  height: number
  start?: HexCoordinates
  direction?: Compass
}
