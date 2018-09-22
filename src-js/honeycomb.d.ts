declare function defineGrid<T = HexFactory<{}>>(Hex?: HexFactory<T>): GridFactory<Hex<T>>

export interface GridFactory<T> {
  (arrayOrHex?: T[] | T, ...hexes: T[]): Grid<T>
  isValidHex(value: any): boolean
  pointToHex(pointOrX?: PointCoordinates, y?: number): T
  parallelogram(options: {
    width: number
    height: number
    start?: HexCoordinates
    direction?: 1 | 3 | 5
    onCreate?: onCreateCallback<T>
  }): Grid<T>
  triangle(options: {
    size: number
    start?: HexCoordinates
    direction?: 1 | 5
    onCreate?: onCreateCallback<T>
  }): Grid<T>
  hexagon(options: { radius: number; center?: HexCoordinates; onCreate?: onCreateCallback<T> }): Grid<T>
  rectangle(options: {
    width: number
    height: number
    start?: HexCoordinates
    direction?: CompassDirection | number
    onCreate?: onCreateCallback<T>
  }): Grid<T>
  ring(options: { radius: number; center?: HexCoordinates; onCreate?: onCreateCallback<T> }): Grid<T>
  spiral(options: { radius: number; center?: HexCoordinates; onCreate?: onCreateCallback<T> }): Grid<T>
}

export type onCreateCallback<T> = (hex: Hex<T>, grid: Grid<T>) => void

export class Grid<T = Hex<{}>> extends Array<T> {
  // defined in class:
  fill(): never
  includes(point: PointCoordinates, fromIndex?: number): boolean
  indexOf(point: PointCoordinates, fromIndex?: number): number
  lastIndexOf(point: PointCoordinates, fromIndex?: number): number
  push(...hexes: T[]): number
  splice(start: number, deleteCount: number, ...hexes: T[]): Grid<T>
  unshift(...hexes: T[]): number

  // inherited from Array.prototype:
  concat(...items: Array<T | ConcatArray<T>>): Grid<T>
  filter(callbackfn: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): Grid<T>
  find(predicate: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): T | undefined
  findIndex(predicate: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): number
  forEach(callbackfn: (hex: T, index: number, grid: Grid<T>) => void, thisArg?: any): void
  map<U>(callbackfn: (hex: T, index: number, grid: Grid<T>) => U, thisArg?: any): Grid<U>
  reduce<U>(callbackfn: (previousValue: U, hex: T, index: number, grid: Grid<T>) => U, initialValue?: U): U
  reduceRight<U>(callbackfn: (previousValue: U, hex: T, index: number, grid: Grid<T>) => U, initialValue?: U): U
  reverse(): Grid<T>
  some(callbackfn: (hex: T, index: number, grid: Grid<T>) => any, thisArg?: any): boolean

  // defined in prototype:
  get(keyOrPoint: number | PointCoordinates): T | undefined
  hexesBetween(firstHex: T, lastHex: T): T[]
  hexesInRange(centerHex: T, range?: number, includeCenterHex?: boolean): T[]
  neighborsOf(
    hex: T,
    directions?: CompassDirection[] | number[] | CompassDirection | number | 'all',
    diagonal?: boolean,
  ): T[]
  pointHeight(): number
  pointWidth(): number
  set(keyOrPoint: number | PointCoordinates, newHex?: T): this
}

export const enum PointyCompassDirection {
  E = 'E',
  SE = 'SE',
  SW = 'SW',
  W = 'W',
  NW = 'NW',
  NE = 'NE',
}
export const enum FlatCompassDirection {
  SE = 'SE',
  S = 'S',
  SW = 'SW',
  NW = 'NW',
  N = 'N',
  NE = 'NE',
}
export type CompassDirection = PointyCompassDirection | FlatCompassDirection

declare function extendHex<P = {}>(prototype?: P | Hex<P>): HexFactory<P>

export interface HexFactory<P = {}> {
  (xOrProps?: HexCoordinates | P, y?: number, customProps?: P): Hex<P>
  thirdCoordinate(firstCoordinate: number, secondCoordinate: number): number
}

export type HexCoordinates = PointCoordinates | CubeCoordinates

export type Hex<T> = {
  [P in keyof T]: T[P]
} &
  BaseHex<T>

export interface BaseHex<T> extends PointLike {
  __isHoneycombHex: true
  orientation: 'pointy' | 'flat'
  origin: number
  size: { xRadius: number; yRadius: number } | { width: number; height: number } | number
  offset: number
  q: number
  r: number
  s: number
  add(point: PointCoordinates): Hex<T>
  cartesian(): PointLike
  cartesianToCube(pointOrX?: PointCoordinates, y?: number): CubeCoordinates
  center(): Point
  coordinates(): PointLike
  corners(): Point[]
  cube(): CubeCoordinates
  cubeToCartesian(cubeCoordinates: { q: number; r: number; s?: number }): PointLike
  distance(hex: CubeCoordinates): number
  equals(point: PointCoordinates): boolean
  fromPoint(pointOrX?: PointCoordinates, y?: number): Hex<T>
  height(): number
  isFlat(): boolean
  isPointy(): boolean
  lerp(hex: { q: number; r: number; s?: number }, t: number): Hex<T>
  nudge(): Hex<T>
  round(): Hex<T>
  set(): Hex<T>
  subtract(point: PointCoordinates): Hex<T>
  toCartesian(cubeCoordinates: { q: number; r: number; s?: number }): PointLike
  toCube(pointOrX?: PointCoordinates, y?: number): CubeCoordinates
  toPoint(): Point
  toString(): string
  width(): number
}

export interface CubeCoordinates {
  q: number
  r: number
  s: number
}

declare function PointFactory(pointOrX?: PointCoordinates, y?: number): Point

export interface Point extends PointLike {
  add(pointOrX?: PointCoordinates, y?: number): Point
  subtract(pointOrX?: PointCoordinates, y?: number): Point
  multiply(pointOrX?: PointCoordinates, y?: number): Point
  divide(pointOrX?: PointCoordinates, y?: number): Point
}

export interface PointLike {
  x: number
  y: number
}

export type PointCoordinates = number | [number, number] | Partial<PointLike>

type Partial<T> = {
  [P in keyof T]?: T[P]
}

export { defineGrid, extendHex, PointFactory as Point }
