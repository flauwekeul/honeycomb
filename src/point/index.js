import { isNumber, isArray, isObject } from 'axis.js'

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
    if (isNumber(coordinatesOrX)) {
        return _setMissingCoordinate(coordinatesOrX, y)
    } else if (isArray(coordinatesOrX)) {
        return _setMissingCoordinate(...coordinatesOrX)
    } else if (isObject(coordinatesOrX)) {
        const { x, y } = coordinatesOrX
        return _setMissingCoordinate(x, y)
    } else {
        return _setMissingCoordinate(0)
    }
}

function _setMissingCoordinate(x, y) {
    return {
        x: isNumber(x) ? x : y,
        y: isNumber(y) ? y : x
    }
}
