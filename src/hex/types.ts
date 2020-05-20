// todo: move types to single file in /src

export interface Point {
  x: number
  y: number
}

export const enum Orientation {
  FLAT = 'FLAT',
  POINTY = 'POINTY',
}

export interface CubeCoordinates {
  q: number
  r: number
  s: number
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

export interface HexPrototype {
  dimensions: Ellipse
  orientation: Orientation
  origin: CartesianCoordinates
  offset: number
}

export type Hex = HexPrototype & CubeCoordinates
