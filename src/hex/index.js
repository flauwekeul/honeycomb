import { is, unsignNegativeZero } from '../utils'

import prototype from './prototype'
import statics from './statics'

// assign the prototype explicitly to Hex so it can be used
// to set orientation and size for all hexes
Object.assign(Hex, statics, { prototype })

// accepts an object containing coordinates (x, y or z)
// or accepts numbers: 0, 1 or 2 axial coordinates or 3 cube coordinates
// http://www.redblobgames.com/grids/hexagons/#coordinates
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

    // overrides prototype.orientation
    function orientation(ignoredOrientation) {
        if (arguments.length > 0) {
            console.warn(`Can't set orientation of single hex. Use Hex.prototype.orientation('${ignoredOrientation}') to set orientation for all hexes.`)
        }
        return prototype.orientation()
    }

    // overrides prototype.size
    function size(ignoredSize) {
        if (arguments.length > 0) {
            console.warn(`Can't set size of single hex. Use Hex.prototype.size(${ignoredSize}) to set size for all hexes.`)
        }
        return prototype.size()
    }

    // overrides prototype.origin
    function origin(ignoredOrigin) {
        if (arguments.length > 0) {
            const formattedIgnoredOrigin = `[${ignoredOrigin[0]}, ${ignoredOrigin[1]}]`
            console.warn(`Can't set origin of single hex. Use Hex.prototype.origin(${formattedIgnoredOrigin}) to set origin for all hexes.`)
        }
        return prototype.origin()
    }

    return Object.assign(
        Object.create(prototype),
        { x, y, z, orientation, size, origin }
    )
}
