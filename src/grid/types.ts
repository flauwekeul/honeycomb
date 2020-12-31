import { Hex } from '../hex'

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

export type GridGenerator<T extends Hex> = Generator<T, void>

export interface GridGeneratorFunction<T extends Hex> {
  (currentHex: T): GridGenerator<T>
}
