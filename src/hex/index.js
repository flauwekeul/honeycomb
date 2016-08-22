import { is, unsignNegativeZero } from '../utils'

import ProtoHex from './proto'

Object.assign(Hex, ProtoHex)

// accepts an object containing coordinates (x, y or z)
// or accepts numbers: 0, 1 or 2 axial coordinates or 3 cube coordinates
// http://www.redblobgames.com/grids/hexagons/#coordinates
/**
 * Factory function for creating hexes.
 *
 * @param {?Number} [x] The x coordinate.
 * @param {?Number} [y] The y coordinate.
 * @param {?Number} [z] The z coordinate.
 *
 * Or:
 *
 * @param {Object} [coordinates] Object containing any of the x, y and z coordinates.
 * @param {?Number} [coordinates.x] The x coordinate.
 * @param {?Number} [coordinates.y] The y coordinate.
 * @param {?Number} [coordinates.z] The z coordinate.
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
