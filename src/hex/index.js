import { isObject, isNumber } from 'axis.js'
import { unsignNegativeZero } from '../utils'
import { ORIENTATIONS } from './constants'
import Point from '../point'
import * as statics from './statics'
import * as methods from './prototype'

/**
 * @function HexFactory
 * @private
 *
 * @description
 * Factory that produces a {@link Hex} function to create hexes with. It accepts optional hex settings that are used to create a "family" of hexes that can be used in a grid (or individually). This "family" of hexes all share the same `prototype`.
 *
 * @todo validate orientation, size, origin
 * @todo warn when properties are overriden
 *
 * @param {Object} [customPrototype={}] An object that's used as the prototype for all hexes in the grid. **Warning:** properties with the same name as the default prototype will be overwritten. These properties are: `orientation`, `size`, `origin`, `coordinates`, `isPointy`, `isFlat`, `oppositeCornerDistance`, `oppositeSideDistance`, `width`, `height`, `corners` and `toPoint`.
 *
 * @returns {Hex}                       A function to produce hexes, all sharing the same `prototype`.
 */
export default function HexFactory(customPrototype = {}) {
    const defaultPrototype = {
        // settings:
        orientation: ORIENTATIONS.POINTY,
        size: 1,
        origin: 0,

        // methods:
        coordinates:            methods.coordinates,
        isPointy:               methods.isPointy,
        isFlat:                 methods.isFlat,
        oppositeCornerDistance: methods.oppositeCornerDistance,
        oppositeSideDistance:   methods.oppositeSideDistance,
        width:                  methods.width,
        height:                 methods.height,
        corners:                methods.cornersFactory({ Point }),
        toPoint:                methods.toPointFactory({ Point }),
        hexesBetween:           methods.hexesBetween,
        add:                    methods.addFactory({ Hex }),
        subtract:               methods.subtractFactory({ Hex }),
        neighbor:               methods.neighbor,
        neighbors:              methods.neighbors,
        distance:               methods.distance,
        round:                  methods.roundFactory({ Hex }),
        lerp:                   methods.lerpFactory({ Hex }),
        nudge:                  methods.nudgeFactory({ Hex })
    }
    const prototype = Object.assign(defaultPrototype, customPrototype)
    // ensure origin is a point
    prototype.origin = Point(prototype.origin)

    /**
     * @function Hex
     *
     * @description
     * Factory function for creating hexes. It can only be accessed by creating a {@link Grid} (see the example).
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
     * import { Grid } from 'Honeycomb'
     * // `Hex()` is not exposed on `Honeycomb`, but on a grid instance instead:
     * const Hex = Grid().Hex
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

        let [ x, y, z ] = coordinates.map(unsignNegativeZero)

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

        // return an object containing the coordinates that's prototype-linked to the prototype created in HexFactory
        return Object.assign(
            Object.create(prototype),
            { x, y, z }
        )
    }

    Object.assign(Hex, {
        thirdCoordinate: statics.thirdCoordinateFactory({ unsignNegativeZero })
    })

    return Hex
}
