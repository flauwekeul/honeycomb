export const enum Orientation {
  FLAT = 'FLAT',
  POINTY = 'POINTY',
}

export interface CubeCoordinates {
  q: number
  r: number
  s: number
}

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
  dimensions: hexDimensions
  orientation: Orientation
  origin: number
  offset: number
}

export type Hex = HexPrototype & CubeCoordinates
