import GridFactory from './grid'
import HexFactory from './hex'
import { ORIENTATIONS } from './hex/constants'
import Point from './point'
import Views from './views'

const Grid = GridFactory({ HexFactory })

export {
    ORIENTATIONS as HEX_ORIENTATIONS,
    Grid,
    Point,
    Views
}
