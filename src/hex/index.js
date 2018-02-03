import { isObject, isNumber, isArray } from 'axis.js'
import { ORIENTATION, OFFSET } from './constants'
import Point from '../point'
import * as statics from './statics'
import * as methods from './prototype'

export const staticMethods = {
    thirdCoordinate: statics.thirdCoordinate
}

/**
 * @function extendHex
 *
 * @description
 * Factory that produces a {@link Hex} function to create hexes with.
 * It accepts an optional prototype that's used to extend the Hex's default prototype with.
 * This can way a custom Hex factory can be created.
 *
 * @todo validate orientation, size, origin
 * @todo warn when properties are overriden
 *
 * @param {Object} [prototype={}]   An object that's used as the prototype for all hexes in a grid.
 *                                  **Warning:** methods present in the default prototype will be overwritten.
 *
 * @returns {Hex}                   A function to produce hexes that all share the same prototype.
 *
 * @example
 * import { extendHex, HEX_ORIENTATIONS } from 'Honeycomb'
 *
 * const Hex = extendHex({
 *     size: 50,
 *     orientation: HEX_ORIENTATIONS.FLAT,
 *     customProperty: `I'm custom 😃`,
 *     customMethod() {
 *         return `${this.customProperty} and called from a custom method 😎`
 *     }
 * })
 *
 * const hex = Hex(5, -1, -4)
 * hex.coordinates()    // { x: 5, y: -1, z: -4 }
 * hex.size             // 50
 * hex.customProperty   // I'm custom 😃
 * hex.customMethod()   // I'm custom 😃 and called from a custom method 😎
 *
 * // methods that return a new hex, retain any custom properties:
 * const addedHex = hex.add(Hex(3, -1))
 * addedHex.customProperty  // I'm custom 😃
 */
export default function extendHex(prototype = {}) {
    const defaultPrototype = {
        // used internally for type checking
        __isHoneycombHex: true,

        // properties:
        orientation: ORIENTATION.pointy,
        origin: 0,
        size: 1,
        offset: OFFSET.odd,
        get q() { return _cubeProp(this, 'q') },
        get r() { return _cubeProp(this, 'r') },
        get s() { return _cubeProp(this, 's') },

        // methods:
        add: methods.addFactory({ Hex }),
        /**
         * Alias for {@link Hex#coordinates}.
         * @name Hex#cartesian
         */
        cartesian: methods.coordinates,
        cartesianToCube: methods.cartesianToCube,
        coordinates: methods.coordinates,
        corners: methods.cornersFactory({ Point }),
        cube: methods.cube,
        cubeToCartesian: methods.cubeToCartesian,
        distance: methods.distance,
        equals: methods.equals,
        height: methods.height,
        isFlat: methods.isFlat,
        isPointy: methods.isPointy,
        lerp: methods.lerpFactory({ Hex }),
        nudge: methods.nudge,
        oppositeCornerDistance: methods.oppositeCornerDistance,
        oppositeSideDistance: methods.oppositeSideDistance,
        round: methods.roundFactory({ Hex }),
        set: methods.setFactory({ Hex }),
        subtract: methods.subtractFactory({ Hex }),
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
     * Factory function for creating hexes.
     * Create a Hex factory with {@link extendHex}.
     *
     * Any missing coordinates are inferred from the available coordinates like so:
     * * When 2 coordinates are available, the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
     * * When 1 coordinate is available, the second coordinate is set to the first and the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
     * * When 0 coordinates or a falsy value is passed, all coordinates are set to `0`.
     *
     * See the [tests](https://github.com/flauwekeul/honeycomb/blob/master/test/hex/index.spec.js#L42) for all corner cases.
     *
     * @see {@link redblobgames.com|http://www.redblobgames.com/grids/hexagons/#coordinates}
     *
     * @param {(number|Object|number[])} [xOrProps=]    The x coordinate,
     *                                                  **or** an object containing any of the x, y and z coordinates and any custom properties,
     *                                                  **or** an array containing 0 or more coordinates.
     * @param {number} [xOrProps.x=]                    The x coordinate.
     * @param {number} [xOrProps.y=]                    The y coordinate.
     * @param {number} [xOrProps.z=]                    The z coordinate.
     * @param {number} [y=]                             The y coordinate.
     * @param {number} [z=]                             The z coordinate.
     * @param {object} [customProps={}]                 Any custom properties. The coordinates are merged into this object, ignoring any coordinates present in `customProps`.
     *
     * @returns {Hex}                                   A hex object. It always contains all three coordinates (`x`, `y` and `z`) and any properties bound to `Hex`.
     *
     * @example
     * import { extendHex } from 'Honeycomb'
     *
     * const Hex = extendHex()
     *
     * Hex(1, 2, -3)    // { x: 1, y: 2, z: -3 }
     * Hex(1, 2)        // { x: 1, y: 2, z: -3 }
     * Hex(1)           // { x: 1, y: 1, z: -2 }
     * Hex()            // { x: 0, y: 0, z: 0 }
     * Hex(1, 2, 5)     // coordinates don't sum up to 0; throws an error
     *
     * Hex({ x: 3 })    // { x: 3, y: 3, z: -3 }
     * Hex({ y: 3 })    // { x: 3, y: 3, z: -6 }
     * Hex({ z: 3 })    // { x: 3, y: -6, z: 3 }
     *
     * Hex([1, 2, -3])  // { x: 1, y: 2, z: -3 }
     * Hex([1, 2])      // { x: 1, y: 2, z: -3 }
     *
     * // clone a hex by simply passing it to Hex()
     * const someHex = Hex(4, -2)   // { x: 4, y: -2, z: -2 }
     * const clone = Hex(someHex)   // { x: 4, y: -2, z: -2 }
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

        if (!isNumber(x) && !isNumber(y)) {
            x = y = 0
        } else if (!isNumber(x)) {
            x = y
        } else if (!isNumber(y)) {
            y = x
        }

        return Object.assign(
            // the prototype has to be attached here, else Grid's shape methods break 🙁
            Object.create(finalPrototype),
            // also merge any custom properties already present
            this,
            Object.assign(customProps, { x, y })
        )
    }

    return Hex
}

function _cubeProp(context, prop) {
    return context.cartesianToCube({ x: context.x, y: context.y })[prop]
}
