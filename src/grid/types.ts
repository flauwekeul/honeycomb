import { Hex, HexCoordinates } from '../hex'
import { Grid } from './grid'

export interface PrevHexState<T extends Hex> {
  hexes: Iterable<T>
  cursor: T | null
}

export interface GetPrevHexState<T extends Hex, S extends GridStore<T>> {
  (this: Grid<T, S>): PrevHexState<T>
}

export interface Traverser<T extends Hex> {
  (cursor: T, getHex: GetOrCreateHexFn<T>): Iterable<T>
}

export interface GetOrCreateHexFn<T extends Hex> {
  (coordinates: HexCoordinates): T
}

export interface GridStore<T extends Hex> {
  get(id: string): T | undefined
}
