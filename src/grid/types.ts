import { Hex, HexCoordinates } from '../hex'
import { Grid } from './grid'

export interface GetPrevHexesFn<T extends Hex> {
  (this: Grid<T>): Iterable<T>
}

export interface Traverser<T extends Hex> {
  (cursor: T, getHex: GetOrCreateHexFn<T>): Iterable<T>
}

export interface GetOrCreateHexFn<T extends Hex> {
  (coordinates: HexCoordinates): T
}

export type eachCallbackFn<T extends Hex> = (value: T, grid: Grid<T>) => void

export type mapCallbackFn<T extends Hex> = (value: T, grid: Grid<T>) => T
