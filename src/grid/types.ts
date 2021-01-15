import { HexCoordinates } from '../hex'

export enum PointyCompassDirection {
  E,
  SE,
  SW,
  W,
  NW,
  NE,
}

export enum FlatCompassDirection {
  SE,
  S,
  SW,
  NW,
  N,
  NE,
}

export type CompassDirection = PointyCompassDirection | FlatCompassDirection

export interface Traverser {
  (cursor: HexCoordinates): Iterable<HexCoordinates>
}

export interface RectangleOptions {
  width: number
  height: number
  start?: HexCoordinates
  direction?: CompassDirection
}
