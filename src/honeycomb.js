import { ensureXY } from './utils'
import extendHexFactory from './hex'
import defineGridFactory from './grid'
import Grid from './grid/class'
import PointFactory from './point'

const Point = PointFactory({ ensureXY })
const extendHex = extendHexFactory({ ensureXY, Point })
const defineGrid = defineGridFactory({ extendHex, Grid, Point })

/**
 * @namespace {Object} Honeycomb
 */
export {
    extendHex,
    defineGrid,
    Point
}
