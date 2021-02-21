import { Hex, HexCoordinates } from '../hex'
import { Grid } from './grid'

export interface PrevHexState<T extends Hex> {
  hexes: Iterable<T>
  cursor: T | null
}

export interface GetPrevHexState<T extends Hex> {
  (this: Grid<T>): PrevHexState<T>
}

export interface Traverser<T extends Hex> {
  (cursor: T, getHex: GetOrCreateHexFn<T>): Iterable<T>
}

export interface GetOrCreateHexFn<T extends Hex> {
  (coordinates: HexCoordinates): T
}
