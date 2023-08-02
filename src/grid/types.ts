import { AxialCoordinates, Hex, HexCoordinates, HexSettings } from '../hex'

/**
 * @category Traverser
 */
export type Traverser<T extends Hex, R extends Iterable<T> = T[]> = (
  createHex: (coordinates?: HexCoordinates) => T,
  cursor?: HexCoordinates,
) => R

/**
 * 'cw' for clockwise and 'ccw' for counterclockwise
 *
 * @category Traverser
 */
export type Rotation = 'cw' | 'ccw'

/**
 * @category Grid
 */
export interface GridAsJSON<T extends AxialCoordinates = AxialCoordinates> {
  hexSettings: HexSettings
  coordinates: T[]
}

/**
 * @category Grid
 */
export const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const

/**
 * @category Grid
 */
export type Direction = (typeof DIRECTIONS)[number]

/**
 * @category Grid
 */
export interface HexStore<T extends Hex> {
  readonly size: number
  getHex(coordinates: HexCoordinates): T | undefined
  hasHex(hex: T): boolean
  setHexes(hexesOrCoordinates: Iterable<T | HexCoordinates>): this
}

/**
 * @category Grid
 */
export interface HexIterable<T extends Hex> extends Iterable<T>, HexStore<T> {
  [Symbol.iterator](): IterableIterator<T>
  filter(predicate: (hex: T) => boolean): HexIterable<T>
  map(fn: (hex: T) => T): HexIterable<T>
  forEach(fn: (hex: T) => void): this
  reduce(reducer: (previousHex: T, currentHex: T) => T): T
  reduce(reducer: (previousHex: T, currentHex: T) => T, initialValue: T): T
  reduce<R>(reducer: (result: R, hex: T) => R, initialValue: R): R
  toArray(): T[]
}

/**
 * @category Grid
 */
export interface HexTraversable<T extends Hex> extends HexStore<T> {
  createHex(coordinates?: HexCoordinates): T
  traverse(traversers: Traverser<T> | Traverser<T>[], options?: { bail?: boolean }): HexTraversable<T>
  traverse(hexes: Iterable<T>, options?: { bail?: boolean }): HexTraversable<T>
  traverse(grid: HexTraversable<T>, options?: { bail?: boolean }): HexTraversable<T>
}
