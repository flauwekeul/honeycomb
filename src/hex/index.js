import prototype from './prototype'
import statics from './statics'

Object.assign(Hex, statics)

// accepts axial or cube coordinates
// http://www.redblobgames.com/grids/hexagons/#coordinates
export default function Hex(x = 0, y = x, z = Hex.thirdDimension(x, y)) {
    return Object.assign(Object.create(prototype), { x, y, z })
}
