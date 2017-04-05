import GridFactory from './grid'
import HexFactory from './hex'
import { ORIENTATIONS } from './hex/constants'
import Point from './point'
import DOMFactory from './views/dom'
import isDom from 'is-dom'

const Grid = GridFactory({ HexFactory })
const Views = {
    DOM: DOMFactory({ Point, isDom })
}

export {
    ORIENTATIONS as HEX_ORIENTATIONS,
    Grid,
    Point,
    Views
}
