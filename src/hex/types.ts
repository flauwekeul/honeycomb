// todo: move types to single file in /src
// tried it and somehow typescript can't call origin as a function anymore in createHexPrototype.ts normalizeOrigin()

export interface Point {
  x: number
  y: number
}

export enum Orientation {
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

export type OffsetCoordinates = {
  col: number
  row: number
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

export interface HexSettings {
  dimensions: Ellipse
  orientation: Orientation
  origin: Point
  offset: number
}

export interface DefaultHexPrototype extends HexSettings {
  readonly col: number
  readonly corners: Point[]
  readonly height: number
  readonly isFlat: boolean
  readonly isPointy: boolean
  readonly row: number
  readonly width: number

  s: number

  // todo: about 80% sure the newProps type works (it's used in more places, if it works: maybe make it a separate type?)
  copy<T extends Hex>(this: T, newProps?: Partial<T> | HexCoordinates): T
  toPoint<T extends Hex>(this: T): Point
}

export interface Hex extends DefaultHexPrototype, AxialCoordinates {}
