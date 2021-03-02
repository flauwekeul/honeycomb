import { Hex, HexCoordinates } from '../hex'
import { Grid } from './grid'

export interface Traverser<T extends Hex> {
  (cursor: T, getHex: (coordinates: HexCoordinates) => T): Iterable<T>
}

export interface Callback<T extends Hex, R> {
  (hex: T, grid: Grid<T>): R
}
