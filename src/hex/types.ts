// todo: move types to single file in /src

export interface Point {
  x: number
  y: number
}

export const enum Orientation {
  FLAT = 'FLAT',
  POINTY = 'POINTY',
}

export interface AxialCoordinates {
  q: number
  r: number
}

export interface CubeCoordinates extends AxialCoordinates {
  s: number
}

export interface HexCoordinates extends AxialCoordinates {
  s?: number
}

export type CartesianCoordinates = Point

export interface Ellipse {
  xRadius: number
  yRadius: number
}

export interface Rectangle {
  width: number
  height: number
}

export type hexDimensions = Ellipse | Rectangle | number

export interface HexSettings {
  readonly dimensions: Ellipse
  readonly orientation: Orientation
  readonly origin: Point
  readonly offset: number
}

export interface DefaultHexPrototype extends HexSettings {
  readonly corners: Point[]
  readonly height: number
  readonly isFlat: boolean
  readonly isPointy: boolean
  readonly width: number

  _s: number
  s: number

  toPoint(this: Hex): Point
}

export interface Hex extends DefaultHexPrototype, AxialCoordinates {}
