import { Hex, HexCoordinates } from '../hex'
import { Grid } from './grid'

export interface Traverser<T extends Hex, R extends Iterable<T> = Iterable<T>> {
  (cursor: T, getHex: (coordinates: HexCoordinates) => T): R
}

export interface Callback<T extends Hex, R> {
  (hex: T, grid: Grid<T>): R
}

export enum Rotation {
  CLOCKWISE = 'CLOCKWISE',
  COUNTERCLOCKWISE = 'COUNTERCLOCKWISE',
}
