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
    if (is.object(coordinates[0])) {
        let { x, y, z } = coordinates[0]

        if ([ x, y, z ].filter(is.number).length < 2) {
            return console.warn(`Invalid or not enough coordinates: { x: ${x}, y: ${y}, z: ${z} }.`)
        }

        return Hex(
            is.number(x) ? x : Hex.thirdCoordinate(y, z),
            is.number(y) ? y : Hex.thirdCoordinate(x, z),
            is.number(z) ? z : Hex.thirdCoordinate(x, y)
        )
    }

    coordinates = coordinates.map(unsignNegativeZero)
    let x, y

    switch (coordinates.length) {
        case 3:
        case 2:
            [ x, y ] = coordinates
            break
        case 1:
            x = coordinates[0]
            y = x
            break
        default:
            x = y = 0
    }

    // set `z` to a value that guarantees x + y + z === 0
    const z = Hex.thirdCoordinate(x, y)

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
