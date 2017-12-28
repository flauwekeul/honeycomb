import { ORIENTATIONS } from './hex/constants'
import extendHex from './hex'
import GridFactory from './grid'
import Point from './point'

const Grid = GridFactory({ extendHex })

export {
    ORIENTATIONS as HEX_ORIENTATIONS,
    extendHex,
    Grid,
    Point
}
