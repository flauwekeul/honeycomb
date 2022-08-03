/**
 * @category Coordinates
 */
export interface Point {
  x: number
  y: number
}

/**
 * @category Hex
 */
export enum Orientation {
  FLAT = 'FLAT',
  POINTY = 'POINTY',
}

/**
 * @category Coordinates
 */
export interface OffsetCoordinates {
  col: number
  row: number
}

/**
 * @category Coordinates
 */
export interface AxialCoordinates {
  q: number
  r: number
}

// todo: Try to use template literal tags to enforce q, r and s sum to 0: https://stackoverflow.com/a/69413070/660260
/**
 * @category Coordinates
 */
export interface CubeCoordinates extends AxialCoordinates {
  s: number
}

/**
 * @category Coordinates
 */
export type PartialCubeCoordinates =
  | { q?: number; r: number; s: number }
  | { q: number; r?: number; s: number }
  | { q: number; r: number; s?: number }

/**
 * @category Coordinates
 */
export type TupleCoordinates = [q: number, r: number, s?: number]

/**
 * @category Coordinates
 */
export type HexCoordinates = PartialCubeCoordinates | OffsetCoordinates | TupleCoordinates

export interface Ellipse {
  xRadius: number
  yRadius: number
}

export interface BoundingBox {
  width: number
  height: number
}

/**
 * @category Hex
 */
export type hexDimensions = Ellipse | BoundingBox | number

/**
 * @category Hex
 */
export interface HexSettings {
  dimensions: Ellipse
  orientation: Orientation
  origin: Point
  offset: number
}

/**
 * @category Hex
 */
export interface HexPrototype extends HexSettings {
  readonly __isHoneycombHex: true
  readonly [Symbol.toStringTag]: 'Hex'
  readonly center: Point
  readonly col: number
  readonly corners: Point[]
  readonly height: number
  readonly isFlat: boolean
  readonly isPointy: boolean
  readonly row: number
  readonly width: number
  readonly x: number
  readonly y: number

  s: number

  equals(this: this, coordinates: HexCoordinates): boolean
  clone(this: this, newProps?: Partial<this> | HexCoordinates): this
  toString(this: this): string
}

/**
 * @category Hex
 */
export interface Hex extends HexPrototype, AxialCoordinates {}
