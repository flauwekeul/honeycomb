import { Hex, HexCoordinates } from '../hex'
import { Grid } from './grid'

export interface HexState<T extends Hex> {
  hexes: T[]
  cursor: T | null
}

export interface GetPrevHexState<T extends Hex> {
  (this: Grid<T>): HexState<T>
}

export interface Traverser<T extends Hex> {
  (cursor: T, getHex: (coordinates: HexCoordinates) => T): Iterable<T>
}
