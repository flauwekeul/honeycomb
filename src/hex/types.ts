// todo: move types to single file in /src
// tried it and somehow typescript can't call origin as a function anymore in createHexPrototype.ts normalizeOrigin()

export interface Point {
  x: number
  y: number
}

export const Orientations = {
  FLAT: 'FLAT',
  POINTY: 'POINTY',
} as const
export type ValueOf<T> = T[keyof T]
export type Orientation = ValueOf<typeof Orientations>

export type OffsetCoordinates = {
  col: number
  row: number
}

export interface AxialCoordinates {
  q: number
  r: number
}

export interface CubeCoordinates extends AxialCoordinates {
  s: number
}

export interface PartialCubeCoordinates extends AxialCoordinates {
  s?: number
}

export type HexCoordinates = PartialCubeCoordinates | OffsetCoordinates

export interface Ellipse {
  xRadius: number
  yRadius: number
}

export interface BoundingBox {
  width: number
  height: number
}

export type hexDimensions = Ellipse | BoundingBox | number

export interface HexSettings {
  dimensions: Ellipse
  orientation: Orientation
  origin: Point
  offset: number
}

export interface HexPrototype extends HexSettings {
  readonly __isHoneycombHex: true
  readonly [Symbol.toStringTag]: 'Hex'
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

  // todo: about 80% sure the newProps type works (it's used in more places, if it works: maybe make it a separate type?)
  clone(this: this, newProps?: Partial<this> | HexCoordinates): this

  toString(this: this): string
}

export interface Hex extends HexPrototype, AxialCoordinates {}
