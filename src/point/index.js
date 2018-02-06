import { isNumber, isArray, isObject } from 'axis.js'

export default function PointFactory({ ensureXY }) {
    /**
     * @function Point
     * @memberof Honeycomb
     * @static
     *
     * @description
     * Factory function for creating two-dimensional points.
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
    return function Point(pointOrX, y) {
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
            return ensureXY(pointOrX, y)
        } else if (isArray(pointOrX)) {
            return ensureXY(...pointOrX)
        } else if (isObject(pointOrX)) {
            return ensureXY(pointOrX.x, pointOrX.y)
        } else {
            return ensureXY(0)
        }
    }
}
