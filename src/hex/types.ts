export const enum Orientation {
  FLAT = 'FLAT',
  POINTY = 'POINTY',
}

export interface CubeCoordinates {
  q: number
  r: number
  s: number
}

export interface HexPrototype {
  size: number
  orientation: Orientation
  origin: number
  offset: number
}

export type Hex = HexPrototype & CubeCoordinates
