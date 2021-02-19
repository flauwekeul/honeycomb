import { Hex, HexCoordinates } from '../hex'

export interface Traverser<T extends Hex> {
  (cursor: T, getHex: GetOrCreateHexFn<T>): Iterable<T>
}

export interface GetOrCreateHexFn<T extends Hex> {
  (coordinates: HexCoordinates): T
}

export type HexMap<T extends Hex> = Map<string, T>
