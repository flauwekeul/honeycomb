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
export type Orientation = 'pointy' | 'flat'

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
  /**
   * An object with an `xRadius` and `yRadius`. There are two radiuses to make it possible to have "wide" (`xRadius` > `yRadius`) or "tall" (`xRadius` < `yRadius`) hexes.
   */
  dimensions: Ellipse
  /**
   * Either pointy ⬢ (the default) or flat ⬣.
   */
  orientation: Orientation
  /**
   * If a hex is [converted to a point](/api/#hexToPoint), its origin point is crucial.
   * The origin is relative to a hex's center, so an origin of `{ x: 0, y: 0 }` (the default) means its center.
   * An origin of `{ x: 10, y: 5 }` means 10 right and 5 down from the center. `{ x: -5, y: -10 }` means 5 left, 10 up.
   * You get the `Point` 🙃.
   */
  origin: Point
  /**
   * In a grid with pointy hexes, each row is offsetted half a hex relative to the previous row. In grids with flat hexes, this applies to the columns.
   * Redblobgames has a [visual example](https://www.redblobgames.com/grids/hexagons/#coordinates-offset).
   *
   * Set the offset property to `1` or `-1` (the default) to control whether the even or odd rows/columns are offsetted.
   */
  offset: HexOffset
}

/**
 * @category Hex
 */
export type HexOptionsDimensions = Ellipse | BoundingBox | number

/**
 * @category Hex
 */
export type HexOptionsOrigin = Point | 'topLeft'

/**
 * @category Hex
 */
export interface HexOptions {
  dimensions: HexOptionsDimensions
  orientation: Orientation
  origin: HexOptionsOrigin
  offset: HexOffset
}

/**
 * @category Hex
 */
export type HexConstructor<T extends Hex> = new (coordinates?: HexCoordinates) => T
