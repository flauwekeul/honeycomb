import GridFactory from './grid'
import HexFactory from './hex'
import Point from './point'
import DOM from './views/dom'

export const API = {
    Grid: GridFactory({ HexFactory }),
    HexFactory,
    Point,
    Views: { DOM }
}
