import prototype from './prototype'
import statics from './statics'

Object.assign(Hex, statics)

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

    return Object.assign(Object.create(prototype), { q, r, s })
}
