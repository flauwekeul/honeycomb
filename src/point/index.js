import { isNumber, isArray, isObject } from 'axis.js'
import * as methods from './prototype'

/**
 * @function Point
 *
 * @description
 * Factory function for creating 2-dimensional points. Accepts a **point-like** and returns a point instance. A point-like can be an object with an `x` and `y` property (e.g. `{ x: 0, y: 0 }`) or an array with 2 items (e.g. `[0, 0]`) that correspond to `x` and `y` respectively.
 *
 * @param {(number|number[]|Object)} [coordinatesOrX=0] The x coordinate or a point-like.
 * @param {number} [coordinatesOrX.x=0]                 The x coordinate.
 * @param {number} [coordinatesOrX.y=0]                 The y coordinate.
 * @param {number} [y=0]                                The y coordinate.
 *
 * @returns {Point}                                     A point object.
 *
 * @example
 * import { Point } from 'Honeycomb'
 *
 * Point()                  // { x: 0, y: 0 }
 * Point(1)                 // { x: 1, y: 1 }
 * Point(1, 2)              // { x: 1, y: 2 }
 *
 * Point([1, 2])            // { x: 1, y: 2 }
 * Point([1])               // { x: 1, y: 1 }
 *
 * Point({ x: 1, y: 2 })    // { x: 1, y: 2 }
 * Point({ x: 1 })          // { x: 1, y: 1 }
 * Point({ y: 2 })          // { x: 2, y: 2 }
 */
export default function Point(coordinatesOrX, y) {
    let coordinates

    if (isNumber(coordinatesOrX)) {
        coordinates = _setMissingCoordinate(coordinatesOrX, y)
    } else if (isArray(coordinatesOrX)) {
        coordinates = _setMissingCoordinate(...coordinatesOrX)
    } else if (isObject(coordinatesOrX)) {
        coordinates = _setMissingCoordinate(coordinatesOrX.x, coordinatesOrX.y)
    } else {
        coordinates = _setMissingCoordinate(0)
    }

    function _setMissingCoordinate(x, y) {
        return {
            x: isNumber(x) ? x : y,
            y: isNumber(y) ? y : x
        }
    }

    return Object.assign(
        Object.create(methods),
        coordinates
    )
}
