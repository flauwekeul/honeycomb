import { is, unsignNegativeZero } from '../utils'

import ProtoHex from './proto'

Object.assign(Hex, ProtoHex)

/**
 * Factory function for creating hexes.
 *
 * Coordinates not passed to the factory are inferred using the other coordinates:
 * * When two coordinates are passed, the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
 * * When one coordinate is passed, the second coordinate is set to the first and the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
 * * When nothing or a falsy value is passed, all coordinates are set to `0`.
 * Inspired by [redblobgames.com](http://www.redblobgames.com/grids/hexagons/#coordinates).
 *
 * @function Hex
 *
 * @param {Number} [x=0] The x coordinate.
 * @param {Number} [y=0] The y coordinate.
 * @param {Number} [z=0] The z coordinate.
 *
 * Or:
 *
 * @param {Object} [coordinates] Object containing any of the x, y and z coordinates.
 * @param {Number} [coordinates.x=0] The x coordinate.
 * @param {Number} [coordinates.y=0] The y coordinate.
 * @param {Number} [coordinates.z=0] The z coordinate.
 *
 * @returns {Hex} A hex object. It always contains all three coordinates (`x`, `y` and `z`).
 *
 * @example
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
export default function Hex(...coordinates) {
    // if an object is passed, extract coordinates and call self
    if (is.objectLiteral(coordinates[0])) {
        let { x, y, z } = coordinates[0]
        return Hex(x, y, z)
    }

    let [ x, y, z ] = coordinates.map(unsignNegativeZero)

    switch (coordinates.filter(is.number).length) {
        case 3:
            break
        case 2:
            x = is.number(x) ? x : Hex.thirdCoordinate(y, z)
            y = is.number(y) ? y : Hex.thirdCoordinate(x, z)
            z = is.number(z) ? z : Hex.thirdCoordinate(x, y)
            break
        case 1:
            if (is.number(x)) {
                y = x
                z = Hex.thirdCoordinate(x, y)
            } else if (is.number(y)) {
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
        throw new Error(`Coordinates don\'t sum to 0: { x: ${x}, y: ${y}, z: ${z} }.`)
    }

    return Object.assign(
        Object.create(ProtoHex),
        { x, y, z }
    )
}
