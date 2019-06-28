import { isNumber, isArray, isObject } from 'axis.js'
import * as methods from './prototype'

/**
 * See {@link Point}.
 *
 * @function Point
 * @memberof Honeycomb
 * @static
 */

export default function PointFactory({ ensureXY }) {
  const prototype = {
    add: methods.addFactory({ Point }),
    subtract: methods.subtractFactory({ Point }),
    multiply: methods.multiplyFactory({ Point }),
    divide: methods.divideFactory({ Point }),
  }

  /**
   * Factory function for creating two-dimensional points.
   *
   * @function Point
   *
   * @param {(number|number[]|point)} [pointOrX=] The x coordinate or an array with 2 numbers or an object with an `x` and `y` coordinate.
   * @param {number} [pointOrX.x=]                The x coordinate.
   * @param {number} [pointOrX.y=]                The y coordinate.
   * @param {number} [y=]                         The y coordinate.
   *
   * @returns {point}                             A point.
   *
   * @example
   * const Point = Honeycomb.Point
   *
   * Point()                  // { x: 0, y: 0 }
   * Point(1)                 // { x: 1, y: 1 }
   * Point(1, 2)              // { x: 1, y: 2 }
   *
   * Point([])                // { x: 0, y: 0 }
   * Point([1])               // { x: 1, y: 1 }
   * Point([1, 2])            // { x: 1, y: 2 }
   *
   * Point({})                // { x: 0, y: 0 }
   * Point({ x: 1 })          // { x: 1, y: 1 }
   * Point({ y: 2 })          // { x: 2, y: 2 }
   * Point({ x: 1, y: 2 })    // { x: 1, y: 2 }
   */
  function Point(pointOrX, y) {
    let coordinates
    /**
     * An object with just an `x` and a `y` property.
     *
     * Create your own:
     * ```javascript
     * const point = { x: 1, y: 2 }
     * ```
     *
     * Or use the included {@link Point} factory:
     * ```javascript
     * const point = Honeycomb.Point(1, 2)
     * ```
     *
     * @typedef {Object} point
     * @property {number} x (horizontal) x coordinate
     * @property {number} y (vertical) y coordinate
     */

    if (isNumber(pointOrX)) {
      coordinates = ensureXY(pointOrX, y)
    } else if (isArray(pointOrX)) {
      coordinates = ensureXY(...pointOrX)
    } else if (isObject(pointOrX)) {
      coordinates = ensureXY(pointOrX.x, pointOrX.y)
    } else {
      coordinates = ensureXY(0)
    }

    return Object.assign(Object.create(prototype), coordinates)
  }

  return Point
}
