import { isObject, noNegativeZero } from '../utils'

import prototype from './prototype'
import statics from './statics'

// assign the prototype explicitly to Hex so it can be used
// to set orientation and size for all hexes
Object.assign(Hex, statics, { prototype })

// accepts an object containing coordinates (either x, y, z or q, r, s)
// or accepts numbers: 0, 1 or 2 axial coordinates or 3 cube coordinates
// http://www.redblobgames.com/grids/hexagons/#coordinates
export default function Hex(...coordinates) {
    let q, r, s

    // if an object is passed, extract coordinates and return
    if (isObject(coordinates[0])) {
        let { x, y } = coordinates[0]
        // set y to x when y isn't passed
        y = y || x
        const z = Hex.thirdDimension(x, y)
        // TODO: improve mapping from x, y, z => q, r, s
        return Hex(x, z, y)
    }

    coordinates = coordinates.map(noNegativeZero)

    // TODO: validate q + r + s === 0
    switch (coordinates.length) {
        case 3:
            [ q, r, s ] = coordinates
            break
        case 2:
            [ q, s ] = coordinates
            r = Hex.thirdDimension(q, s)
            break
        case 1:
            q = coordinates[0]
            s = q
            r = Hex.thirdDimension(q, s)
            break
        default:
            q = r = s = 0
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

    return Object.assign(
        Object.create(prototype),
        { q, r, s, orientation, size }
    )
}
