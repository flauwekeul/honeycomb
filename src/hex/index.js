import { is, unsignNegativeZero } from '../utils'

import ProtoHex from './proto'

Object.assign(Hex, ProtoHex)

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

    return Object.assign(
        Object.create(ProtoHex),
        { x, y, z, orientation, size, origin }
    )
}

// overrides Hex.orientation
function orientation(ignoredOrientation) {
    if (arguments.length > 0) {
        console.warn(`Can't set orientation of single hex. Use Hex.orientation('${ignoredOrientation}') to set orientation for all hexes.`)
    }
    return Hex.orientation()
}

// overrides Hex.size
function size(ignoredSize) {
    if (arguments.length > 0) {
        console.warn(`Can't set size of single hex. Use Hex.size(${ignoredSize}) to set size for all hexes.`)
    }
    return Hex.size()
}

// overrides Hex.origin
function origin(ignoredOrigin) {
    if (arguments.length > 0) {
        const formattedIgnoredOrigin = `[${ignoredOrigin[0]}, ${ignoredOrigin[1]}]`
        console.warn(`Can't set origin of single hex. Use Hex.origin(${formattedIgnoredOrigin}) to set origin for all hexes.`)
    }
    return Hex.origin()
}
