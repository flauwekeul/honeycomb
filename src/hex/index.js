import { isObject, isNumber, isArray } from 'axis.js'

import { ensureXY } from '../utils'
import { ORIENTATION, OFFSET } from './constants'
import PointFactory from '../point'
import * as statics from './statics'
import * as methods from './prototype'

const Point = PointFactory({ ensureXY })

export const staticMethods = {
    thirdCoordinate: statics.thirdCoordinate
}

export default function extendHexFactory({ ensureXY }) {
    /**
     * @function extendHex
     *
     * @memberof Honeycomb
     * @static
     *
     * @description
     * This function can be used to create custom hexes by extending the default Hex prototype.
     *
     * All properties of the object passed to `extendHex()` will be added to the prototype of the resulting {@link Hex} factory.
     * To add properties to individual hexes (instances), pass them to the {@link Hex} factory.
     *
     * @todo validate orientation, size, origin
     * @todo warn when properties are overriden
     *
     * @param {Object} [prototype={}]   An object that's used as the prototype for all hexes in a grid.
     *                                  **Warning:** properties in this object will overwrite properties with the same name in the default prototype.
     *
     * @returns {Hex}                   A function to produce hexes that are all linked to the same prototype.
     *
     * @example
     * const Hex = Honeycomb.extendHex({
     *     size: 50,
     *     orientation: 'flat',
     *     customProperty: `I'm custom 😃`,
     *     customMethod() {
     *         return `${this.customProperty} and called from a custom method 😎`
     *     }
     * })
     * const hex = Hex(5, -1)
     *
     * hex.coordinates()    // { x: 5, y: -1 }
     * hex.size             // 50
     * hex.customProperty   // I'm custom 😃
     * hex.customMethod()   // I'm custom 😃 and called from a custom method 😎
     *
     * // every hex created with Hex() shares these properties:
     * const hex2 = Hex(3, 0)
     * hex2.size            // 50
     * hex2.customProperty  // I'm custom 😃
     *
     * // to set properties on individual hexes, pass them to Hex():
     * const hex3 = Hex(-2, -1, { instanceProperty: `I'm a unique snowflake 😌` })
     * hex3.instanceProperty    // I'm a unique snowflake 😌
     */
    return function extendHex(prototype = {}) {
        const defaultPrototype = {
            /**
             * Used internally for type checking
             *
             * @memberof Hex#
             * @private
             */
            __isHoneycombHex: true,
            /**
             * Either pointy or flat. Defaults to `pointy`.
             *
             * @memberof Hex#
             * @type {string}
             * @default ORIENTATION.pointy
             */
            orientation: ORIENTATION.pointy,
            /**
             * Distance from a hex's top left corner (as if it were a rectange). Defaults to `Point(0)`.
             * Can be anything the {@link Honeycomb.Point} factory accepts.
             * When a {@link Hex#toPoint|hex is converted to a point}, it is converted to this origin.
             *
             * @memberof Hex#
             * @type {point}
             * @default 0
             */
            origin: 0,
            /**
             * A hex's radius or the length of any of its sides. Defaults to `1`.
             *
             * @memberof Hex#
             * @type {number}
             * @default 1
             */
            size: 1,
            /**
             * Used to calculate the coordinates of rows for pointy hexes and columns for flat hexes.
             * Defaults to `-1` (odd offset).
             * See {@link OFFSET} for details.
             * See {@link https://www.redblobgames.com/grids/hexagons/#coordinates-offset|redblobgames.com} why this is needed.
             *
             * @memberof Hex#
             * @type {number}
             * @default -1
             * @see OFFSET
             */
            offset: OFFSET.odd,
            /**
             * Getter for `q` cube coordinate. Calls {@link Hex#cartesianToCube} internally.
             *
             * @memberof Hex#
             * @type {number}
             */
            get q() { return _cubeProp(this, 'q') },
            /**
             * Getter for `r` cube coordinate. Calls {@link Hex#cartesianToCube} internally.
             *
             * @memberof Hex#
             * @type {number}
             */
            get r() { return _cubeProp(this, 'r') },
            /**
             * Getter for `s` cube coordinate. Calls {@link Hex#cartesianToCube} internally.
             *
             * @memberof Hex#
             * @type {number}
             */
            get s() { return _cubeProp(this, 's') },

            // methods:
            add: methods.addFactory({ Hex, Point }),
            /**
             * Alias for {@link Hex#coordinates}.
             * @memberof Hex#
             * @method
             */
            cartesian: methods.coordinates,
            cartesianToCube: methods.cartesianToCube,
            coordinates: methods.coordinates,
            corners: methods.cornersFactory({ Point }),
            cube: methods.cube,
            cubeToCartesian: methods.cubeToCartesian,
            distance: methods.distance,
            equals: methods.equalsFactory({ Point }),
            height: methods.height,
            isFlat: methods.isFlat,
            isPointy: methods.isPointy,
            lerp: methods.lerpFactory({ Hex }),
            nudge: methods.nudge,
            oppositeCornerDistance: methods.oppositeCornerDistance,
            oppositeSideDistance: methods.oppositeSideDistance,
            round: methods.roundFactory({ Hex }),
            set: methods.setFactory({ Hex }),
            subtract: methods.subtractFactory({ Hex, Point }),
            /**
             * Alias for {@link Hex#cubeToCartesian}.
             * @memberof Hex#
             * @method
             */
            toCartesian: methods.cubeToCartesian,
            /**
             * Alias for {@link Hex#cartesianToCube}.
             * @memberof Hex#
             * @method
             */
            toCube: methods.cartesianToCube,
            toPoint: methods.toPointFactory({ Point }),
            toString: methods.toString,
            width: methods.width
        }
        const finalPrototype = Object.assign(defaultPrototype, prototype)

        // ensure origin is a point
        finalPrototype.origin = Point(finalPrototype.origin)

        Object.assign(Hex, staticMethods)

        /**
         * @function Hex
         *
         * @description
         * Factory function to create hexes. Use {@link Honeycomb.extendHex} to create a Hex factory.
         *
         * @see {@link redblobgames.com|https://www.redblobgames.com/grids/hexagons/#coordinates}
         *
         * @param {(number|Object|number[])} [xOrProps=]    The x coordinate,
         *                                                  **or** an object containing *any* of the cartesian (`x` and `y`) coordinates and optional custom properties,
         *                                                  **or** an object containing *all* of the cube (`q`, `r`, and `s`) coordinates and optional custom properties,
         *                                                  **or** an array containing *any* of the cartesian (x and y) coordinates.
         * @param {number} [xOrProps.x=]                    The x coordinate.
         * @param {number} [xOrProps.y=]                    The y coordinate.
         * @param {number} [y=]                             The y coordinate.
         * @param {object} [customProps={}]                 Any custom properties. The coordinates are merged into this object, ignoring any coordinates present in `customProps`.
         *
         * @returns {hex}                                   A hex. It *always* contains *only* the cartesian (x and y) coordinates and any custom properties.
         *
         * @example
         * const Hex = Honeycomb.extendHex()
         *
         * // passing numbers:
         * Hex()                        // { x: 0, y: 0 }
         * Hex(1)                       // { x: 1, y: 1 }
         * Hex(1, 2)                    // { x: 1, y: 2 }
         *
         * // passing an object with cartesian coordinates:
         * Hex({})                      // { x: 0, y: 0 }
         * Hex({ x: 1 })                // { x: 1, y: 1 }
         * Hex({ y: 2 })                // { x: 2, y: 2 }
         * Hex({ x: 1, y: 2 })          // { x: 1, y: 2 }
         *
         * // passing an object with cube coordinates:
         * Hex({ q: 1, r: 2, s: -3 })   // { x: 2, y: 2 }
         * Hex({ q: 1 })                // throws an error because of missing cube coordinates
         *
         * // passing an array:
         * Hex([])                      // { x: 0, y: 0 }
         * Hex([1])                     // { x: 1, y: 1 }
         * Hex([1, 2])                  // { x: 1, y: 2 }
         *
         * // custom properties:
         * Hex(1, 2, { a: 3 })          // { a: 3, x: 1, y: 2 }
         * Hex({ x: 1, y: 2, a: 3 })    // { a: 3, x: 1, y: 2 }
         *
         * // cloning a hex:
         * const someHex = Hex(4, -2)   // { x: 4, y: -2 }
         * const clone = Hex(someHex)   // { x: 4, y: -2 }
         * someHex === clone            // false
         */
        function Hex(xOrProps, y, customProps = {}) {
            let x

            if (isObject(xOrProps)) {
                let { q, r, s, ...rest } = xOrProps

                if (isNumber(q) || isNumber(r) || isNumber(s)) {
                    if (q + r + s !== 0) {
                        throw new Error(`Cube coordinates must have a sum of 0. q: ${q}, r: ${r}, s: ${s}, sum: ${q + r + s}.`)
                    }

                    ({ x, y } = finalPrototype.cubeToCartesian({ q, r, s }))
                } else {
                    ({ x, y } = xOrProps)
                }

                customProps = rest
            } else if (isArray(xOrProps)) {
                [x, y] = xOrProps
                // ignore all arguments except xOrProps
                customProps = {}
            } else {
                x = xOrProps
            }

            /**
             * An object with x and y properties and several methods in its prototype chain, created by a {@link Hex} factory.
             *
             * @typedef {Object} hex
             * @property {number} x Cartesian x coordinate.
             * @property {number} y Cartesian y coordinate.
             */
            return Object.assign(
                // the prototype has to be attached here, else Grid's shape methods break 🙁
                Object.create(finalPrototype),
                // also merge any custom properties already present
                this,
                Object.assign(customProps, ensureXY(x, y))
            )
        }

        return Hex
    }
}

function _cubeProp(context, prop) {
    return context.cartesianToCube({ x: context.x, y: context.y })[prop]
}
