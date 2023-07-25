import { completeCube, Hex, HexCoordinates, HexOffset, hexToOffset, OffsetCoordinates } from '../../hex'
import { isOffset, isTuple, rotate, tupleToCube } from '../../utils'
import { Direction, Traverser } from '../types'
import { line } from './line'
import { repeatWith } from './repeatWith'

// todo: when passed opposing corners:
//       maybe add option to determine if row or col is traversed first
//       maybe accept an object: { start, stop }, similar to line()
/**
 * @category Traverser
 * @remarks The rectangle will only have 90° corners for the directions North, East, South and West.
 */
export function rectangle<T extends Hex>(options: RectangleOptions): Traverser<T>
export function rectangle<T extends Hex>(cornerA: HexCoordinates, cornerB: HexCoordinates): Traverser<T>
export function rectangle<T extends Hex>(
  optionsOrCornerA: RectangleOptions | HexCoordinates,
  cornerB?: HexCoordinates,
): Traverser<T> {
  return function rectangleTraverser(createHex, cursor) {
    const {
      width,
      height,
      start,
      direction = 'E',
    } = cornerB
      ? optionsFromOpposingCorners(optionsOrCornerA as HexCoordinates, cornerB, createHex())
      : (optionsOrCornerA as RectangleOptions)
    const startCoordinates = start ?? cursor ?? [0, 0]
    const hexes = repeatWith<T>(
      line({ start: startCoordinates, direction: rotate(direction, 2), length: height }),
      line({ direction, length: width - 1 }),
    )(createHex, startCoordinates)

    return !start && cursor ? hexes.slice(1) : hexes
  }
}

/**
 * @category Traverser
 * @remarks The rectangle will only have 90° corners for the directions North, East, South and West.
 */
export interface RectangleOptions {
  start?: HexCoordinates
  width: number
  height: number
  direction?: Direction
}

function optionsFromOpposingCorners(
  cornerA: HexCoordinates,
  cornerB: HexCoordinates,
  { isPointy, offset }: Hex,
): RectangleOptions {
  const { col: cornerACol, row: cornerARow } = assertOffsetCoordinates(cornerA, isPointy, offset)
  const { col: cornerBCol, row: cornerBRow } = assertOffsetCoordinates(cornerB, isPointy, offset)
  const smallestCol = cornerACol < cornerBCol ? 'A' : 'B'
  const smallestRow = cornerARow < cornerBRow ? 'A' : 'B'
  const smallestColRow = (smallestCol + smallestRow) as keyof typeof RULES_FOR_SMALLEST_COL_ROW
  const { swapWidthHeight, direction } = RULES_FOR_SMALLEST_COL_ROW[smallestColRow]
  const width = Math.abs(cornerACol - cornerBCol) + 1
  const height = Math.abs(cornerARow - cornerBRow) + 1

  return {
    width: swapWidthHeight ? height : width,
    height: swapWidthHeight ? width : height,
    start: cornerA,
    direction,
  }
}

// todo: move to util?
function assertOffsetCoordinates(coordinates: HexCoordinates, isPointy: boolean, offset: HexOffset): OffsetCoordinates {
  if (isOffset(coordinates)) return coordinates

  const { q, r } = isTuple(coordinates) ? tupleToCube(coordinates) : completeCube(coordinates)
  return hexToOffset({ q, r, isPointy, offset })
}

const RULES_FOR_SMALLEST_COL_ROW = {
  AA: {
    swapWidthHeight: false,
    direction: 'E' as Direction,
  },
  AB: {
    swapWidthHeight: true,
    direction: 'N' as Direction,
  },
  BA: {
    swapWidthHeight: true,
    direction: 'S' as Direction,
  },
  BB: {
    swapWidthHeight: false,
    direction: 'W' as Direction,
  },
}

/**
 * This is the "old way" of creating rectangles. It's less performant (up until ~40x slower with 200x200 rectangles), but it's able to create
 * actual rectangles (with 90° corners) for the ordinal directions. But because I assume people mostly need rectangles in the cardinal directions,
 * I've decided to drop "true ordinal rectangle" support for now.
 */

// export const RECTANGLE_DIRECTIONS_POINTY = [
//   null, // ambiguous
//   ['q', 's', 'r'], // NE
//   ['q', 'r', 's'], // E
//   ['r', 'q', 's'], // SE
//   null, // ambiguous
//   ['r', 's', 'q'], // SW
//   ['s', 'r', 'q'], // W
//   ['s', 'q', 'r'], // NW
// ] as [keyof CubeCoordinates, keyof CubeCoordinates, keyof CubeCoordinates][]

// export const RECTANGLE_DIRECTIONS_FLAT = [
//   ['s', 'q', 'r'], // N
//   ['q', 's', 'r'], // NE
//   null,
//   ['q', 'r', 's'], // SE
//   ['r', 'q', 's'], // S
//   ['r', 's', 'q'], // SW
//   null,
//   ['s', 'r', 'q'], // NW
// ] as [keyof CubeCoordinates, keyof CubeCoordinates, keyof CubeCoordinates][]

// export const rectangle = <T extends Hex>(
//   hexPrototype: T,
//   {
//     width,
//     height,
//     start = { q: 0, r: 0 },
//     direction = hexPrototype.isPointy ? CompassDirection.E : CompassDirection.SE,
//   }: RectangleOptions,
// ) => {
//   const result: T[] = []
//   const _start: CubeCoordinates = { q: start.q, r: start.r, s: -start.q - start.r }
//   const [firstCoordinate, secondCoordinate, thirdCoordinate] = (hexPrototype.isPointy
//     ? RECTANGLE_DIRECTIONS_POINTY
//     : RECTANGLE_DIRECTIONS_FLAT)[direction]
//   const [firstStop, secondStop] = hexPrototype.isPointy ? [width, height] : [height, width]

//   for (let second = 0; second < secondStop; second++) {
//     // for (let second = 0; second > -secondStop; second--) {
//     const secondOffset = offsetFromZero(hexPrototype.offset, second)

//     for (let first = -secondOffset; first < firstStop - secondOffset; first++) {
//       const nextCoordinates = {
//         [firstCoordinate]: first + _start[firstCoordinate],
//         [secondCoordinate]: second + _start[secondCoordinate],
//         [thirdCoordinate]: -first - second + _start[thirdCoordinate],
//       } as unknown
//       result.push(createHex<T>(hexPrototype, nextCoordinates as CubeCoordinates))
//     }
//   }

//   return result
// }
