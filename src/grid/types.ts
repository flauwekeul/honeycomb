import { HexCoordinates } from '../hex'

export enum CompassDirection {
  E,
  SE,
  S,
  SW,
  W,
  NW,
  N,
  NE,
}

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

export type GridGenerator = Generator<HexCoordinates, void>
