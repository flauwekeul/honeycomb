import { isNumber, isString } from 'axis.js'
import { DIAGONAL_DIRECTION_COORDINATES, DIRECTION_COORDINATES } from '../hex/constants'

/**
 * Get a hex from a grid.
 *
 * @memberof Grid#
 * @instance
 *
 * @param {(number|point)} keyOrPoint   An index/key or a point.
 * @returns {hex}                       The found hex or `undefined`.
 *
 * @example
 * const Grid = Honeycomb.defineGrid()
 * const Hex = Grid.Hex
 * const grid = Grid.rectangle({ width: 2, height: 2 })
 *
 * grid.get(0)              // { x: 0, y: 0 }
 * grid.get(Hex(0, 1))      // { x: 0, y: 1 }
 * grid.get({ x: 0, y: 1 }) // { x: 0, y: 1 }
 * grid.get([0, 1])         // { x: 0, y: 1 }
 *
 * grid.get(42)             // undefined
 * grid.get(Hex(6, -2))     // undefined
 */
export function get(keyOrPoint) {
  if (isNumber(keyOrPoint)) {
    return this[keyOrPoint]
  } else {
    return this[this.indexOf(keyOrPoint)]
  }
}

export function setFactory({ isValidHex }) {
  /**
   * Replace a hex with another hex. This is a safe alternative to using bracket notation (`grid[0] = 'invalid'`).
   *
   * If the target hex isn't present in the grid, the new hex is added (using {@link Grid#push}) to the grid.
   * If the new hex is invalid, nothing changes.
   *
   * @memberof Grid#
   * @instance
   *
   * @param {(number|point)} keyOrPoint   The coordinates of the hex that must be replaced.
   * @param {hex} newHex                  The replacing hex.
   *
   * @returns {grid}                      Itself.
   *
   * @example
   * const Grid = Honeycomb.defineGrid()
   * const Hex = Grid.Hex
   * const grid = Grid(Hex(0, 0)) // [ { x: 0, y: 0 } ]
   *
   * // replace a hex:
   * grid.set(0, Hex(1, 1))
   * grid                         // [ { x: 1, y: 1 } ]
   * // the target hex can also be a point:
   * grid.set([1, 1], Hex(2, 2))
   * grid                         // [ { x: 2, y: 2 } ]
   *
   * // invalid replace values are ignored:
   * grid.set(0, 'invalid')
   * grid                         // [ { x: 2, y: 2 } ]
   *
   * // when the target hex isn't present in the grid, the replacing hex is added instead:
   * grid.set({ x: 9, y: 9 }, Hex(3, 3))
   * grid                         // [ { x: 2, y: 2 }, { x: 3, y: 3 } ]
   */
  return function set(keyOrPoint, newHex) {
    if (!isValidHex(newHex)) {
      return this
    }

    const index = isNumber(keyOrPoint) ? keyOrPoint : this.indexOf(keyOrPoint)

    if (index < 0) {
      this.push(newHex)
    } else {
      this[index] = newHex
    }

    return this
  }
}

/**
 * @memberof Grid#
 * @see {@link https://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
 *
 * @param {hex} firstHex    The first hex.
 * @param {hex} lastHex     The last hex.
 *
 * @returns {hex[]}         Array (not a {@link grid}) of hexes in a straight line from `firstHex` to (and including) `lastHex`.
 *
 * @example
 * const Grid = Honeycomb.defineGrid()
 * const Hex = Grid.Hex
 * const grid = Grid.rectangle({ width: 4, height: 4 })
 *
 * grid.hexesBetween(Hex(), Hex(3)) // [
 *                                  //    { x: 0, y: 0 },
 *                                  //    { x: 0, y: 1 },
 *                                  //    { x: 1, y: 1 },
 *                                  //    { x: 2, y: 2 },
 *                                  //    { x: 3, y: 2 },
 *                                  //    { x: 3, y: 3 },
 *                                  // ]
 */
export function hexesBetween(firstHex, lastHex) {
  const distance = firstHex.distance(lastHex)
  const step = 1.0 / Math.max(distance, 1)
  let hexes = []

  for (let i = 0; i <= distance; i++) {
    const hex = firstHex
      .nudge()
      .lerp(lastHex.nudge(), step * i)
      .round()
    hexes.push(this.get(hex))
  }

  return hexes
}

export function hexesInRangeFactory({ isValidHex }) {
  /**
   * @memberof Grid#
   * @instance
   * @see {@link https://www.redblobgames.com/grids/hexagons/#range-coordinate|redblobgames.com}
   *
   * @param {hex} centerHex                   A hex to get surrounding hexes from.
   * @param {number} [range=0]                The range (in hexes) surrounding the center hex.
   * @param {boolean} [includeCenterHex=true] Whether to include the center hex in the result
   *
   * @returns {hex[]}             An array with all hexes surrounding the passed center hex.
   *                              Only hexes that are present in the grid are returned.
   *
   * @throws {Error} When no valid hex is passed.
   *
   * @example
   * const Hex = Honeycomb.extendHex({ orientation: 'pointy' })
   * const Grid = Honeycomb.defineGrid(Hex)
   * const grid = Grid.rectangle({ width: 5, height: 5 })
   *
   * grid.hexesInRange(Hex(2, 2), 2)          // [
   *                                          //    { x: 0, y: 2 },
   *                                          //    { x: 0, y: 3 },
   *                                          //    { x: 1, y: 4 },
   *                                          //    ...
   *                                          //    { x: 3, y: 0 },
   *                                          //    { x: 3, y: 1 },
   *                                          //    { x: 4, y: 2 }
   *                                          // ]
   *
   * // only returns hexes that exist in the grid:
   * grid.hexesInRange(Hex(0, 0), 1)          // [
   *                                          //    { x: 0, y: 0 },
   *                                          //    { x: 0, y: 1 },
   *                                          //    { x: 1, y: 0 }
   *                                          // ]
   *
   * // exclude center hex:
   * grid.hexesInRange(Hex(2, 2), 1, false)   // [
   *                                          //    { x: 1, y: 2 },
   *                                          //    { x: 1, y: 3 },
   *                                          //    { x: 1, y: 1 },
   *                                          //    { x: 2, y: 3 },
   *                                          //    { x: 3, y: 2 }
   *                                          // ]
   */
  return function hexesInRange(centerHex, range = 0, includeCenterHex = true) {
    if (!isValidHex(centerHex)) {
      throw new Error(`Invalid center hex: ${centerHex}.`)
    }

    if (!this.get(centerHex)) {
      throw new Error(`Center hex with coordinates ${centerHex} not present in grid.`)
    }

    let hexes = []

    for (let q = -range; q <= range; q++) {
      for (let r = Math.max(-range, -q - range); r <= Math.min(range, -q + range); r++) {
        const hex = this.get(centerHex.cubeToCartesian({ q: centerHex.q + q, r: centerHex.r + r }))

        if (centerHex.equals(hex) && !includeCenterHex) {
          continue
        }

        hexes.push(hex)
      }
    }

    return hexes.filter(Boolean)
  }
}

export function neighborsOfFactory({ isValidHex, signedModulo, compassToNumberDirection }) {
  /**
   * @memberof Grid#
   * @instance
   * @see {@link https://www.redblobgames.com/grids/hexagons/#neighbors|redblobgames.com}
   *
   * @param {hex} hex
   * A hex to get 1 or more neighbors from.
   * @param {((COMPASS_DIRECTION|number)[]|COMPASS_DIRECTION|number|all)} [directions=all]
   * 1 or more directions. Either (an array of) {@link COMPASS_DIRECTION|compass directions} or numbers or the string `'all'`.
   * @param {boolean} [diagonal=false]
   * Whether to get the diagonal neighbor. See {@link https://www.redblobgames.com/grids/hexagons/#neighbors-diagonal|redblobgames.com}.
   *
   * @returns {hex[]}
   * An array with the neighboring hex for each queried direction or `undefined` if the hex doesn't exist in the grid.
   *
   * @throws {Error} When no valid hex is passed.
   * @throws {Error} When the direction is invalid for the hex.
   *
   * @example
   * const Hex = Honeycomb.extendHex({ orientation: 'pointy' })
   * const Grid = Honeycomb.defineGrid(Hex)
   * // conveniently creates a grid consisting of a hex surrounded by 6 hexes:
   * const grid = Grid.hexagon({ radius: 1 })
   *
   * // all neighbors:
   * grid.neighborsOf(Hex())          // [
   *                                  //    { x: 1, y: 0 },
   *                                  //    { x: 0, y: 1 },
   *                                  //    { x: -1, y: 1 },
   *                                  //    { x: -1, y: 0 },
   *                                  //    { x: -1, y: -1 },
   *                                  //    { x: 0, y: -1 },
   *                                  // ]
   * // specific neighbor:
   * grid.neighborsOf(Hex(), 'NW')    // [{ x: -1, y: -1 }]
   * grid.neighborsOf(Hex(), 4)       // [{ x: -1, y: -1 }]
   *
   * // multiple neighbors:
   * grid.neighborsOf(Hex(), ['SE', 'SW'])    // [
   *                                          //    { x: 0, y: 1 },
   *                                          //    { x: -1, y: 1 }
   *                                          // ]
   *
   * grid.neighborsOf(Hex(), [1, 2])          // [
   *                                          //    { x: 0, y: 1 },
   *                                          //    { x: -1, y: 1 }
   *                                          // ]
   * // diagonal neighbor:
   * grid.neighborsOf(Hex(-1, 0), 'E', true)  // [{ x: 0, y: -1 }]
   *
   * // returns undefined for hexes that aren't present in the grid:
   * grid.neighborsOf(Hex(-1, -1), 'NW')      // [undefined]
   */
  return function neighborsOf(hex, directions = 'all', diagonal = false) {
    if (!isValidHex(hex)) {
      throw new Error(`Invalid hex: ${hex}.`)
    }

    const coordinates = diagonal ? DIAGONAL_DIRECTION_COORDINATES : DIRECTION_COORDINATES

    if (directions === 'all') {
      directions = [0, 1, 2, 3, 4, 5]
    }

    return (directions = []
      // ensure directions is an array
      .concat(directions)
      .map((direction) => {
        // todo: move this to a util, also grid/statics.js#277
        if (isString(direction)) {
          direction = compassToNumberDirection(direction, hex.orientation)
        }

        if (direction < 0 || direction > 5) {
          direction = signedModulo(direction, 6)
        }

        const { q, r } = coordinates[direction]
        return this.get(hex.cubeToCartesian({ q: hex.q + q, r: hex.r + r }))
      }))
  }
}

/**
 * @memberof Grid#
 * @instance
 *
 * @returns {number}    The width of the grid in points/pixels.
 */
export function pointWidth() {
  if (this.length === 0) {
    return 0
  }

  // sort hexes from left to right and take the first and last
  const { 0: mostLeft, length, [length - 1]: mostRight } = this[0].isPointy()
    ? [...this].sort((a, b) => b.s - a.s || a.q - b.q)
    : [...this].sort((a, b) => a.q - b.q)

  return mostRight.toPoint().x - mostLeft.toPoint().x + this[0].width()
}

/**
 * @memberof Grid#
 * @instance
 *
 * @returns {number}    The heigth of the grid in points/pixels.
 */
export function pointHeight() {
  if (this.length === 0) {
    return 0
  }

  // sort hexes from top to bottom and take the first and last
  const { 0: mostUp, length, [length - 1]: mostDown } = this[0].isPointy()
    ? [...this].sort((a, b) => a.r - b.r)
    : [...this].sort((a, b) => b.s - a.s || a.r - b.r)

  return mostDown.toPoint().y - mostUp.toPoint().y + this[0].height()
}
