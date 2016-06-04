import prototype from './prototype'
import * as statics from './statics'

Object.assign(Hex, statics)

// accepts axial or cube coordinates
// http://www.redblobgames.com/grids/hexagons/#coordinates
export default function Hex(x, y, z = Hex.thirdDimension(x, y)) {
    return Object.assign(Object.create(prototype), { x, y, z })
}
