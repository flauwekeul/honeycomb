import isDom from 'is-dom'

import { ORIENTATIONS } from './hex/constants'
import GridFactory from './grid'
import HexFactory from './hex'
import Point from './point'
import ViewFactory from './view'

const Grid = GridFactory({ HexFactory })
const View = ViewFactory({ Point, isDom })

export {
    ORIENTATIONS as HEX_ORIENTATIONS,
    Grid,
    Point,
    View
}
