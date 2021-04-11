import { Compass, CompassDirection } from '../../compass'
import { Hex, HexCoordinates, hexToOffset, OffsetCoordinates } from '../../hex'
import { isOffset } from '../../utils'
import { Traverser } from '../types'
import { branch } from './branch'
import { line } from './line'

// todo: add in docs: only 90° corners for cardinal directions
// todo: when passed opposing corners: maybe add option to determine if row or col is traversed first
export function rectangle<T extends Hex>(options: RectangleOptions): Traverser<T>
export function rectangle<T extends Hex>(
  cornerA: HexCoordinates,
  cornerB: HexCoordinates,
  includeCornerA?: boolean,
): Traverser<T>
export function rectangle<T extends Hex>(
  optionsOrCornerA: RectangleOptions | HexCoordinates,
  cornerB?: HexCoordinates,
  includeCornerA = true,
): Traverser<T> {
  return (cursor, getHex) => {
    const { width, height, start, at, direction = CompassDirection.E } = cornerB
      ? optionsFromOpposingCorners(
          optionsOrCornerA as HexCoordinates,
          cornerB,
          cursor.isPointy,
          cursor.offset,
          includeCornerA,
        )
      : (optionsOrCornerA as RectangleOptions)
    const firstHex = start ? getHex(start) : at ? getHex(at) : cursor
    const hexes = branch<T>(
      line({ start: firstHex, direction: Compass.rotate(direction, 2), length: height - 1 }),
      line({ direction, length: width - 1 }),
    )(firstHex, getHex) as T[] // todo: internally, Traverser<T> always returns an array, maybe add a return type var

    return start ? hexes : hexes.slice(1)
  }
}

export interface RectangleOptions {
  width: number
  height: number
  start?: HexCoordinates
  at?: HexCoordinates
  direction?: CompassDirection
}

function optionsFromOpposingCorners(
  cornerA: HexCoordinates,
  cornerB: HexCoordinates,
  isPointy: boolean,
  offset: number,
  includeCornerA: boolean,
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
    [includeCornerA ? 'start' : 'at']: cornerA,
    direction,
  }
}

function assertOffsetCoordinates(cornerA: HexCoordinates, isPointy: boolean, offset: number): OffsetCoordinates {
  return isOffset(cornerA) ? cornerA : hexToOffset({ q: cornerA.q, r: cornerA.r, isPointy, offset })
}

const RULES_FOR_SMALLEST_COL_ROW = {
  AA: {
    swapWidthHeight: false,
    direction: CompassDirection.E,
  },
  AB: {
    swapWidthHeight: true,
    direction: CompassDirection.N,
  },
  BA: {
    swapWidthHeight: true,
    direction: CompassDirection.S,
  },
  BB: {
    swapWidthHeight: false,
    direction: CompassDirection.W,
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
