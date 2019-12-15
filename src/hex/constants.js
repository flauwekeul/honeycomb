/**
 * How rows/columns of hexes are placed relative to each other.
 *
 * An even offset:
 * * places **even rows** of **pointy hexes** half a hex right of the odd rows;
 * * places **even columns** of **flat hexes** half a hex down of the odd rows;
 *
 * An odd offset:
 * * places **odd rows** of **pointy hexes** half a hex right of the even rows;
 * * places **odd columns** of **flat hexes** half a hex down of the even rows;
 *
 * @name OFFSET
 *
 * @see {@link https://www.redblobgames.com/grids/hexagons/#coordinates-offset|redblobgames.com}
 *
 * @readonly
 * @enum {number}
 *
 * @property {number} even  +1
 * @property {number} odd   -1
 */

export const DIRECTION_COORDINATES = [
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
  { q: -1, r: 0, s: 1 },
  { q: 0, r: -1, s: 1 },
  { q: 1, r: -1, s: 0 },
]

export const DIAGONAL_DIRECTION_COORDINATES = [
  { q: 2, r: -1, s: -1 },
  { q: 1, r: 1, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -2, r: 1, s: 1 },
  { q: -1, r: -1, s: 2 },
  { q: 1, r: -2, s: 1 },
]

export const EPSILON = { q: 1e-6, r: 1e-6, s: -2e-6 }
