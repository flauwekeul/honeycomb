import prototype from './prototype'
import statics from './statics'

// assign the prototype explicitly to Hex so it can be used
// to set orientation and size for all hexes
Object.assign(Hex, statics, { prototype })

// accepts 0, 1 or 2 axial coordinates or 3 cube coordinates
// http://www.redblobgames.com/grids/hexagons/#coordinates
export default function Hex() {
    let q, r, s

    switch (arguments.length) {
        case 3:
            [ q, r, s ] = arguments
            break
        case 2:
            [ q, s ] = arguments
            r = Hex.thirdDimension(q, s)
            break
        case 1:
            q = arguments[0]
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
