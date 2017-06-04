import { ORIENTATIONS } from './hex/constants'
import GridFactory from './grid'
import HexFactory from './hex'
import Point from './point'

const Grid = GridFactory({ HexFactory })

export {
    ORIENTATIONS as HEX_ORIENTATIONS,
    Grid,
    Point
}
