import { Hex } from './hex'

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
export interface CubeCoordinates {
  q: number
  r: number
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
export type HexOffset = 1 | -1

/**
 * @category Hex
 */
export interface HexSettings {
  dimensions: Ellipse
  orientation: Orientation
  origin: Point
  offset: HexOffset
}

/**
 * @category Hex
 */
export interface HexOptions {
  dimensions: Ellipse | BoundingBox | number
  orientation: Orientation
  origin: Point | 'topLeft'
  offset: HexOffset
}

/**
 * @category Hex
 */
export type HexConstructor<T extends Hex> = new (coordinates?: HexCoordinates) => T
