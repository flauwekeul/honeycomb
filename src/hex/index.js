import { isObject, isNumber } from 'axis.js'
import { unsignNegativeZero } from '../utils'
import { ORIENTATIONS } from './constants'
import Point from '../point'
import * as statics from './statics'
import * as methods from './prototype'

export const defaultPrototype = {
    // settings:
    orientation: ORIENTATIONS.POINTY,
    size: 1,
    origin: 0,

    // methods:
    coordinates: methods.coordinates,
    isPointy: methods.isPointy,
    isFlat: methods.isFlat,
    oppositeCornerDistance: methods.oppositeCornerDistance,
    oppositeSideDistance: methods.oppositeSideDistance,
    width: methods.width,
    height: methods.height,
    corners: methods.cornersFactory({ Point }),
    toPoint: methods.toPointFactory({ Point }),
    hexesBetween: methods.hexesBetween,
    add: methods.addFactory({ Hex }),
    subtract: methods.subtractFactory({ Hex }),
    neighbor: methods.neighbor,
    neighbors: methods.neighbors,
    distance: methods.distance,
    round: methods.roundFactory({ Hex }),
    lerp: methods.lerpFactory({ Hex }),
    nudge: methods.nudgeFactory({ Hex })
}

export const staticMethods = {
    thirdCoordinate: statics.thirdCoordinateFactory({ unsignNegativeZero })
}

let finalPrototype

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
 */
export default function extendHex(prototype = {}) {
    finalPrototype = Object.assign(defaultPrototype, prototype)
    // ensure origin is a point
    finalPrototype.origin = Point(finalPrototype.origin)

    Object.assign(Hex, staticMethods)

    return Hex
}

/**
 * @function Hex
 *
 * @description
 * Factory function for creating hexes.
 * Create a Hex factory by calling {@link extendHex}, optionally passing a Hex prototype.
 *
 * Coordinates not passed to the factory are inferred using the other coordinates:
 * * When two coordinates are passed, the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
 * * When one coordinate is passed, the second coordinate is set to the first and the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
 * * When nothing or a falsy value is passed, all coordinates are set to `0`.
 *
 * @see {@link redblobgames.com|http://www.redblobgames.com/grids/hexagons/#coordinates}
 *
 * @param {(number|Object)} [coordinates=0] The x coordinate or an object containing any of the x, y and z coordinates.
 * @param {number} [coordinates.x=0]        The x coordinate.
 * @param {number} [coordinates.y=0]        The y coordinate.
 * @param {number} [coordinates.z=0]        The z coordinate.
 * @param {number} [y=0]                    The y coordinate.
 * @param {number} [z=0]                    The z coordinate.
 *
 * @returns {Hex}                           A hex object. It has all three coordinates (`x`, `y` and `z`) as its own properties and various methods in its prototype.
 *
 * @example
 * import { extendHex } from 'Honeycomb'
 *
 * const Hex = extendHex()
 *
 * Hex()            // returns hex( x: 0, y: 0, z: 0 )
 * Hex(1)           // returns hex( x: 1, y: 1, z: -2 )
 * Hex(1, 2)        // returns hex( x: 1, y: 2, z: -3 )
 * Hex(1, 2, -3)    // returns hex( x: 1, y: 2, z: -3 )
 * Hex(1, 2, 5)     // coordinates don't sum up to 0; throws an error
 *
 * Hex({ x: 3 })    // returns hex( x: 3, y: 3, z: -3 )
 * Hex({ y: 3 })    // returns hex( x: 3, y: 3, z: -6 )
 * Hex({ z: 3 })    // returns hex( x: 3, y: -6, z: 3 )
 */
function Hex(...coordinates) {
    // if an object is passed, extract coordinates and call self
    if (isObject(coordinates[0])) {
        let { x, y, z } = coordinates[0]
        return Hex(x, y, z)
    }

    let [x, y, z] = coordinates.map(unsignNegativeZero)

    switch (coordinates.filter(isNumber).length) {
        case 3:
            break
        case 2:
            x = isNumber(x) ? x : Hex.thirdCoordinate(y, z)
            y = isNumber(y) ? y : Hex.thirdCoordinate(x, z)
            z = isNumber(z) ? z : Hex.thirdCoordinate(x, y)
            break
        case 1:
            if (isNumber(x)) {
                y = x
                z = Hex.thirdCoordinate(x, y)
            } else if (isNumber(y)) {
                x = y
                z = Hex.thirdCoordinate(x, y)
            } else {
                x = z
                y = Hex.thirdCoordinate(x, z)
            }
            break
        default:
            x = y = z = 0
    }

    if (Math.round(x + y + z) !== 0) {
        throw new Error(`Coordinates don't sum to 0: { x: ${x}, y: ${y}, z: ${z} }.`)
    }

    return Object.assign(
        // the prototype has to be attached here, else Grid's shape methods break 🙁
        Object.create(finalPrototype),
        { x, y, z }
    )
}
