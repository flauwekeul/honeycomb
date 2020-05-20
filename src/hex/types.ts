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

export interface DefaultHexPrototype {
  readonly dimensions: Ellipse
  readonly orientation: Orientation
  readonly origin: CartesianCoordinates
  readonly offset: number
}

export interface HexPrototype extends DefaultHexPrototype {
  readonly corners: Point[]
  readonly height: number
  readonly isFlat: boolean
  readonly isPointy: boolean
  readonly width: number

  toPoint(): Point
}

export type Hex = HexPrototype & CubeCoordinates
